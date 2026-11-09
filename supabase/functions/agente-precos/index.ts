// Edge Function "agente-precos": agente semanal de preços do Continente, Pingo Doce e Auchan.
// Modos (corpo JSON {modo, ...}), sempre com o cabeçalho x-agente igual à chave guardada em agente_config:
//   categorias  -> lê os mapas de site (sitemaps) das lojas e guarda as subcategorias de comida
//   pagina      -> lê UMA página de categoria ({loja, url}) e guarda nome, tamanho e preço dos produtos
//   calcular    -> para cada ingrediente da app, escolhe o produto mais barato por kg/l/un em cada loja
//                  e guarda o resultado na linha "lojas" da tabela precos (que a app lê)
// Respeita os robots.txt das lojas: não usa pesquisa interna, paginação (?start, ?sz) nem ordenação (?srule).
import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const UA = { "User-Agent": "Mozilla/5.0 (compatible; AmaeQueSabe/1.0; uso familiar, leitura semanal lenta)", "Accept-Language": "pt-PT,pt;q=0.9" };
const DOMINIOS: Record<string, string> = { continente: "www.continente.pt", auchan: "www.auchan.pt", pingodoce: "www.pingodoce.pt" };
const json = (o: unknown, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json" } });

// ---------- texto ----------
const ENT: Record<string, string> = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " ", euro: "€",
  aacute: "á", eacute: "é", iacute: "í", oacute: "ó", uacute: "ú", Aacute: "Á", Eacute: "É", Iacute: "Í", Oacute: "Ó", Uacute: "Ú",
  atilde: "ã", otilde: "õ", Atilde: "Ã", Otilde: "Õ", ccedil: "ç", Ccedil: "Ç", acirc: "â", ecirc: "ê", ocirc: "ô", Acirc: "Â", Ecirc: "Ê", Ocirc: "Ô",
  agrave: "à", Agrave: "À", uuml: "ü", ordm: "º", ordf: "ª", deg: "°" };
const des = (t: string) => t.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, c) =>
  c[0] === "#" ? String.fromCodePoint(c[1] === "x" || c[1] === "X" ? parseInt(c.slice(2), 16) : parseInt(c.slice(1), 10)) : (ENT[c] ?? m));
