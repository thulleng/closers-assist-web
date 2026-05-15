# Feature Plan: Per-Deal Memory Threads

## What
When a closer selects a specific deal, the AI knows everything about it — vehicle, numbers, past conversations, objections, notes. The closer picks a deal from a dropdown and the AI instantly has full context.

## Files

### New
- `app/api/deals/[id]/route.ts` — GET (deal detail), PATCH (update notes/status)
- `components/DealSelector.tsx` — dropdown showing active/pending deals
- `components/DealCard.tsx` — deal detail card with notes editing

### Modified
- `app/api/chat/route.ts` — add `buildDealContext()`, accept `dealId` in request body
- `components/ChatFloat.tsx` — integrate DealSelector above chat
- `sql/add_deal_threads.sql` — schema migration

## Schema Changes
- `deals.status` TEXT DEFAULT 'active' — active, pending, closed, lost
- `deals.last_contact_date` DATE — for follow-up tracking
- `agent_memory.deal_id` UUID NULL REFERENCES deals(id) — tag memories to deals

## buildDealContext(deal)
Returns formatted prompt block:
```
DEAL CONTEXT (focused deal):
Customer: Jane Foster
Vehicle: 2026 Toyota Camry XSE
Deal type: full_deal | Front gross: $3,400 | Commission: $850
Status: pending | Last contact: May 12
Notes: "Payment objection. Thinks $650/mo is too high. Suggested 72mo term."
Past conversations about this deal:
- [May 10] Discussed trade-in value. Customer has 2019 Accord.
- [May 12] Payment objection. Suggested total cost of ownership angle.
```

## How It Works
1. Closer opens chat → sees DealSelector dropdown with their active/pending deals
2. Picks a deal → ChatFloat sends `dealId` to `/api/chat` 
3. `buildDealContext()` queries deal + tagged memories, injects into system prompt
4. AI responds with full deal context: references vehicle by name, knows numbers, remembers past objections
5. Closer can add notes via DealCard → saved to deals.notes
6. Deal-tagged memories auto-saved when discussing a selected deal
