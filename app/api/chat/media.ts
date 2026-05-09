/**
 * Media processing for Closers Assist chat.
 *
 * Handles audio transcription (Deepgram STT) and video frame extraction
 * (ffmpeg + Claude Vision). Converts audio/video user uploads to text
 * descriptions before the main model sees them.
 */

import { DeepgramClient } from "@deepgram/sdk";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import Anthropic from "@anthropic-ai/sdk";

const execFileAsync = promisify(execFile);

// ── Types ────────────────────────────────────────────────────────────────────

export interface AudioBlock {
  type: "audio";
  source: { type: "base64"; media_type: string; data: string };
}

export interface VideoBlock {
  type: "video";
  source: { type: "base64"; media_type: string; data: string };
}

export type AnyContentBlock =
  | { type: "text"; text: string }
  | { type: "image"; source: { type: "base64"; media_type: string; data: string } }
  | AudioBlock
  | VideoBlock;

// ── Helpers ──────────────────────────────────────────────────────────────────

function b64ToBuffer(b64: string): Buffer {
  return Buffer.from(b64, "base64");
}

function getExt(mediaType: string): string {
  const m = mediaType.match(/\/(\w+)/);
  if (!m) return "bin";
  const sub = m[1];
  if (sub === "quicktime") return "mov";
  if (sub === "x-m4a") return "m4a";
  return sub;
}

// ── Audio: Deepgram STT ──────────────────────────────────────────────────────

export async function transcribeAudio(block: AudioBlock): Promise<string> {
  const apiKey = process.env.DEEPGRAM_API_KEY;
  if (!apiKey) {
    console.warn("[media] DEEPGRAM_API_KEY not set — skipping audio transcription");
    return "[Audio attached — transcription unavailable. DEEPGRAM_API_KEY not configured.]";
  }

  try {
    const client = new DeepgramClient({ apiKey });
    const buffer = b64ToBuffer(block.source.data);

    // Deepgram v5 returns a union type; cast to access results
    const response = (await client.listen.v1.media.transcribeFile(buffer, {
      model: "nova-3",
      smart_format: true,
      punctuate: true,
      language: "en",
    })) as { results?: { channels?: { alternatives?: { transcript?: string }[] }[] } };

    const transcript =
      response?.results?.channels?.[0]?.alternatives?.[0]?.transcript;

    if (!transcript || transcript.trim().length === 0) {
      return "[Audio attached — no speech detected.]";
    }

    console.log("[media] Audio transcribed:", transcript.slice(0, 100));
    return `[Audio transcription]: ${transcript}`;
  } catch (err) {
    console.error("[media] Audio processing error:", err);
    return "[Audio attached — processing error. Try again.]";
  }
}

// ── Video: ffmpeg frame extraction + Claude Vision ───────────────────────────

function getFfmpegPath(): string {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require("ffmpeg-static") as string;
  } catch {
    return "ffmpeg";
  }
}

async function extractFrames(
  videoPath: string,
  outputDir: string
): Promise<string[]> {
  const ffmpeg = getFfmpegPath();
  const frames: string[] = [];

  // Get video duration from ffmpeg metadata
  let duration = 30;
  try {
    await execFileAsync(ffmpeg, [
      "-i", videoPath,
      "-f", "null", "-",
    ], { timeout: 15000 });
  } catch (err: unknown) {
    const stderr = (err as { stderr?: string }).stderr || "";
    const durMatch = stderr.match(/Duration: (\d{2}):(\d{2}):(\d{2})/);
    if (durMatch) {
      duration =
        parseInt(durMatch[1]) * 3600 +
        parseInt(durMatch[2]) * 60 +
        parseInt(durMatch[3]);
    }
  }

  const capped = Math.min(duration, 120);
  const timestamps = [0.2, 0.5, 0.8].map((p) =>
    Math.min(p * capped, capped - 1)
  );

  for (let i = 0; i < timestamps.length; i++) {
    const ts = timestamps[i];
    const framePath = path.join(outputDir, `frame_${i}.jpg`);

    try {
      await execFileAsync(ffmpeg, [
        "-ss", ts.toFixed(1),
        "-i", videoPath,
        "-vframes", "1",
        "-q:v", "2",
        "-y",
        framePath,
      ], { timeout: 20000 });

      if (fs.existsSync(framePath) && fs.statSync(framePath).size > 0) {
        frames.push(framePath);
      }
    } catch (e) {
      console.error(`[media] Frame extraction failed at ${ts}s:`, e);
    }
  }

  return frames;
}

