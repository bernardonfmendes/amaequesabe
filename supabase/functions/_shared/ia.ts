// Ponto único para falar com a IA das Edge Functions.
// Usa a Claude se existir o segredo ANTHROPIC_API_KEY (modelo em ANTHROPIC_MODEL, por defeito claude-haiku-5-5).
// Se a Claude falhar por sobrecarga e existir GEMINI_API_KEY, tenta o Gemini como reserva.
// Sem ANTHROPIC_API_KEY, usa só o Gemini, como antes. Os segredos ficam no Supabase, nunca no site.

export type Resposta = { ok: true; texto: string; motor: string } | { ok: false; erro: string };
export type Pedido = { texto: string; temperatura?: number; imagemJpeg?: string; maxTokens?: number };

const TEMPO_MAX_MS = 120000;
const SOBRECARGA = [429, 500, 502, 503, 529];

// a Claude às vezes devolve o JSON dentro de ```json ... ``` ou com uma frase antes; fica só o objeto
function soJson(t: string): string {
  const s = t.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  const a = s.indexOf("{"), b = s.lastIndexOf("}");
  return a >= 0 && b > a ? s.slice(a, b + 1) : s;
}

async function claude(p: Pedido, chave: string): Promise<Resposta & { estado?: number }> {
  const modelo = Deno.env.get("ANTHROPIC_MODEL") ?? "claude-haiku-5-5";
  const conteudo: unknown[] = [];
  if (p.imagemJpeg) conteudo.push({ type: "image", source: { type: "base64", media_type: "image/jpeg", data: p.imagemJpeg } });
  conteudo.push({ type: "text", text: p.texto + "\n\nResponde apenas com o objeto JSON, sem texto antes ou depois." });
  let resp: Response;
  try {
    resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": chave, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: modelo,
        max_tokens: p.maxTokens ?? 4096,
        temperature: Math.min(p.temperatura ?? 0.3, 1),
        messages: [{ role: "user", content: conteudo }],
      }),
      signal: AbortSignal.timeout(TEMPO_MAX_MS),
    });
  } catch (e) {
    return { ok: false, erro: "a Claude não respondeu a tempo", estado: 504 };
  }
  if (!resp.ok) {
    let detalhe = "";
    try { detalhe = (await resp.json())?.error?.message ?? ""; } catch { /* sem detalhe */ }
    return { ok: false, erro: "a Claude não respondeu (" + resp.status + ")" + (detalhe ? ": " + detalhe.slice(0, 300) : ""), estado: resp.status };
  }
  const dados = await resp.json();
  const bruto = (dados?.content ?? []).filter((b: any) => b?.type === "text").map((b: any) => String(b.text)).join("");
  return { ok: true, texto: soJson(bruto), motor: "claude" };
}

async function gemini(p: Pedido, chave: string): Promise<Resposta> {
  const modelos = [Deno.env.get("GEMINI_MODEL") ?? "gemini-3.8-flash"];
  const reserva = Deno.env.get("GEMINI_MODEL_RESERVA");
  if (reserva && reserva !== modelos[0]) modelos.push(reserva);
  const partes: unknown[] = [{ text: p.texto }];
  if (p.imagemJpeg) partes.push({ inline_data: { mime_type: "image/jpeg", data: p.imagemJpeg } });

  let resp: Response | null = null;
  for (const modelo of modelos) {
    try {
      resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": chave },
        body: JSON.stringify({
          contents: [{ parts: partes }],
          generationConfig: { responseMimeType: "application/json", ...(p.temperatura != null ? { temperature: p.temperatura } : {}) },
        }),
        signal: AbortSignal.timeout(TEMPO_MAX_MS),
      });
    } catch {
      return { ok: false, erro: "o Gemini não respondeu a tempo" };
    }
    if (resp.ok || !SOBRECARGA.includes(resp.status)) break;
  }
  if (!resp!.ok) {
    let detalhe = "";
    try { detalhe = (await resp!.json())?.error?.message ?? ""; } catch { /* sem detalhe */ }
    return { ok: false, erro: "o Gemini não respondeu (" + resp!.status + ")" + (detalhe ? ": " + detalhe.slice(0, 300) : "") };
  }
  const dados = await resp!.json();
  return { ok: true, texto: soJson(dados?.candidates?.[0]?.content?.parts?.[0]?.text ?? ""), motor: "gemini" };
}

export async function pedirIA(p: Pedido): Promise<Resposta> {
  const chaveClaude = Deno.env.get("ANTHROPIC_API_KEY");
  const chaveGemini = Deno.env.get("GEMINI_API_KEY");
  if (chaveClaude) {
    const r = await claude(p, chaveClaude);
    if (r.ok || !chaveGemini || !SOBRECARGA.concat([504]).includes(r.estado ?? 0)) return r.ok ? r : { ok: false, erro: r.erro };
    return gemini(p, chaveGemini);   // Claude sobrecarregada: tenta o Gemini
  }
  if (chaveGemini) return gemini(p, chaveGemini);
  return { ok: false, erro: "chave não configurada (ANTHROPIC_API_KEY ou GEMINI_API_KEY)" };
}

// compatibilidade com as funções que só enviam texto
export const pedirTextoIA = (texto: string, temperatura: number) => pedirIA({ texto, temperatura });
