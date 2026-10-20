-- Phase 1 — screenshot ingest: drafts, evidence, plan versioning.
-- Idempotent. Safe to run against prod (pay_plans already exists with a flat
-- legacy shape — we ADD a jsonb config instead of recreating the table).

-- ── pay_plans: versioned jsonb config, additive only ────────────────────────
alter table if exists pay_plans add column if not exists config jsonb;
alter table if exists pay_plans add column if not exists "name" text not null default 'My plan';
alter table if exists pay_plans add column if not exists industry text not null default 'auto';
alter table if exists pay_plans add column if not exists source_doc_path text;
alter table if exists pay_plans add column if not exists effective_from date not null default current_date;
alter table if exists pay_plans add column if not exists created_at timestamptz not null default now();

create index if not exists pay_plans_user_effective_idx on pay_plans (user_id, effective_from desc);

-- ── deal_drafts: unconfirmed extractions, expire in 72h ─────────────────────
create table if not exists deal_drafts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source text not null check (source in ('pwa','telegram','sms','whatsapp')),
  doc_kind text,
  fields jsonb not null,
  confidence jsonb not null,
  raw_text text,
  status text not null default 'pending' check (status in ('pending','confirmed','discarded','expired')),
  -- where the source image lives until the 30-day purge
  storage_path text,
  -- which extraction produced this, for debugging accuracy per model
  model text,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '72 hours'
);
create index if not exists deal_drafts_user_status_idx on deal_drafts (user_id, status);
create index if not exists deal_drafts_expiry_idx on deal_drafts (expires_at) where status = 'pending';

-- ── deal_evidence: the receipt. Thumbnail kept 30 days, JSON kept. ──────────
create table if not exists deal_evidence (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  deal_id uuid references deals(id) on delete set null,
  doc_kind text,
  storage_path text,
  extracted jsonb not null,
  created_at timestamptz not null default now(),
  -- cron deletes the image at purge_after, keeps the row + extracted JSON
  purge_after timestamptz not null default now() + interval '30 days'
);
create index if not exists deal_evidence_user_idx on deal_evidence (user_id, created_at desc);
create index if not exists deal_evidence_purge_idx on deal_evidence (purge_after) where storage_path is not null;

-- ── deals: provenance ───────────────────────────────────────────────────────
alter table if exists deals add column if not exists source text not null default 'manual';
alter table if exists deals add column if not exists pay_plan_id uuid references pay_plans(id);
alter table if exists deals add column if not exists evidence_id uuid references deal_evidence(id);
alter table if exists deals add column if not exists stock_number text;

-- ── Rate limiting (20 ingests/hour/user) — counted off drafts, no extra table ─

-- ── RLS: private to the rep. No store/manager read path. Ever. ─────────────
alter table deal_drafts enable row level security;
alter table deal_evidence enable row level security;

drop policy if exists deal_drafts_own on deal_drafts;
create policy deal_drafts_own on deal_drafts
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists deal_evidence_own on deal_evidence;
create policy deal_evidence_own on deal_evidence
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- pay_plans: keep whatever policy already exists; add one only if RLS is on and
-- no policy is defined (guarded so we never widen existing access).
do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'pay_plans') then
    execute 'alter table pay_plans enable row level security';
    execute 'create policy pay_plans_own on pay_plans for all using (user_id = auth.uid()) with check (user_id = auth.uid())';
  end if;
end $$;

-- ── Evidence purge helper (called by the daily cron) ───────────────────────
create or replace function purge_expired_drafts() returns integer as $$
declare n integer;
begin
  with gone as (
    update deal_drafts set status = 'expired'
    where status = 'pending' and expires_at < now()
    returning 1
  ) select count(*) into n from gone;
  return n;
end;
$$ language plpgsql security definer;
