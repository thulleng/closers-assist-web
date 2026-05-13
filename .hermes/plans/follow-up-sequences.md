# Feature Plan: Follow-Up Sequences

## What
AI auto-generates a 4-message follow-up drip when a customer doesn't buy. Each message references the specific vehicle, objection, and a fresh angle. Day 1, 3, 7, 14. Closer reviews and approves.

## Implementation

### Tool: generate_follow_ups
New tool in route.ts — generates 4 follow-up texts for a deal.
Input: deal_id (optional), customer_name, vehicle, objection/context
Output: Array of {day, subject, message}

### UI: FollowUpPanel
Shows generated messages in a card with:
- Day badge (Day 1, Day 3, etc.)
- Subject line
- Message body (editable)
- Copy button for each
- "Approve all" to save

### Schema (deferred — needs SQL migration)
```sql
CREATE TABLE follow_ups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  day INTEGER NOT NULL, -- 1, 3, 7, 14
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, sent, skipped
  send_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Prompt Addition
Add to AUTOMOTIVE_PROMPT: instructions for follow-up generation — voice, structure, objection handling patterns.

### Integration
- Triggered when user says "write follow-up for [customer]" or selects a deal and asks for follow-up
- Can also be triggered automatically when a deal status changes to "pending" or "lost"
