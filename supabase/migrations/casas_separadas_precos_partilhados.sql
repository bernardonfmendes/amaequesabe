-- Executar no SQL Editor do Supabase (uma vez, de uma só vez).
-- Cada utilizador tem a sua casa (com convites entre membros); os preços são partilhados
-- e só o administrador (bernardo.n.f.mendes@gmail.com) os altera.

-- 1) casas: cada casa tem uma linha em public.casa (id = id da casa)
create table if not exists public.households (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now()
);
create table if not exists public.household_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  household_id uuid not null references public.households(id) on delete cascade,
  email text not null
);
-- convites pendentes: quem já está numa casa convida alguém por email; a pessoa entra nessa casa
create table if not exists public.convites (
  email text primary key,
  household_id uuid not null references public.households(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.households enable row level security;
alter table public.household_members enable row level security;
alter table public.convites enable row level security;
create policy "membros: ver a propria ligacao" on public.household_members for select to authenticated
  using (user_id = auth.uid());
create policy "casas: membros veem" on public.households for select to authenticated
  using (id in (select household_id from public.household_members where user_id = auth.uid()));

-- 2) a tabela casa passa a ter acesso por membro da casa (e não por allowed_emails)
drop policy if exists "casa: membros leem" on public.casa;
drop policy if exists "casa: membros criam" on public.casa;
drop policy if exists "casa: membros atualizam" on public.casa;
create policy "casa: membros leem" on public.casa for select to authenticated
  using (id in (select household_id::text from public.household_members where user_id = auth.uid()));
create policy "casa: membros criam" on public.casa for insert to authenticated
  with check (id in (select household_id::text from public.household_members where user_id = auth.uid()));
create policy "casa: membros atualizam" on public.casa for update to authenticated
  using (id in (select household_id::text from public.household_members where user_id = auth.uid()))
  with check (id in (select household_id::text from public.household_members where user_id = auth.uid()));

-- 3) preços partilhados: uma linha ('global'); só o administrador escreve
create table if not exists public.precos (
  id text primary key,
  state jsonb not null default '{}'::jsonb,
  saved_at bigint not null default 0,
  updated_by text,
  updated_at timestamptz not null default now()
);
alter table public.precos enable row level security;
create policy "precos: membros leem" on public.precos for select to authenticated
  using (exists (select 1 from public.household_members m where m.user_id = auth.uid()));
create policy "precos: administrador escreve" on public.precos for all to authenticated
  using ((auth.jwt() ->> 'email') = 'bernardo.n.f.mendes@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'bernardo.n.f.mendes@gmail.com');
insert into public.precos (id, state, saved_at, updated_by)
  select 'global', coalesce(c.state->'prices', '{}'::jsonb), coalesce(c.saved_at, 0), c.updated_by
  from public.casa c where c.id = 'casa'
  on conflict (id) do nothing;
alter publication supabase_realtime add table public.precos;

-- 4) entrar numa casa: junta-se à casa do convite, ou cria uma casa nova com cópia dos dados atuais
create or replace function public.minha_casa()
returns uuid language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  mail text := lower(coalesce(auth.jwt() ->> 'email', ''));
  hid uuid;
  seed record;
begin
  if uid is null then raise exception 'sem sessão'; end if;
  select household_id into hid from public.household_members where user_id = uid;
  if hid is null then
    select c.household_id into hid from public.convites c where c.email = mail;
    if hid is null then
      insert into public.households default values returning id into hid;
      select s.state, s.saved_at into seed from public.casa s where s.id = 'casa';
      insert into public.casa (id, state, saved_at, updated_by)
        values (hid::text, coalesce(seed.state, '{}'::jsonb), coalesce(seed.saved_at, 0), mail);
    end if;
    insert into public.household_members (user_id, household_id, email) values (uid, hid, mail);
    delete from public.convites where email = mail;
  end if;
  insert into public.allowed_emails (email) values (mail) on conflict do nothing;
  return hid;
end $$;
revoke execute on function public.minha_casa() from public, anon;
grant execute on function public.minha_casa() to authenticated;
