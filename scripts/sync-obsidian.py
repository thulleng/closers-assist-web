#!/usr/bin/env python3
"""
Obsidian → Supabase memory sync for Deal Clozr.
Reads Thul's Obsidian vault notes and pushes them as agent_memory
rows (role='obsidian') so the web and Telegram agents can inject them.

Run: python3 sync-obsidian.py [--dry-run]
Cron: daily at 6 AM
"""

import os, sys, json, hashlib
from pathlib import Path

VAULT_PATH = os.path.expanduser("~/Obsidian/ClosersAssist")
SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
USER_ID = "659e9e8e-25df-4411-b722-676fcd45aae2"  # Thul's user ID

if not SUPABASE_URL or not SUPABASE_KEY:
    # Try loading from vercel .env or .env.local
    for envfile in [".env.local", ".env", "../.env"]:
        p = Path(__file__).parent / envfile
        if p.exists():
            for line in p.read_text().splitlines():
                line = line.strip()
                if line.startswith("NEXT_PUBLIC_SUPABASE_URL="):
                    SUPABASE_URL = line.split("=", 1)[1].strip().strip('"').strip("'")
                elif line.startswith("SUPABASE_SERVICE_ROLE_KEY="):
                    SUPABASE_KEY = line.split("=", 1)[1].strip().strip('"').strip("'")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("ERROR: Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
    sys.exit(1)

from supabase import create_client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Which folders to sync (relative to VAULT_PATH)
SYNC_FOLDERS = ["naomi", "_shared"]

# Notes to skip
SKIP_FILES = {"README.md"}

def hash_content(content: str) -> str:
    return hashlib.sha256(content.encode()).hexdigest()[:12]

def sync_note(filepath: Path, dry_run: bool = False):
    """Read a markdown note and upsert it to Supabase as an obsidian fact."""
    rel_path = filepath.relative_to(VAULT_PATH)
    content = filepath.read_text().strip()
    if not content:
        return

    content_hash = hash_content(content)
    title = filepath.stem.replace("-", " ").replace("_", " ").title()

    # Build a clean fact: title + first 3000 chars of content
    fact_text = f"[Obsidian: {title}] {content[:3000]}"

    # Check if this note already exists with the same hash
    existing = supabase.table("agent_memory") \
        .select("id, content") \
        .eq("user_id", USER_ID) \
        .eq("role", "obsidian") \
        .ilike("content", f"[Obsidian: {title}]%") \
        .execute()

    if existing.data:
        existing_row = existing.data[0]
        existing_hash = hash_content(existing_row["content"])
        if existing_hash == content_hash:
            print(f"  ✓ {rel_path} (unchanged)")
            return

        if not dry_run:
            supabase.table("agent_memory").update({
                "content": fact_text,
            }).eq("id", existing_row["id"]).execute()
        print(f"  ↻ {rel_path} (updated)")
    else:
        if not dry_run:
            supabase.table("agent_memory").insert({
                "user_id": USER_ID,
                "role": "obsidian",
                "content": fact_text,
                "industry": "automotive",
            }).execute()
        print(f"  + {rel_path} (new)")

def main():
    dry_run = "--dry-run" in sys.argv
    print(f"Syncing Obsidian vault → Supabase{' [DRY RUN]' if dry_run else ''}")
    print(f"Vault: {VAULT_PATH}")
    print(f"User:  {USER_ID}")
    print()

    if not Path(VAULT_PATH).exists():
        print(f"ERROR: Vault path does not exist: {VAULT_PATH}")
        sys.exit(1)

    count = 0
    for folder in SYNC_FOLDERS:
        folder_path = Path(VAULT_PATH) / folder
        if not folder_path.exists():
            print(f"  ⚠ {folder}/ (not found)")
            continue

        for md_file in sorted(folder_path.rglob("*.md")):
            if md_file.name in SKIP_FILES:
                continue
            sync_note(md_file, dry_run)
            count += 1

    print(f"\nSynced {count} notes.")

if __name__ == "__main__":
    main()
