// Edge Function "ler-link": lê o texto público de um link de receita (página, Instagram, TikTok, etc.)
// e devolve título, descrição e receita estruturada (JSON-LD), se existir. Só para utilizadores ligados.
// Não é garantido: muitas redes sociais só mostram a legenda; nesses casos a app pede para colar o texto.
import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const ORIGEM = "https://bernardonfmendes.github.io";
const cors = {
  "Access-Control-Allow-Origin": ORIGEM,
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (obj: unknown, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });

// recusa endereços locais e privados (evita pedir coisas da rede interna)
function endereçoPublico(u: URL): boolean {
  if (u.protocol !== "https:") return false;
  const h = u.hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal")) return false;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(h)) {
    const [a, b] = h.split(".").map(Number);
    if (a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 192 && b === 168) || (a === 172 && b >= 16 && b <= 31)) return false;
  }
  if (h.includes(":")) return false;  // IPv6 direto
  return true;
}
const decodificar = (t: string) => t.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim();
function meta(html: string, nome: string): string {
  const m = html.match(new RegExp('<meta[^>]+(?:property|name)=["\']' + nome + '["\'][^>]*content=["\']([^"\']*)["\']', "i"))
    || html.match(new RegExp('<meta[^>]+content=["\']([^"\']*)["\'][^>]*(?:property|name)=["\']' + nome + '["\']', "i"));
  return m ? decodificar(m[1]) : "";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (req.method !== "POST") return json({ erro: "método" }, 405);

  const auth = req.headers.get("Authorization") ?? "";
  const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: auth } },
  });
  const { data: { user } } = await supa.auth.getUser();
  if (!user || !user.email) return json({ erro: "sem sessão" }, 401);
  const { data: autorizado } = await supa.from("allowed_emails").select("email").eq("email", user.email).maybeSingle();
  if (!autorizado) return json({ erro: "conta não autorizada" }, 403);

  let corpo: { url?: unknown };
  try { corpo = await req.json(); } catch { return json({ erro: "pedido inválido" }, 400); }
  let u: URL;
  try { u = new URL(String(corpo.url ?? "").trim()); } catch { return json({ erro: "Esse link não parece válido." }, 400); }
  if (!endereçoPublico(u)) return json({ erro: "Só consigo ler links https públicos." }, 400);

  let html = "";
  try {
    const r = await fetch(u.toString(), {
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; AmaeQueSabe/1.0)", "Accept-Language": "pt-PT,pt;q=0.9" },
    });
    if (!r.ok) return json({ erro: "A página não respondeu (" + r.status + "). Cola o texto da receita." }, 422);
    html = (await r.text()).slice(0, 1500000);
  } catch {
    return json({ erro: "Não consegui abrir o link. Cola o texto da receita." }, 422);
  }

  const titulo = meta(html, "og:title") || decodificar((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || ["", ""])[1]);
  const descricao = meta(html, "og:description") || meta(html, "description");
  // receita estruturada (JSON-LD), se a página a tiver
  let receita = "";
  for (const bloco of html.match(/<script[^>]+application\/ld\+json[^>]*>[\s\S]*?<\/script>/gi) || []) {
    const corpoJson = bloco.replace(/^<script[^>]*>/i, "").replace(/<\/script>$/i, "");
    try {
      const dados = JSON.parse(corpoJson);
      const itens = Array.isArray(dados) ? dados : [dados, ...(dados["@graph"] || [])];
      const rec = itens.find((i: any) => i && (i["@type"] === "Recipe" || (Array.isArray(i["@type"]) && i["@type"].includes("Recipe"))));
      if (rec) {
        const ings = (rec.recipeIngredient || []).map((x: any) => String(x)).join("; ");
        const passos = (rec.recipeInstructions || []).map((x: any) => (typeof x === "string" ? x : x.text || "")).filter(Boolean).join(" ");
        receita = "Ingredientes: " + ings + "\nPassos: " + passos;
        break;
      }
    } catch { /* JSON-LD inválido: ignora */ }
  }

  const texto = [titulo, descricao, receita].filter(Boolean).join("\n\n").slice(0, 4000);
  if (texto.length < 40) return json({ erro: "Esta página não mostra a receita ao leitor automático. Cola o texto da legenda ou da receita." }, 422);
  return json({ texto, fonte: u.hostname });
});
