# Feature Plan: CRM Read-Only Integration

## What
Zapier webhook receives CRM data (new leads, contact updates) and surfaces them in ClosersAssist. Closer sees CRM leads alongside their logged deals in the DealSelector dropdown.

## Endpoints

### POST /api/webhooks/crm
Zapier calls this when a new lead enters the CRM.
Body:
```json
{
  "secret": "CLOSERS_API_SECRET",
  "user_id": "supabase_user_id",
  "customer_name": "Jane Foster",
  "email": "jane@email.com",
  "phone": "727-555-0123",
  "vehicle_interest": "2026 Toyota Camry",
  "source": "website",    // website, phone, walk-in, referral
  "crm_id": "dealership-crm-id",  // for dedup
  "notes": "Looking to trade 2019 Accord"
}
```

### GET /api/me/contacts
User-facing endpoint — list CRM contacts + logged deals.

## Schema
New table `crm_contacts`:
```sql
CREATE TABLE crm_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  crm_id TEXT,  -- CRM's internal ID for dedup
  customer_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  vehicle_interest TEXT,
  source TEXT,
  notes TEXT,
  last_contact_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, crm_id)
);
```

## Zapier Setup
1. Trigger: "New Lead in DealerCenter" (or whatever CRM)
2. Action: Webhook POST to https://dealclozr.com/api/webhooks/crm
3. Map fields: First Name → customer_name, Email → email, etc.

## UI Integration
DealSelector already shows logged deals. Now also shows CRM contacts with a "CRM" badge to distinguish them.
