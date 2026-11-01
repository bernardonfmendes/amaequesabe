// Edge Function "sugerir-receita": a partir da lista de produtos que a casa tem na app (com o preço da loja
// escolhida) e/ou do que a pessoa escreve que tem em casa ("despensa"), pede ao Gemini uma receita original
// que caiba no custo. A chave GEMINI_API_KEY fica no Supabase (Secrets).
import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const ORIGEM = "https://bernardonfmendes.github.io";
const cors = {
  "Access-Control-Allow-Origin": ORIGEM,
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (obj: unknown, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });

const PROMPT = `Crias UMA receita de jantar ou almoço para uma família portuguesa, com base na lista de produtos abaixo.
Regras:
- Usa APENAS os produtos da lista (pelo "id"). Não inventes produtos. Se faltar algo essencial, diz em "faltam" (texto).
- Quantidades na unidade do produto ("u": g, ml ou un), para as doses indicadas.
- Cada produto tem o preço da loja ("preço": € por kg, por litro ou por unidade). Usa-o para escolher uma receita económica: o custo total da receita para as doses indicadas deve ficar abaixo de 15 €. Prefere produtos baratos como base e evita ingredientes caros sem necessidade.
- O prato principal tem de ter uma proteína forte (carne, peixe, ovo em quantidade, leguminosas) e legumes ou hidratos.
- Receita original, em português de Portugal, com passos curtos e claros.
- Responde SÓ JSON: {"nome": string, "cat": "carne"|"peixe"|"veg", "tempo": número (minutos), "doses": número,
  "refeicao": "ambos"|"almoco"|"jantar", "ing": [{"id": string, "qty": número}], "passos": [string], "faltam": [string]}

Pedido do utilizador (pode estar vazio): `;