async function describeFrame(
  framePath: string,
  index: number,
  total: number
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return `[Frame ${index + 1}/${total}: no ANTHROPIC_API_KEY]`;
  }

  try {
    const buffer = fs.readFileSync(framePath);
    const b64 = buffer.toString("base64");

    const claude = new Anthropic({ apiKey });
    const msg = await claude.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: b64,
              },
            },
            {
              type: "text",
              text: `Describe this frame from a video (frame ${index + 1} of ${total}). What do you see? Key details only — people, objects, text on screen, setting. 2-3 sentences max.`,
            },
          ],
        },
      ],
    });

    const text = msg.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join(" ");

    return `[Video frame ${index + 1}/${total}]: ${text}`;
  } catch (err) {
    console.error(`[media] Frame description failed:`, err);
    return `[Video frame ${index + 1}/${total}: description unavailable]`;
  }
}

export async function processVideo(block: VideoBlock): Promise<string> {
  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), "ca-video-"));
  const videoExt = getExt(block.source.media_type);
  const videoPath = path.join(workDir, `input.${videoExt}`);

  try {
    const buffer = b64ToBuffer(block.source.data);
    fs.writeFileSync(videoPath, buffer);

    const sizeMB = buffer.length / (1024 * 1024);
    console.log(`[media] Processing video: ${sizeMB.toFixed(1)}MB`);

    if (sizeMB > 50) {
      return "[Video attached — file too large (>50MB). Please upload a smaller clip or describe what's in the video.]";
    }

    const frames = await extractFrames(videoPath, workDir);

    if (frames.length === 0) {
      return "[Video attached — could not extract frames. Try uploading a screenshot instead.]";
    }

    const descriptions = await Promise.all(
      frames.map((fp, i) => describeFrame(fp, i, frames.length))
    );

    return `[Video analysis — ${frames.length} frames extracted]:\n${descriptions.join("\n")}`;
  } catch (err) {
    console.error("[media] Video processing error:", err);
    return "[Video attached — processing failed. Describe what's in the video instead.]";
  } finally {
    try {
      fs.rmSync(workDir, { recursive: true, force: true });
    } catch {
      // best effort cleanup
    }
  }
}

// ── Message pre-processing ───────────────────────────────────────────────────

/**
 * Walk through messages and replace audio/video content blocks with text
 * containing transcriptions/descriptions. Runs once before the main model
 * stream so the LLM sees clean text.
 */
export async function preprocessMedia(
  messages: { role: string; content: AnyContentBlock[] }[]
): Promise<{ role: string; content: AnyContentBlock[] }[]> {
  const processed: { role: string; content: AnyContentBlock[] }[] = [];

  for (const msg of messages) {
    if (msg.role !== "user") {
      processed.push(msg);
      continue;
    }

    const newContent: AnyContentBlock[] = [];

    for (const block of msg.content) {
      if (block.type === "audio") {
        const transcription = await transcribeAudio(block as AudioBlock);
        newContent.push({ type: "text", text: transcription });
      } else if (block.type === "video") {
        const description = await processVideo(block as VideoBlock);
        newContent.push({ type: "text", text: description });
      } else {
        newContent.push(block);
      }
    }

    processed.push({ role: msg.role, content: newContent });
  }

  return processed;
}
