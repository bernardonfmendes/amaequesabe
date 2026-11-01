// Edge Function "convidar-pessoa": pede-se um convite com um email.
// - Quem pede sem sessão: a pessoa fica com uma casa nova (cópia dos dados atuais).
// - Quem pede com sessão e já tem casa (um membro): a pessoa entra nessa mesma casa.
// Em qualquer caso: o email fica autorizado (allowed_emails) e chega um email para criar/definir a palavra-passe.
// Usa a SERVICE_ROLE_KEY que o Supabase já põe disponível nas Edge Functions (nunca vai para o browser).
// Deploy com verify_jwt = false (quem pede pode não ter conta).
import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const ORIGEM = "https://bernardonfmendes.github.io";
const APP_URL = "https://bernardonfmendes.github.io/amaequesabe/";
const cors = {
  "Access-Control-Allow-Origin": ORIGEM,
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (obj: unknown, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (req.method !== "POST") return json({ erro: "método" }, 405);

  let corpo: { email?: unknown };
  try { corpo = await req.json(); } catch { return json({ erro: "pedido inválido" }, 400); }
  const email = String(corpo.email ?? "").trim().toLowerCase();
  if (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ erro: "Escreve um email válido." }, 400);
  }

  const url = Deno.env.get("SUPABASE_URL")!;
  const admin = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // quem convida: se for um membro de uma casa, o convidado entra nessa casa
  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
  let casaDeQuemConvida: string | null = null;
  if (token) {
    const { data: { user: quem } } = await admin.auth.getUser(token);
    if (quem) {
      const { data: membro } = await admin.from("household_members")
        .select("household_id").eq("user_id", quem.id).maybeSingle();
      casaDeQuemConvida = membro?.household_id ?? null;
    }
  }

  // 1) autorizar o email (idempotente)
  const { error: erroAut } = await admin.from("allowed_emails")
    .upsert({ email }, { onConflict: "email", ignoreDuplicates: true });
  if (erroAut) return json({ erro: "Não consegui registar o email. Tenta outra vez." }, 500);

  // 2) convite pendente para a casa de quem convida
  if (casaDeQuemConvida) {
    const { error: erroConv } = await admin.from("convites")
      .upsert({ email, household_id: casaDeQuemConvida }, { onConflict: "email" });
    if (erroConv) return json({ erro: "Não consegui guardar o convite. Tenta outra vez." }, 500);
  }

  // 3) convite novo; se a conta já existe, envia o email de definir palavra-passe
  const { error: erroConvite } = await admin.auth.admin.inviteUserByEmail(email, { redirectTo: APP_URL });
  if (erroConvite) {
    const m = erroConvite.message || "";
    if (/already|registered|exists/i.test(m)) {
      const anon = createClient(url, Deno.env.get("SUPABASE_ANON_KEY")!, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
      await anon.auth.resetPasswordForEmail(email, { redirectTo: APP_URL });
    } else {
      return json({ erro: "Não consegui enviar o email. Tenta daqui a pouco." }, 502);
    }
  }

  // resposta igual para qualquer email (não revela quem já tem conta)
  return json({ ok: true });
});
