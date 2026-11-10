// Edge Function "convidar-pessoa": pede-se um convite com um email.
// - Quem pede sem sessão: a pessoa fica com uma casa nova e VAZIA (não leva dados de ninguém).
// - Quem pede com sessão e é administrador de uma casa: a pessoa entra nessa casa, até 3 pessoas por casa.
// Em qualquer caso: o email fica autorizado (allowed_emails) e chega um email para criar/definir a palavra-passe.
// Limites contra abusos: por email, por quem convida e no total de pedidos sem sessão.
// Usa a SERVICE_ROLE_KEY que o Supabase já põe disponível nas Edge Functions (nunca vai para o browser).
// Deploy com verify_jwt = false (quem pede pode não ter conta).
import { createClient } from "npm:@supabase/supabase-js@2.45.4";
import { servir, appUrl } from "../_shared/cors.ts";

const MAX_PESSOAS = 3;
const cors = {
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (obj: unknown, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });
const MUITOS = "Já foram pedidos muitos convites. Tenta daqui a uma hora.";

servir(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (req.method !== "POST") return json({ erro: "método" }, 405);

  const APP_URL = appUrl(req.headers.get("Origin"));
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
  let quemId: string | null = null;
  let casaDeQuemConvida: string | null = null;
  let quemEAdmin = false;
  if (token) {
    const { data: { user: quem } } = await admin.auth.getUser(token);
    if (quem) {
      quemId = quem.id;
      const { data: membro } = await admin.from("household_members")
        .select("household_id,papel").eq("user_id", quem.id).maybeSingle();
      casaDeQuemConvida = membro?.household_id ?? null;
      quemEAdmin = membro?.papel === "admin";
    }
  }

  // casa com lugar: no máximo 3 pessoas, contando os convites ainda por aceitar
  if (casaDeQuemConvida && !quemEAdmin) return json({ erro: "Só um administrador da casa pode convidar pessoas." }, 403);
  if (casaDeQuemConvida) {
    const { count: membros } = await admin.from("household_members").select("user_id", { count: "exact", head: true }).eq("household_id", casaDeQuemConvida);
    const { data: jaMembro } = await admin.from("household_members").select("user_id").eq("household_id", casaDeQuemConvida).eq("email", email).maybeSingle();
    if (jaMembro) return json({ erro: "Essa pessoa já faz parte da casa." }, 400);
    const { count: pendentes } = await admin.from("convites").select("email", { count: "exact", head: true }).eq("household_id", casaDeQuemConvida).neq("email", email);
    if ((membros ?? 0) + (pendentes ?? 0) >= MAX_PESSOAS) return json({ erro: "A casa já tem " + MAX_PESSOAS + " pessoas (contando os convites por aceitar)." }, 400);
  }

  // limites: o mesmo email no máximo 1 vez em 10 minutos e 3 por dia; quem convida até 10 por dia;
  // pedidos sem sessão até 20 por hora no total
  const agora = Date.now();
  const desde = (ms: number) => new Date(agora - ms).toISOString();
  const conta = async (filtro: (q: any) => any, ms: number) => {
    const { count } = await filtro(admin.from("convite_pedidos").select("id", { count: "exact", head: true }).gte("pedido_em", desde(ms)));
    return count ?? 0;
  };
  if (await conta((q) => q.eq("email", email), 10 * 60000) >= 1) return json({ erro: "Já enviámos um email para este endereço há pouco. Vê a caixa de correio (e o spam)." }, 429);
  if (await conta((q) => q.eq("email", email), 86400000) >= 3) return json({ erro: MUITOS }, 429);
  if (quemId && await conta((q) => q.eq("quem", quemId), 86400000) >= 10) return json({ erro: "Chegaste ao limite de convites de hoje." }, 429);
  if (!quemId && await conta((q) => q.is("quem", null), 3600000) >= 20) return json({ erro: MUITOS }, 429);
  await admin.from("convite_pedidos").insert({ email, quem: quemId });
  // limpeza dos pedidos com mais de 30 dias
  await admin.from("convite_pedidos").delete().lt("pedido_em", desde(30 * 86400000));

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
