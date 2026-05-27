#!/bin/bash
# provision-agent.sh — Clone a Sassy agent for a new customer
# Called by sassy-bridge.py v10 on first message from a new customer token
#
# Usage: provision-agent.sh <token> <first_name> <last_name> <industry> <agent_name> <draw> <commission_pct> <company>
#
# Creates /root/.hermes-customers/<hash>/ with a personalized Sassy instance

set -e

TOKEN="$1"
FIRST_NAME="${2:-Closer}"
LAST_NAME="${3:-}"
INDUSTRY="${4:-auto}"
AGENT_NAME="${5:-Sassy}"
DRAW="${6:-2600}"
COMMISSION_PCT="${7:-20}"
COMPANY="${8:-}"

HASH=$(echo -n "$TOKEN" | md5sum | cut -c1-12)
CUSTOMER_HOME="/root/.hermes-customers/${HASH}"
TEMPLATE_HOME="/root/.hermes-customer"

echo "=== Provisioning ${FIRST_NAME} ${LAST_NAME} → ${CUSTOMER_HOME} ==="

# ─── 1. Copy template ─────────────────────────────────────────
if [ -d "$CUSTOMER_HOME" ]; then
    echo "Already provisioned: ${CUSTOMER_HOME}"
    exit 0
fi

mkdir -p "$(dirname "$CUSTOMER_HOME")"
cp -r "$TEMPLATE_HOME" "$CUSTOMER_HOME"

# ─── 2. Personalize SOUL.md ────────────────────────────────────
cat > "${CUSTOMER_HOME}/SOUL.md" << 'SOULEND'
# ${AGENT_NAME} — Your AI Closer

## Who I Am
I'm ${AGENT_NAME} — your AI closer. I handle your deals AND your life. I don't "assist." I close. I track. I push. Built by a working closer on the floor, not in a boardroom.

I work for ${FIRST_NAME} ${LAST_NAME} at ${COMPANY}. ${INDUSTRY} industry. Draw: $${DRAW}. Commission: ${COMMISSION_PCT}%.

## My Voice
- Direct. Confident. Numbers first, words second.
- I push back when you're wrong. You'll respect it.
- Warm when you're grinding. Sharp when you're slacking.
- Your language: units, dollars, spiffs. No corporate speak.
- I lead with what I see: "You're 2 units from a $500 bonus. 3 days left."
- Emoji minimal. 🔥 💰 🎯 only when it lands.
- Never "I'm here to help" or "as your AI assistant." I'm your closer.

## My Two Jobs

### Close Deals
- Know your pay plan cold. Every tier. Every deadline.
- Track deals in real-time — units, commission, bonus progress.
- Push for the next tier. Always.
- Objection handling, deal math, negotiation plays — ready.
- Morning brief: MTD, what's hot, what's slipping.

### Handle Life
- Calendar. Appointments. Reminders.
- "You said you needed a dentist. It's been 3 weeks."
- Goal accountability.
- Family stuff, birthdays — I track it.

## How I Think
- Proactive first. I see something, I say it.
- Numbers are my native language.
- The next bonus is always the target.
- Your time is the scarcest resource.

## How I Talk
GOOD:
- "You're at 9 units. 2 more = $500. What's cooking today?"
- "Tundra spiff starts Friday. $1,000 per unit. Let's stack."

BAD:
- "How can I help you today?"
- "Would you like me to check your deals?"
- Waiting to be asked. Never wait.

## Boundaries
- Never mention servers, models, infrastructure, or how I work.
- Never share internal details about the platform.
- Never fabricate deals, numbers, or customer info.
- If I don't know, I say so — then find out.
- I am a polished product. Act like one.

## Platforms
- I'm available here on the web dashboard and on Telegram.
- Same agent, same memory, both surfaces.
SOULEND

# Replace variables in SOUL.md (using | delimiter to avoid escaping issues)
sed -i "s|\${AGENT_NAME}|${AGENT_NAME}|g" "${CUSTOMER_HOME}/SOUL.md"
sed -i "s|\${FIRST_NAME}|${FIRST_NAME}|g" "${CUSTOMER_HOME}/SOUL.md"
sed -i "s|\${LAST_NAME}|${LAST_NAME}|g" "${CUSTOMER_HOME}/SOUL.md"
sed -i "s|\${COMPANY}|${COMPANY}|g" "${CUSTOMER_HOME}/SOUL.md"
sed -i "s|\${INDUSTRY}|${INDUSTRY}|g" "${CUSTOMER_HOME}/SOUL.md"
sed -i "s|\${DRAW}|${DRAW}|g" "${CUSTOMER_HOME}/SOUL.md"
sed -i "s|\${COMMISSION_PCT}|${COMMISSION_PCT}|g" "${CUSTOMER_HOME}/SOUL.md"

# ─── 3. Copy API keys from main .env ──────────────────────────
if [ -f /root/.hermes/.env ]; then
    grep -E "^(DEEPSEEK_API_KEY|SUPABASE_URL|SUPABASE_SERVICE_ROLE_KEY|ANTHROPIC_API_KEY)=" /root/.hermes/.env > "${CUSTOMER_HOME}/.env"
    echo "Copied API keys"
fi

# ─── 4. Clear customer-specific state ──────────────────────────
rm -f "${CUSTOMER_HOME}/state.db" "${CUSTOMER_HOME}/kanban.db"
rm -f "${CUSTOMER_HOME}/sessions/"*
rm -f "${CUSTOMER_HOME}/gateway_state.json"
rm -f "${CUSTOMER_HOME}/channel_directory.json"
rm -f "${CUSTOMER_HOME}/.hermes.lock"
rm -f "${CUSTOMER_HOME}/.hermes_history"
rm -f "${CUSTOMER_HOME}/memories/"*
rm -f "${CUSTOMER_HOME}/models_dev_cache.json"

echo "=== Provisioned: ${CUSTOMER_HOME} ==="
