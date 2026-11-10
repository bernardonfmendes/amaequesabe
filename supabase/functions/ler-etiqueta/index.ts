// Edge Function "ler-etiqueta": recebe a FOTO de uma etiqueta de preço (JPEG em base64),
// pede à IA o nome, o preço e o tamanho do produto e devolve JSON.
// A IA é a Claude (ANTHROPIC_API_KEY) ou, sem ela, o Gemini (GEMINI_API_KEY). As chaves ficam no Supabase.
import { createClient } from "npm:@supabase/supabase-js@2.45.4";
import { pedirIA, limiteDiario } from "../_shared/ia.ts";

const ORIGEM = "https://bernardonfmendes.github.io";
const cors = {
  "Access-Control-Allow-Origin": ORIGEM,
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (obj: unknown, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });

const PROMPT = `Na foto está uma etiqueta de preço de um supermercado português (ou uma embalagem).
Devolve SÓ JSON com:
- "nome": nome do produto como aparece (marca e variedade incluídas), sem códigos.
- "preco": preço de venda do produto em euros, número (ex.: 1.29). Se houver preço por kg ou por litro e preço do produto, usa o preço do produto.
- "quantidade": tamanho da embalagem, número.
- "unidade": "g", "ml" ou "un". Converte kg para g (multiplica por 1000) e l para ml (multiplica por 1000).
Se não conseguires ler um preço com segurança, devolve "preco": 0. Não inventes.`;

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
  const limite = await limiteDiario(supa, "ler-etiqueta", 40, "etiquetas lidas");
  if (limite) return json({ erro: limite }, 429);

  let corpo: { imagem?: string };
  try { corpo = await req.json(); } catch { return json({ erro: "pedido inválido" }, 400); }
  const imagem = String(corpo.imagem ?? "");
  if (!imagem || imagem.length > 2_500_000) return json({ erro: "imagem em falta ou demasiado grande" }, 400);

  const ia = await pedirIA({ texto: PROMPT, imagemJpeg: imagem, temperatura: 0, maxTokens: 500 });
  if (!ia.ok) return json({ erro: ia.erro }, 502);
  let r: any;
  try { r = JSON.parse(ia.texto); } catch { return json({ erro: "resposta inválida da IA" }, 502); }

  const preco = Math.round(Number(r.preco) * 100) / 100;
  if (!(preco > 0 && preco < 500)) return json({ erro: "não consegui ler o preço nesta foto. Tenta mais perto e com boa luz." }, 422);
  const unidade = ["g", "ml", "un"].includes(r.unidade) ? r.unidade : "un";
  const quantidade = Number(r.quantidade) > 0 ? Math.round(Number(r.quantidade) * 100) / 100 : 1;
  return json({
    nome: String(r.nome || "").slice(0, 80),
    preco,
    quantidade,
    unidade,
  });
});
