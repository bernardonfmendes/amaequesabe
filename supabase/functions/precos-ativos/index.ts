// Edge Function "precos-ativos": lê a tabela pública do cabaz alimentar do Ativos.pt
// (preços online de Continente, Pingo Doce e Auchan, atualizados pelo Ativos.pt todos os dias)
// e guarda-a na linha "ativos" da tabela public.precos. Corre uma vez por semana (pg_cron).
// Faz no máximo um pedido ao Ativos.pt a cada 20 horas, mesmo que seja chamada mais vezes.
import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const FONTE = "https://www.ativos.pt/cabaz-alimentar/produtos";
const LOJAS: Record<string, string> = { "continente": "continente", "pingo doce": "pingodoce", "auchan": "auchan" };
const INTERVALO_MS = 20 * 3600 * 1000;      // não volta a ler o Ativos.pt antes disto
const INTERVALO_FORCADO_MS = 10 * 60 * 1000; // pedido manual: no mínimo 10 minutos entre leituras

const json = (obj: unknown, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });

const limpa = (t: string) => t.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, " ").trim();
const num = (s: string) => Number(s.replace(/\./g, "").replace(",", "."));

type Loja = { preco: number; porUnidade: number | null; unidade: string | null; promo: boolean; aprox: boolean; produto: string };
type Produto = { nome: string; qtd: string; lojas: Record<string, Loja> };

function lerTabela(html: string): Produto[] {
  const ini = html.search(/<table\b/i), fim = html.search(/<\/table>/i);
  if (ini < 0 || fim < ini) return [];
  const tabela = html.slice(ini, fim);
  const produtos: Produto[] = [];
  for (const tr of tabela.split(/<tr\b/i).slice(1)) {
    if (!/scope="row"/i.test(tr)) continue;                       // linhas de categoria não têm scope="row"
    const corte = tr.search(/<td\b/i);
    if (corte < 0) continue;
    const th = tr.slice(0, corte);
    const m = th.match(/<span class="block">([\s\S]*?)<\/span>\s*<span[^>]*>([\s\S]*?)<\/span>/i);
    if (!m) continue;
    const p: Produto = { nome: limpa(m[1]), qtd: limpa(m[2]), lojas: {} };
    for (const td of tr.slice(corte).split(/<td\b/i).slice(1)) {
      const rot = td.match(/sm:hidden">([^<]+)<\/span>/i);
      const loja = rot ? LOJAS[limpa(rot[1]).toLowerCase()] : undefined;
      if (!loja) continue;                                          // Froiz e El Corte Inglês não são usadas na app
      if (/Estimativa com base/i.test(td)) continue;                // o Ativos.pt não tem preço desta loja: fica de fora
      const preco = td.match(/(\d{1,3}(?:\.\d{3})*,\d{2})\s*€\s*</);
      if (!preco) continue;
      const pu = td.match(/(\d{1,3}(?:\.\d{3})*,\d{2})\s*€\s*\/\s*([a-zA-Z]+)/);
      const nomeLoja = td.match(/<span class="sr-only">([\s\S]*?)<\/span>/i);
      p.lojas[loja] = {
        preco: num(preco[1]),
        porUnidade: pu ? num(pu[1]) : null,
        unidade: pu ? pu[2].toLowerCase() : null,
        promo: /Preço em promoção/i.test(td),
        aprox: /Produto aproximado/i.test(td),
        produto: nomeLoja ? limpa(nomeLoja[1]).slice(0, 120) : "",
      };
    }
    produtos.push(p);
  }
  return produtos;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ erro: "método" }, 405);
  let forcar = false;
  try { forcar = !!(await req.json())?.forcar; } catch { /* sem corpo */ }

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data: atual } = await admin.from("precos").select("saved_at,state").eq("id", "ativos").maybeSingle();
  const passou = Date.now() - Number(atual?.saved_at || 0);
  if (atual && passou < (forcar ? INTERVALO_FORCADO_MS : INTERVALO_MS)) {
    return json({ ok: true, guardado: false, motivo: "leitura recente", atualizado: atual.state?.atualizado ?? null });
  }

  let html = "";
  try {
    const r = await fetch(FONTE, {
      signal: AbortSignal.timeout(20000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; AmaeQueSabe/1.0; uso familiar, 1 pedido por semana)", "Accept-Language": "pt-PT,pt;q=0.9" },
    });
    if (!r.ok) return json({ erro: "o Ativos.pt respondeu " + r.status }, 502);
    html = await r.text();
  } catch (e) {
    return json({ erro: "não consegui ler o Ativos.pt: " + String((e as Error)?.message ?? e) }, 502);
  }

  const produtos = lerTabela(html);
  const comPreco = produtos.filter((p) => Object.keys(p.lojas).length > 0).length;
  // se a página mudar de formato, não estraga os preços que já estão guardados
  if (produtos.length < 20 || comPreco < 15) {
    return json({ erro: "a página do Ativos.pt mudou de formato (" + produtos.length + " produtos lidos). Preços anteriores mantidos." }, 502);
  }
  const dm = html.match(/"dateModified"\s*:\s*"([^"]+)"/);
  const atualizado = dm ? dm[1].slice(0, 10) : new Date().toISOString().slice(0, 10);

  const state = { fonte: "Ativos.pt", url: FONTE, atualizado, recolhido: new Date().toISOString(), produtos };
  const { error } = await admin.from("precos").upsert({ id: "ativos", state, saved_at: Date.now(), updated_by: "precos-ativos" });
  if (error) return json({ erro: "não consegui guardar: " + error.message }, 500);
  return json({ ok: true, guardado: true, atualizado, produtos: produtos.length, comPreco });
});