// preço por unidade base (€ por g, por ml ou por un), vindo da app; valida-se o intervalo
const precoBase = (x: unknown): number | null => {
  const n = Number(x);
  return Number.isFinite(n) && n > 0 && n < 1000 ? n : null;
};
// texto legível para a IA: € por kg, por litro ou por unidade
const precoTexto = (u: string, base: number | null): string => {
  if (base == null) return "sem preço";
  if (u === "g") return (base * 1000).toFixed(2) + " €/kg";
  if (u === "ml") return (base * 1000).toFixed(2) + " €/l";
  return base.toFixed(2) + " €/un";
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (req.method !== "POST") return json({ erro: "método" }, 405);

  // só utilizadores ligados e com email autorizado na casa
  const auth = req.headers.get("Authorization") ?? "";
  const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: auth } },
  });
  const { data: { user } } = await supa.auth.getUser();
  if (!user || !user.email) return json({ erro: "sem sessão" }, 401);
  const { data: autorizado } = await supa.from("allowed_emails").select("email").eq("email", user.email).maybeSingle();
  if (!autorizado) return json({ erro: "conta não autorizada" }, 403);

  let corpo: { produtos?: { id?: string; nome?: string; u?: string; preco_base?: unknown }[]; pedido?: string; evitar?: string[]; despensa?: string; fonte?: string };
  try { corpo = await req.json(); } catch { return json({ erro: "pedido inválido" }, 400); }

  // só aceita produtos com id curto e nome simples (limite de tamanho)
  const produtos = (Array.isArray(corpo.produtos) ? corpo.produtos : [])
    .filter((p) => p && typeof p.id === "string" && p.id.length <= 60 && typeof p.nome === "string" && p.nome.length <= 80)
    .slice(0, 400)
    .map((p) => {
      const u = ["g", "ml", "un"].includes(String(p.u)) ? String(p.u) : "un";
      const base = precoBase(p.preco_base);
      return { id: p.id as string, nome: p.nome as string, u, base, preco: precoTexto(u, base) };
    });
  // o que a pessoa escreve que tem em casa (texto livre, limitado)
  const despensa = String(corpo.despensa ?? "").slice(0, 500).replace(/[\r\n]+/g, " ").trim();
  // receita de origem (texto de uma página ou legenda) que se quer adaptar aos produtos da app
  const fonte = String(corpo.fonte ?? "").slice(0, 4000).trim();
  if (produtos.length < 3 && !despensa && !fonte) return json({ erro: "poucos produtos na lista" }, 400);
  const porId = new Map(produtos.map((p) => [p.id, p]));
  const pedido = String(corpo.pedido ?? "").slice(0, 300).replace(/[\r\n]+/g, " ");
  const evitar: string[] = (Array.isArray(corpo.evitar) ? corpo.evitar : [])
    .map((n) => String(n).slice(0, 80).replace(/[\r\n]+/g, " ")).filter(Boolean).slice(0, 150);
  const norm = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const evitarNorm = new Set(evitar.map(norm));

  const chave = Deno.env.get("GEMINI_API_KEY");
  if (!chave) return json({ erro: "chave não configurada" }, 500);
  const modelos = [Deno.env.get("GEMINI_MODEL") ?? "gemini-3.8-flash"];
  const reserva = Deno.env.get("GEMINI_MODEL_RESERVA");
  if (reserva && reserva !== modelos[0]) modelos.push(reserva);

  const avisoEvitar = evitar.length
    ? "\n\nNÃO uses nenhuma destas receitas (já existem ou já foram sugeridas), nem nomes parecidos:\n- " + evitar.join("\n- ")
    : "";
  const avisoDespensa = despensa
    ? "\n\nA pessoa TEM em casa estes ingredientes (texto livre; prioridade máxima, usa-os sobretudo): " + despensa +
      "\nSe precisares de um ingrediente que NÃO está na lista de produtos, não o inventes em \"ing\": põe-no em \"extra\" como texto (\"nome, quantidade\"). " +
      "Sal, água, pimenta e azeite podes assumir sem os pôr em \"extra\". Acrescenta \"extra\": [string] à resposta JSON (pode ser lista vazia)."
    : "";
  const avisoFonte = fonte
    ? "\n\nAdapta a receita ORIGINAL abaixo (texto de uma página ou de uma legenda). Mantém o prato e o espírito dela, mas usa os produtos da lista (pelo \"id\"). Ingredientes que não existem na lista vão para \"extra\" como texto (\"nome, quantidade\"). Pode omitir o que não é comida. Acrescenta \"extra\": [string] à resposta JSON.\n--- RECEITA ORIGINAL ---\n" + fonte + "\n--- FIM ---"
    : "";
  const listaParaIA = produtos.map((p) => ({ id: p.id, nome: p.nome, u: p.u, preço: p.preco }));
  const texto = PROMPT + pedido + avisoEvitar + avisoDespensa + avisoFonte + "\n\nProdutos (JSON):\n" + JSON.stringify(listaParaIA);
  let resp: Response | null = null;
  for (const modelo of modelos) {
    resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": chave },
      body: JSON.stringify({
        contents: [{ parts: [{ text: texto }] }],
        generationConfig: { responseMimeType: "application/json", temperature: 1.1 },
      }),
    });
    if (resp.ok || ![429, 500, 503].includes(resp.status)) break;
  }
  if (!resp!.ok) {
    let detalhe = "";
    try { detalhe = (await resp!.json())?.error?.message ?? ""; } catch { /* sem detalhe */ }
    return json({ erro: "o Gemini não respondeu (" + resp!.status + ")" + (detalhe ? ": " + detalhe.slice(0, 300) : "") }, 502);
  }

  const dados = await resp!.json();
  const bruto = dados?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  let r: any;
  try { r = JSON.parse(bruto); } catch { return json({ erro: "resposta inválida do Gemini" }, 502); }

  // validação: só ids da lista, quantidades positivas, pelo menos um passo
  const ing = (Array.isArray(r.ing) ? r.ing : [])
    .filter((x: any) => x && porId.has(String(x.id)) && Number(x.qty) > 0)
    .map((x: any) => ({ id: String(x.id), qty: Math.round(Number(x.qty) * 100) / 100 }));
  const passos = (Array.isArray(r.passos) ? r.passos : []).map((s: any) => String(s).trim()).filter(Boolean);
  const extra = (Array.isArray(r.extra) ? r.extra : []).map((s: any) => String(s).trim().slice(0, 120)).filter(Boolean).slice(0, 10);
  if (ing.length + extra.length < 2 || !passos.length) return json({ erro: "a IA não devolveu uma receita completa. Tenta outra vez." }, 502);

  const nomeFinal = String(r.nome || "Receita sugerida").slice(0, 80);
  if (evitarNorm.has(norm(nomeFinal))) return json({ erro: "a IA repetiu uma receita que já existe. Tenta outra vez." }, 502);

  // custo estimado com os preços da app (quantidade × preço por unidade base)
  let custo = 0;
  const semPreco: string[] = [];
  ing.forEach((x: { id: string; qty: number }) => {
    const p = porId.get(x.id)!;
    if (p.base == null) { semPreco.push(p.nome); return; }
    custo += x.qty * p.base;
  });
  const doses = Math.max(1, Math.min(12, Math.round(Number(r.doses) || 4)));

  return json({
    nome: nomeFinal,
    cat: ["carne", "peixe", "veg"].includes(r.cat) ? r.cat : "carne",
    tempo: Math.max(0, Math.min(240, Math.round(Number(r.tempo) || 30))),
    doses,
    refeicao: ["ambos", "almoco", "jantar"].includes(r.refeicao) ? r.refeicao : "ambos",
    ing, passos, extra,
    faltam: (Array.isArray(r.faltam) ? r.faltam : []).map((s: any) => String(s).slice(0, 120)).slice(0, 5),
    custo: Math.round(custo * 100) / 100,
    custo_dose: Math.round((custo / doses) * 100) / 100,
    sem_preco: semPreco.slice(0, 10),
  });
});