const semTags = (t: string) => des(t.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<svg[\s\S]*?<\/svg>/gi, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
export const norm = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// ---------- tamanhos e preços por unidade ----------
const U: Record<string, [string, number]> = { kg: ["g", 1000], g: ["g", 1], gr: ["g", 1], grs: ["g", 1], l: ["ml", 1000], lt: ["ml", 1000], lts: ["ml", 1000],
  cl: ["ml", 10], ml: ["ml", 1], un: ["un", 1], uni: ["un", 1], unid: ["un", 1], unidades: ["un", 1], dz: ["un", 12], duzia: ["un", 12],
  cubos: ["un", 1], cubo: ["un", 1], saquetas: ["un", 1], ovos: ["un", 1] };
const n = (s: string) => Number(s.replace(",", "."));
export function tamanho(texto: string): { q: number; u: string } | null {
  const t = norm(texto).replace(/(\d) (\d{1,3})(?= ?(kg|g|gr|grs|l|lt|cl|ml)\b)/g, "$1.$2");
  let m = t.match(/(\d+) ?x ?(\d+(?:\.\d+)?) ?(kg|g|gr|grs|l|lt|lts|cl|ml)\b/);
  if (m) { const [u, f] = U[m[3]]; return { q: n(m[1]) * n(m[2]) * f, u }; }
  m = t.match(/emb (\d+(?:\.\d+)?) ?(kg|g|gr|grs|l|lt|lts|cl|ml|un|uni|unid|unidades|dz)\b/);
  if (!m) m = t.match(/(\d+(?:\.\d+)?) ?(kg|g|gr|grs|l|lt|lts|cl|ml)\b/);
  if (!m) m = t.match(/(\d+(?:\.\d+)?) ?(un|uni|unid|unidades|dz|cubos|cubo|saquetas|ovos)\b/);
  if (m) { const [u, f] = U[m[2]]; const q = n(m[1]) * f; return q > 0 ? { q, u } : null; }
  if (/\bkg$|\bkg\b/.test(t) && !/\d/.test(t)) return { q: 1000, u: "g" };   // "BORREGO PERNA KG": vendido ao quilo
  return null;
}
// "1,08 €/kg" -> {base: 0.00108, u: 'g'}
export function porUnidade(texto: string): { base: number; u: string } | null {
  // aceita "1,19 €/kg" e também "1 ,19€/kg" (o Continente parte o preço em dois blocos)
  const m = des(texto).match(/(\d+)\s*[.,]\s*(\d{2})\s*€\s*\/\s*(kg|lt|l|un|uni|unid|dz)\b/i);
  if (!m) return null;
  const k = m[3].toLowerCase(), v = Number(m[1] + "." + m[2]);
  if (k === "kg") return { base: v / 1000, u: "g" };
  if (k === "l" || k === "lt") return { base: v / 1000, u: "ml" };
  if (k === "dz") return { base: v / 12, u: "un" };
  return { base: v, u: "un" };
}

type Prod = { pid: string; nome: string; preco: number; qtd: number | null; unidade: string | null; preco_base: number | null; url: string | null };
function completa(p: Prod, textoTile: string, textoUnidade?: string) {
  const t = tamanho(p.nome) || tamanho(textoTile);
  const pu = porUnidade(textoUnidade ?? textoTile);
  if (t) { p.qtd = t.q; p.unidade = t.u; p.preco_base = p.preco / t.q; }
  // o preço por kg/l/un que a loja mostra é o mais fiável (nos produtos ao peso, o tamanho é só aproximado)
  if (pu && (!t || pu.u === t.u)) { p.unidade = pu.u; p.preco_base = pu.base; }
}

// ---------- leitura das páginas de categoria ----------
export function lerContinente(html: string): Prod[] {
  const out: Prod[] = [];
  for (const parte of html.split("data-product-tile-impression='").slice(1)) {
    const fim = parte.indexOf("'");
    let d: any; try { d = JSON.parse(des(parte.slice(0, fim))); } catch { continue; }
    if (!d?.id || !(Number(d.price) > 0)) continue;
    const bloco = parte.slice(fim, fim + 20000);
    const url = (bloco.match(/href="(https:\/\/www\.continente\.pt\/produto\/[^"]+)"/) || [])[1] || null;
    const texto = semTags(bloco);
    const p: Prod = { pid: String(d.id), nome: des(String(d.name)).trim(), preco: Number(d.price), qtd: null, unidade: null, preco_base: null, url };
    completa(p, texto.slice(0, 900));
    out.push(p);
  }
  return out;
}
export function lerAuchan(html: string): Prod[] {
  const out: Prod[] = [];
  for (const parte of html.split("auc-js-product-tile").slice(1)) {
    const g = parte.match(/data-gtm="([^"]+)"/);
    if (!g) continue;
    let d: any; try { d = JSON.parse(des(g[1])); } catch { continue; }
    if (!d?.id || !(Number(d.price) > 0)) continue;
    const urls = parte.match(/data-urls="([^"]+)"/);
    let url: string | null = null;
    try { url = urls ? JSON.parse(des(urls[1])).absoluteProductUrl ?? null : null; } catch { /* sem url */ }
    const texto = semTags(parte.slice(0, 25000));
    const p: Prod = { pid: String(d.id), nome: des(String(d.name)).trim(), preco: Number(d.price), qtd: null, unidade: null, preco_base: null, url };
    completa(p, "", texto);
    out.push(p);
  }
  return out;
}
export function lerPingoDoce(html: string): Prod[] {
  const out: Prod[] = [];
  for (const parte of html.split('class="product-tile-pd"').slice(1)) {
    const g = parte.match(/data-gtm-info='([^']+)'/);
    if (!g) continue;
    let d: any; try { d = JSON.parse(des(g[1])); } catch { continue; }
    const it = d?.items?.[0];
    if (!it?.item_id || !(Number(it.price) > 0)) continue;
    const un = (parte.match(/class="product-unit">([\s\S]*?)<\/div>/) || [])[1] || "";
    const href = (parte.match(/href="(\/home\/produtos\/[^"]+?\.html)"/) || [])[1];
    const p: Prod = { pid: String(it.item_id), nome: des(String(it.item_name)).trim(), preco: Number(it.price), qtd: null, unidade: null, preco_base: null,
      url: href ? "https://www.pingodoce.pt" + href : null };
    completa(p, semTags(un), semTags(un));
    out.push(p);
  }
  return out;
}
const LEITORES: Record<string, (h: string) => Prod[]> = { continente: lerContinente, auchan: lerAuchan, pingodoce: lerPingoDoce };

