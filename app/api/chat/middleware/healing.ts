// Self-healing stream middleware — retries DeepSeek API calls with
// exponential backoff and provides graceful fallback on exhaustion.
//
// For streaming: wraps the initial stream connection, retrying on
// connection failures. Mid-stream failures are caught by the route's
// existing error handler.
//
// For non-streaming: wraps the full API call with retry + backoff.

import DeepSeek from "@anthropic-ai/sdk";

const FALLBACK_RESPONSE =
  "I hit a snag — DeepSeek's servers are backed up. Try again in 30 seconds, or type 'help' for the offline playbook.";

export type StreamFactory<T> = () => T; // returns a stream or promise
export type HealingResult<T> = {
  success: boolean;
  result?: T;
  error?: string;
  retries: number;
};

/**
 * Retry a stream factory up to 3 times with exponential backoff.
 * Each retry waits 1s, 2s, 4s. Returns the result on success,
 * or { success: false } after 3 failures.
 */
export async function withHealing<T>(
  factory: StreamFactory<T>,
  label = "DeepSeek API"
): Promise<HealingResult<T>> {
  let lastError = "";

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const result = await factory();
      return { success: true, result, retries: attempt };
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      console.error(`[healing] ${label} attempt ${attempt + 1}/3:`, lastError);

      if (attempt < 2) {
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
      }
    }
  }

  return { success: false, error: lastError, retries: 3 };
}

/** Return a user-safe fallback string when all retries exhausted. */
export function fallbackResponse(): string {
  return FALLBACK_RESPONSE;
}
