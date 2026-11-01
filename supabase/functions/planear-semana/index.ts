// Edge Function "planear-semana": a IA escolhe receitas para as refeições VAZIAS da semana.
// Só pode escolher entre as opções que a app já validou para cada refeição (opcoes), por isso
// não inventa receitas nem põe pratos onde não cabem. A chave (ANTHROPIC_API_KEY ou GEMINI_API_KEY) fica nos Secrets.
import { createClient } from "npm:@supabase/supabase-js@2.45.4";
import { pedirTextoIA } from "../_shared/ia.ts";

const ORIGEM = "https://bernardonfmendes.github.io";
const cors = {
  "Access-Control-Allow-Origin": ORIGEM,
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (obj: unknown, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });

const LIMITE_GRUPO: Record<string, number> = { verm: 2, proc: 1 };
const MAX_REPETIDAS = 2;

const PROMPT = `Planeias a semana de refeições de uma família portuguesa (duas pessoas).
Vais preencher SÓ as refeições listadas em "refeicoes", em português de Portugal.
Regras:
- Para cada refeição escolhe UMA receita, e só entre as "opcoes" dessa refeição (pelo id). Não inventes ids.
- O custo total das escolhas (campo "custo" de cada receita, já para as pessoas da casa) tem de caber em "orcamentoRestante" (euros). Se o orçamento apertar, prefere receitas baratas.
- Varia: a mesma receita no máximo 2 vezes na semana; não repitas a mesma proteína principal ("grupo") em dias seguidos.
- Limites da semana: no máximo 2 refeições com grupo "verm" (carne vermelha) e 1 com grupo "proc" (charcutaria).
- Se "anteriores" tiver ids, são receitas da semana anterior: evita-as sempre que houver alternativa. Quero uma semana DIFERENTE da anterior, com variedade de pratos e de proteínas.
- Se "pedido" tiver texto, respeita-o na medida do possível.
- Responde SÓ JSON: {"plano": {"<chave da refeição>": "<id da receita>"}, "nota": "frase curta em português sobre a lógica da semana (máx. 200 caracteres)"}.`;

type Receita = { id: string; nome: string; cat: string; custo: number; grupo: string };
type Refeicao = { chave: string; dia: string; refeicao: string; opcoes: string[] };

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

  let corpo: any;
  try { corpo = await req.json(); } catch { return json({ erro: "pedido inválido" }, 400); }

  const restante = Number(corpo.orcamentoRestante);
  if (!Number.isFinite(restante) || restante <= 0) return json({ erro: "orçamento inválido" }, 400);

  const receitas: Receita[] = (Array.isArray(corpo.receitas) ? corpo.receitas : []).slice(0, 300)
    .filter((r: any) => r && typeof r.id === "string" && r.id.length <= 80 && Number.isFinite(Number(r.custo)))
    .map((r: any) => ({
      id: String(r.id), nome: String(r.nome ?? "").slice(0, 80), cat: String(r.cat ?? "").slice(0, 20),
      custo: Math.round(Number(r.custo) * 100) / 100, grupo: String(r.grupo ?? "out").slice(0, 10),
    }));
  const porId = new Map(receitas.map((r) => [r.id, r]));

  const refeicoes: Refeicao[] = (Array.isArray(corpo.refeicoes) ? corpo.refeicoes : []).slice(0, 60)
    .filter((x: any) => x && typeof x.chave === "string" && Array.isArray(x.opcoes))
    .map((x: any) => ({
      chave: String(x.chave).slice(0, 80), dia: String(x.dia ?? "").slice(0, 20), refeicao: String(x.refeicao ?? "").slice(0, 20),
      opcoes: x.opcoes.map(String).filter((id: string) => porId.has(id)),
    }))
    .filter((x: Refeicao) => x.opcoes.length > 0);
  if (!refeicoes.length) return json({ erro: "não há refeições vazias para planear" }, 400);

  const pedido = String(corpo.pedido ?? "").slice(0, 300).replace(/[\r\n]+/g, " ");

  // a IA vê só o necessário: refeições, opções e as receitas referidas
  const usadas = new Set(refeicoes.flatMap((x) => x.opcoes));
  const texto = PROMPT + "\n\n" + JSON.stringify({
    orcamentoRestante: restante,
    pedido,
    anteriores: (Array.isArray(corpo.anteriores) ? corpo.anteriores : []).map(String).slice(0, 300),
    refeicoes: refeicoes.map((x) => ({ chave: x.chave, dia: x.dia, refeicao: x.refeicao, opcoes: x.opcoes })),
    receitas: [...usadas].map((id) => porId.get(id)),
  });

  const ia = await pedirTextoIA(texto, 1.0);
  if (!ia.ok) return json({ erro: ia.erro }, 502);
  let r: any;
  try { r = JSON.parse(ia.texto); } catch { return json({ erro: "resposta inválida da IA" }, 502); }

  // validação: só chaves pedidas, só opções permitidas, repetições e limites de grupo, orçamento
  const plano: Record<string, string> = {};
  const contagem: Record<string, number> = {};
  const grupos: Record<string, number> = {};
  let custo = 0;
  for (const ref of refeicoes) {
    const id = r?.plano?.[ref.chave];
    if (typeof id !== "string" || !ref.opcoes.includes(id)) continue;
    const rec = porId.get(id)!;
    if ((contagem[id] ?? 0) >= MAX_REPETIDAS) continue;
    const L = LIMITE_GRUPO[rec.grupo];
    if (L && (grupos[rec.grupo] ?? 0) >= L) continue;
    plano[ref.chave] = id;
    contagem[id] = (contagem[id] ?? 0) + 1;
    grupos[rec.grupo] = (grupos[rec.grupo] ?? 0) + 1;
    custo += rec.custo;
  }
  if (!Object.keys(plano).length) return json({ erro: "a IA não devolveu escolhas válidas. Tenta outra vez." }, 502);
  if (custo > restante * 1.15) return json({ erro: "a IA passou do orçamento. Tenta outra vez." }, 502);

  return json({
    plano,
    nota: String(r.nota ?? "").slice(0, 200),
    custo: Math.round(custo * 100) / 100,
  });
});
