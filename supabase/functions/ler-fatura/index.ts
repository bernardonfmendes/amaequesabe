// Edge Function "ler-fatura": recebe o TEXTO de uma fatura (já sem NIF), pede à IA a lista de linhas
// e devolve JSON. A IA é a Claude (ANTHROPIC_API_KEY) ou, sem ela, o Gemini (GEMINI_API_KEY).
// As chaves ficam no Supabase (Secrets), nunca no site.
import { createClient } from "npm:@supabase/supabase-js@2.45.4";
import { pedirIA } from "../_shared/ia.ts";

const ORIGEM = "https://bernardonfmendes.github.io";
const cors = {
  "Access-Control-Allow-Origin": ORIGEM,
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (obj: unknown, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });

const PROMPT = `Recebes o texto de uma fatura de supermercado em Portugal.
Devolve SÓ JSON com: "loja" (nome do supermercado) e "linhas" (artigos comprados).
Para cada artigo: "nome" (como aparece, sem códigos), "quantidade" (número), "unidade" ("un", "g", "kg", "ml" ou "l"),
"precoLinha" (valor da linha antes de descontos, em euros, como número).
Se o artigo for vendido a peso (ex.: "0,678 X 4,99"), a quantidade é em kg e precoLinha é o total da linha.
Se o nome indicar o tamanho (ex.: "250G", "1L", "24U"), usa-o em "quantidade" e "unidade" e a quantidade total comprada.
Ignora linhas de descontos, poupanças, totais, IVA, pagamentos e moradas. Não inventes artigos.

Texto da fatura:
`;

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

  let corpo: { texto?: string };
  try { corpo = await req.json(); } catch { return json({ erro: "pedido inválido" }, 400); }
  // defesa extra: remove NIF e números de 9 dígitos antes de sair do Supabase
  const texto = String(corpo.texto ?? "").slice(0, 20000)
    .replace(/NIF[^\n]*/gi, "NIF [removido]")
    .replace(/\b\d{9}\b/g, "[removido]");

  const ia = await pedirIA({ texto: PROMPT + texto, temperatura: 0, maxTokens: 8000 });
  if (!ia.ok) return json({ erro: ia.erro }, 502);
  try {
    return json(JSON.parse(ia.texto));
  } catch {
    return json({ erro: "resposta inválida da IA" }, 502);
  }
});