// ---------- mapas de site: subcategorias de comida (só as "folhas") ----------
const RAIZES: Record<string, RegExp> = {
  continente: /^https:\/\/www\.continente\.pt\/supermercado\/(frutas-e-legumes|talho|peixaria|charcutaria-e-queijos|laticinios-e-ovos|mercearia|congelados|padaria-e-pastelaria|refeicoes-prontas|bio-eco-e-saudavel)\//,
  auchan: /^https:\/\/www\.auchan\.pt\/pt\/(produtos-frescos|alimentacao)\//,
  pingodoce: /^https:\/\/www\.pingodoce\.pt\/home\/produtos\/[a-z0-9-]+\//,
};
const MAPAS: Record<string, string> = {
  continente: "https://www.continente.pt/sitemap_index.xml",
  auchan: "https://www.auchan.pt/sitemap_index.xml",
  pingodoce: "https://www.pingodoce.pt/home/sitemap_index.xml",
};
const locs = (x: string) => [...x.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => des(m[1]));
async function categorias(loja: string): Promise<string[]> {
  const idx = locs(await (await fetch(MAPAS[loja], { headers: UA })).text());
  const filhos = idx.filter((u) => loja === "pingodoce" ? !/product|image/i.test(u) : /-category\.xml$/i.test(u));
  const todas = new Set<string>();
  for (const f of filhos) for (const u of locs(await (await fetch(f, { headers: UA })).text())) if (RAIZES[loja].test(u) && !/[?#]/.test(u)) todas.add(u.endsWith("/") ? u : u + "/");
  const lista = [...todas];
  return lista.filter((u) => !lista.some((o) => o !== u && o.startsWith(u)));   // só as subcategorias finais
}

// ---------- correspondência ingrediente -> produto ----------
type Ing = { id: string; nome: string; u: string; pack: number; palavras: string[]; alguma: string[] | null; excluir: string[]; ref_base: number | null };
// palavra obrigatória: igual ou com até 2 letras a mais (plural); expressão com espaços: tem de aparecer seguida
const tem = (toks: string[], p: string) => p.includes(" ") ? (" " + toks.join(" ") + " ").includes(" " + p + " ") || (" " + toks.join(" ") + " ").includes(" " + p) : toks.some((t) => t === p || (t.startsWith(p) && t.length - p.length <= 2));
// palavra a excluir: apanha todas as variações ("congel" -> "congelados"); as muito curtas (até 3 letras) só exatas
const tira = (toks: string[], p: string) => p.includes(" ") ? (" " + toks.join(" ") + " ").includes(" " + p) : toks.some((t) => p.length <= 3 ? t === p : t.startsWith(p));
// palavras que nunca indicam um ingrediente base (salvo se o próprio ingrediente as tiver no nome ou nas regras)
const GERAIS = ["noodles", "instantane", "sabor", "aroma", "racao", "alimento", "pate", "snack", "granola", "barra", "nestum", "gelado",
  "refeicao", "tempero", "fiambre", "toucinho", "barrinha", "douradinho", "croquete", "rissol", "nugget", "panad", "batido", "sumo", "nectar",
  "compota", "doce de", "creme de", "manteiga de", "bolacha", "cereais", "iogurte", "pudim", "mousse", "tarte", "bolo", "pizza", "sandes",
  "tosta", "wrap", "sopa", "chips", "pipocas", "infusao", "cha de", "licor", "gomas", "chocolate", "biscoito", "papa", "bebe", "infantil"];
// lista geral aplicável a um ingrediente: sem as palavras que ele próprio usa
export function geraisDe(ing: Ing): string[] {
  const proprios = [...norm(ing.nome).split(" "), ...ing.palavras, ...(ing.alguma || [])].join(" ");
  return GERAIS.filter((g) => !(" " + proprios + " ").includes(" " + g.split(" ")[0]));
}
export function escolhe(ing: Ing, prods: { nome: string; n: string[]; preco: number; qtd: number | null; unidade: string | null; preco_base: number | null; url: string | null }[]) {
  let melhor: any = null;
  for (const p of prods) {
    if (p.unidade !== ing.u || !(p.preco_base! > 0)) continue;
    if (!ing.palavras.every((w) => tem(p.n, w))) continue;
    if (ing.alguma && ing.alguma.length && !ing.alguma.some((w) => tem(p.n, w))) continue;
    if (ing.excluir.some((w) => tira(p.n, w))) continue;
    if ((ing as any)._gerais.some((w: string) => tira(p.n, w))) continue;
    if (ing.ref_base && (p.preco_base! < ing.ref_base * 0.4 || p.preco_base! > ing.ref_base * 2.5)) continue;
    if (!melhor || p.preco_base! < melhor.preco_base) melhor = p;
  }
  return melhor;
}
const PARAGENS = new Set(["de", "da", "do", "das", "dos", "e", "com", "em", "para", "a", "o", "ao", "fresco", "fresca", "lata", "molho", "po"]);
const palavrasDe = (nome: string) => norm(nome.replace(/\(.*?\)/g, " ")).split(" ").filter((w) => w.length >= 3 && !PARAGENS.has(w)).slice(0, 3);

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ erro: "método" }, 405);
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  // chave guardada na tabela privada agente_config (sem acesso pela API pública)
  const { data: cfg } = await db.from("agente_config").select("valor").eq("chave", "segredo").maybeSingle();
  if (!cfg?.valor || req.headers.get("x-agente") !== cfg.valor) return json({ erro: "não autorizado" }, 401);
  let c: any = {}; try { c = await req.json(); } catch { /* vazio */ }

  if (c.modo === "categorias") {
    const res: Record<string, number> = {};
    for (const loja of Object.keys(MAPAS)) {
      try {
        const urls = await categorias(loja);
        res[loja] = urls.length;
        for (let i = 0; i < urls.length; i += 500)
          await db.from("lojas_categorias").upsert(urls.slice(i, i + 500).map((url) => ({ loja, url })), { onConflict: "loja,url", ignoreDuplicates: true });
      } catch (e) { res[loja] = -1; console.error(loja, e); }
    }
    return json({ ok: true, categorias: res });
  }

  if (c.modo === "pagina") {
    const loja = String(c.loja || ""), url = String(c.url || "");
    let host = ""; try { host = new URL(url).host; } catch { /* inválido */ }
    if (!LEITORES[loja] || host !== DOMINIOS[loja]) return json({ erro: "loja ou endereço inválido" }, 400);
    const { data: cat } = await db.from("lojas_categorias").select("url").eq("loja", loja).eq("url", url).maybeSingle();
    if (!cat) return json({ erro: "categoria desconhecida" }, 400);
    let prods: Prod[] = [], erro: string | null = null;
    try {
      const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(25000) });
      if (!r.ok) erro = "HTTP " + r.status; else prods = LEITORES[loja](await r.text());
    } catch (e) { erro = String((e as Error)?.message ?? e).slice(0, 200); }
    const agora = new Date().toISOString();
    if (prods.length) {
      const vistos = new Map<string, Prod>(); for (const p of prods) vistos.set(p.pid, p);
      await db.from("lojas_produtos").upsert([...vistos.values()].map((p) => ({ loja, ...p, categoria: url, visto_em: agora })), { onConflict: "loja,pid" });
    }
    await db.from("lojas_categorias").update({ lida_em: agora, produtos: prods.length, erro }).eq("loja", loja).eq("url", url);
    await db.from("agente_fila").update({ estado: erro ? "erro" : "feito" }).eq("loja", loja).eq("url", url);
    return json({ ok: !erro, produtos: prods.length, erro });
  }

  if (c.modo === "calcular") {
    const desde = new Date(Date.now() - 10 * 86400000).toISOString();   // só produtos vistos nos últimos 10 dias
    const prods: Record<string, any[]> = { continente: [], auchan: [], pingodoce: [] };
    for (const loja of Object.keys(prods)) {
      for (let de = 0; ; de += 1000) {
        const { data, error } = await db.from("lojas_produtos").select("nome,preco,qtd,unidade,preco_base,url")
          .eq("loja", loja).gte("visto_em", desde).not("preco_base", "is", null).range(de, de + 999);
        if (error) return json({ erro: error.message }, 500);
        for (const p of data || []) prods[loja].push({ ...p, preco: Number(p.preco), qtd: p.qtd == null ? null : Number(p.qtd), preco_base: Number(p.preco_base), n: norm(p.nome).split(" ") });
        if (!data || data.length < 1000) break;
      }
    }
    const { data: ings } = await db.from("ingredientes_agente").select("*");
    const lista: Ing[] = (ings || []).map((i: any) => ({ ...i, pack: Number(i.pack), ref_base: i.ref_base == null ? null : Number(i.ref_base) }));
    // ingredientes novos criados nas casas (customIngs): palavras tiradas do nome
    const { data: casas } = await db.from("casa").select("state");
    const vistosIds = new Set(lista.map((i) => i.id));
    for (const cs of casas || []) for (const ci of (cs.state?.customIngs || [])) {
      if (!ci?.id || vistosIds.has(ci.id) || !["g", "ml", "un"].includes(ci.u) || !(Number(ci.pack) > 0)) continue;
      const pal = palavrasDe(String(ci.nome || ""));
      if (!pal.length) continue;
      vistosIds.add(ci.id);
      lista.push({ id: ci.id, nome: ci.nome, u: ci.u, pack: Number(ci.pack), palavras: pal.slice(0, 2), alguma: null, excluir: [], ref_base: Number(ci.est) > 0 ? Number(ci.est) / Number(ci.pack) : null });
    }
    const lojas: Record<string, Record<string, any>> = { continente: {}, auchan: {}, pingodoce: {} };
    let total = 0;
    for (const ing of lista) (ing as any)._gerais = geraisDe(ing);
    for (const loja of Object.keys(lojas)) for (const ing of lista) {
      const m = escolhe(ing, prods[loja]);
      if (!m) continue;
      const v = Math.round(m.preco_base * ing.pack * 100) / 100;
      if (!(v > 0)) continue;
      lojas[loja][ing.id] = { v, b: m.preco_base, p: m.nome, q: m.qtd, pr: m.preco, u: m.url };
      total++;
    }
    const state = { fonte: "sites do Continente, Pingo Doce e Auchan", atualizado: new Date().toISOString().slice(0, 10), recolhido: new Date().toISOString(),
      produtosLidos: { continente: prods.continente.length, auchan: prods.auchan.length, pingodoce: prods.pingodoce.length },
      ingredientes: lista.length, lojas };
    const { error } = await db.from("precos").upsert({ id: "lojas", state, saved_at: Date.now(), updated_by: "agente-precos" });
    if (error) return json({ erro: error.message }, 500);
    return json({ ok: true, ingredientes: lista.length, precos: total,
      porLoja: Object.fromEntries(Object.entries(lojas).map(([k, v]) => [k, Object.keys(v).length])), produtosLidos: state.produtosLidos });
  }
  return json({ erro: "modo desconhecido" }, 400);
});
