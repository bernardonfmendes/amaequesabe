// Sites de onde a app pode chamar as funções (GitHub Pages e Vercel). Outros sites podem ser
// acrescentados no segredo APP_ORIGENS (separados por vírgulas), sem mudar o código.
export const ORIGENS = [
  "https://bernardonfmendes.github.io",
  "https://amaequesabe.vercel.app",
  ...(Deno.env.get("APP_ORIGENS") ?? "").split(",").map((s) => s.trim()).filter((s) => /^https:\/\//.test(s)),
];
// endereço da app para cada site (para onde levam os links dos emails)
export function appUrl(origem: string | null): string {
  if (origem === "https://bernardonfmendes.github.io" || !origem || !ORIGENS.includes(origem)) return "https://bernardonfmendes.github.io/amaequesabe/";
  return origem + "/";
}
// responde com o cabeçalho CORS certo para o site que fez o pedido
export function servir(tratar: (req: Request) => Promise<Response>) {
  Deno.serve(async (req) => {
    const r = await tratar(req);
    const o = req.headers.get("Origin");
    r.headers.set("Access-Control-Allow-Origin", o && ORIGENS.includes(o) ? o : ORIGENS[0]);
    r.headers.set("Vary", "Origin");
    return r;
  });
}
