-- Executar no SQL Editor do Supabase (uma vez).
-- 1) Emails autorizados a entrar na casa. Só se alteram aqui, pelo SQL Editor.
create table if not exists public.allowed_emails (
  email text primary key
);
alter table public.allowed_emails enable row level security;
-- cada utilizador só vê a PRÓPRIA linha (necessário para as regras da tabela casa funcionarem)
create policy "allowed: ler o proprio email" on public.allowed_emails for select to authenticated
  using (email = (auth.jwt() ->> 'email'));

-- 2) Os dados da casa: uma linha só (id = 'casa').
create table if not exists public.casa (
  id text primary key,
  state jsonb not null default '{}'::jsonb,
  saved_at bigint not null default 0,
  updated_by text,
  updated_at timestamptz not null default now()
);
alter table public.casa enable row level security;

create policy "casa: membros leem" on public.casa for select to authenticated
  using (exists (select 1 from public.allowed_emails a where a.email = (auth.jwt() ->> 'email')));
create policy "casa: membros criam" on public.casa for insert to authenticated
  with check (exists (select 1 from public.allowed_emails a where a.email = (auth.jwt() ->> 'email')));
create policy "casa: membros atualizam" on public.casa for update to authenticated
  using (exists (select 1 from public.allowed_emails a where a.email = (auth.jwt() ->> 'email')))
  with check (exists (select 1 from public.allowed_emails a where a.email = (auth.jwt() ->> 'email')));

-- 3) Atualizações em tempo real para os dois ecrãs.
alter publication supabase_realtime add table public.casa;

-- 4) Os dois emails da casa.
insert into public.allowed_emails (email) values
  ('bernardo.n.f.mendes@gmail.com'),
  ('paulanevesramalho@gmail.com')
on conflict do nothing;

-- 5) Segurança: a função rls_auto_enable() não é para a API (não tem triggers ligados).
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
