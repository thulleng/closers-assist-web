-- Ingest hardening — additive. Does not modify 20261020_screenshot_ingest.sql.
-- Run after that migration.

-- ── 1. Lock the SECURITY DEFINER function down ──────────────────────────────
-- Postgres grants EXECUTE to PUBLIC by default on new functions. A definer
-- function callable by anon is a hole even when its body is harmless.
revoke execute on function purge_expired_drafts() from public, anon, authenticated;
grant execute on function purge_expired_drafts() to service_role;

-- ── 2. Evidence bucket ──────────────────────────────────────────────────────
-- Private. All uploads go through the service role in lib/ingest/store.ts,
-- so no storage.objects policies are needed — and none are granted.
insert into storage.buckets (id, name, public)
values ('deal-evidence', 'deal-evidence', false)
on conflict (id) do nothing;

-- ── 3. Retention query ──────────────────────────────────────────────────────
-- Returns evidence rows whose image has outlived the 30-day window.
-- The cron deletes the object, then nulls storage_path. The row and the
-- extracted JSON stay — the receipt image is what expires, not the record.
create or replace function evidence_due_for_purge(batch_size int default 200)
returns table (id uuid, storage_path text)
language sql
security definer
set search_path = public
as $$
  select e.id, e.storage_path
  from deal_evidence e
  where e.purge_after < now()
    and e.storage_path is not null
  order by e.purge_after asc
  limit batch_size;
$$;

revoke execute on function evidence_due_for_purge(int) from public, anon, authenticated;
grant execute on function evidence_due_for_purge(int) to service_role;
