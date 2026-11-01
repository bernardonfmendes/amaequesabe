// Ponto único para falar com a IA das Edge Functions.
// Usa a Claude se existir o segredo ANTHROPIC_API_KEY (modelo em ANTHROPIC_MODEL, por defeito claude-haiku-5-5).
// Se não existir, usa o Gemini (GEMINI_API_KEY), como antes. Os segredos ficam no Supabase, nunca no site.

export type Resposta = { ok: true; texto: string } | { ok: false; erro: string };

const TEMPO_MAX_MS = 120000;

// a Claude às vezes devolve o JSON dentro de ```json ... ```; tira essas marcas
function semCercas(t: string): string {
  return t.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
}

async function claude(texto: string, temperatura: number, chave: string): Promise<Resposta> {
  const modelo = Deno.env.get("ANTHROPIC_MODEL") ?? "claude-haiku-5-5";
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": chave, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: modelo,
      max_tokens: 2048,
      temperature: Math.min(temperatura, 1),
      messages: [{ role: "user", content: texto }],
    }),
    signal: AbortSignal.timeout(TEMPO_MAX_MS),
  });
  if (!resp.ok) {
    let detalhe = "";
    try { detalhe = (await resp.json())?.error?.message ?? ""; } catch { /* sem detalhe */ }
    return { ok: false, erro: "a Claude não respondeu (" + resp.status + ")" + (detalhe ? ": " + detalhe.slice(0, 300) : "") };
  }
  const dados = await resp.json();
  const bruto = (dados?.content ?? [])
    .filter((b: any) => b?.type === "text")
    .map((b: any) => String(b.text))
    .join("");
  return { ok: true, texto: semCercas(bruto) };
}

async function gemini(texto: string, temperatura: number, chave: string): Promise<Resposta> {
  const modelos = [Deno.env.get("GEMINI_MODEL") ?? "gemini-3.8-flash"];
  const reserva = Deno.env.get("GEMINI_MODEL_RESERVA");
  if (reserva && reserva !== modelos[0]) modelos.push(reserva);

  let resp: Response | null = null;
  for (const modelo of modelos) {
    resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": chave },
      body: JSON.stringify({
        contents: [{ parts: [{ text: texto }] }],
        generationConfig: { responseMimeType: "application/json", temperature: temperatura },
      }),
      signal: AbortSignal.timeout(TEMPO_MAX_MS),
    });
    if (resp.ok || ![429, 500, 503].includes(resp.status)) break;
  }
  if (!resp!.ok) {
    let detalhe = "";
    try { detalhe = (await resp!.json())?.error?.message ?? ""; } catch { /* sem detalhe */ }
    return { ok: false, erro: "o Gemini não respondeu (" + resp!.status + ")" + (detalhe ? ": " + detalhe.slice(0, 300) : "") };
  }
  const dados = await resp!.json();
  return { ok: true, texto: dados?.candidates?.[0]?.content?.parts?.[0]?.text ?? "" };
}

export async function pedirTextoIA(texto: string, temperatura: number): Promise<Resposta> {
  const chaveClaude = Deno.env.get("ANTHROPIC_API_KEY");
  if (chaveClaude) return claude(texto, temperatura, chaveClaude);
  const chaveGemini = Deno.env.get("GEMINI_API_KEY");
  if (chaveGemini) return gemini(texto, temperatura, chaveGemini);
  return { ok: false, erro: "chave não configurada (ANTHROPIC_API_KEY ou GEMINI_API_KEY)" };
}
