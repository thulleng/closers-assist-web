"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Paperclip, X } from "lucide-react";

type TextContent = { type: "text"; text: string };
type ImageContent = { type: "image"; source: { type: "base64"; media_type: string; data: string } };
type MessageContent = string | (TextContent | ImageContent)[];

type Message = {
  role: "user" | "assistant";
  content: MessageContent;
};

const DEFAULT_STARTERS = [
  "How do I handle a customer who says 'I need to think about it'?",
  "What's the best way to T.O. without losing the customer?",
  "Calculate my commission: $800 front, $400 back, 25% split",
  "Write me a follow-up text for a customer who ghosted after a test drive",
];

export default function RealChat({
  industry = "automotive",
  starters,
}: {
  industry?: string;
  starters?: string[];
}) {
  const STARTERS = starters ?? DEFAULT_STARTERS;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);   // data URL for preview
  const [imageContent, setImageContent] = useState<ImageContent | null>(null); // Anthropic format
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      // dataUrl format: "data:image/jpeg;base64,<data>"
      const [meta, data] = dataUrl.split(",");
      const mediaType = meta.match(/:(.*?);/)?.[1] ?? "image/jpeg";
      setImagePreview(dataUrl);
      setImageContent({ type: "image", source: { type: "base64", media_type: mediaType, data } });
    };
    reader.readAsDataURL(file);
    // Reset so the same file can be re-selected
    e.target.value = "";
  };

  const clearImage = () => {
    setImagePreview(null);
    setImageContent(null);
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if ((!trimmed && !imageContent) || streaming) return;

    // Build content: plain string if no image, content array if image present
    const content: MessageContent = imageContent
      ? [
          ...(trimmed ? [{ type: "text" as const, text: trimmed }] : []),
          imageContent,
        ]
      : trimmed;

    const userMessage: Message = { role: "user", content };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    clearImage();
    setStreaming(true);

    // Add empty assistant message that we'll stream into
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, industry }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Stream failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.role === "assistant") {
            updated[updated.length - 1] = {
              ...last,
              content: last.content + chunk,
            };
          }
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Something went wrong. Try again.",
        };
        return updated;
      });
    } finally {
      setStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // Helper to extract plain text for display in the chat bubble
  const displayText = (content: MessageContent): string => {
    if (typeof content === "string") return content;
    return content.filter((c): c is TextContent => c.type === "text").map((c) => c.text).join(" ");
  };

  const hasImage = (content: MessageContent): boolean =>
    Array.isArray(content) && content.some((c) => c.type === "image");

  const imageDataUrl = (content: MessageContent): string | null => {
    if (!Array.isArray(content)) return null;
    const img = content.find((c): c is ImageContent => c.type === "image");
    if (!img) return null;
    return `data:${img.source.media_type};base64,${img.source.data}`;
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-[540px] flex-col overflow-hidden rounded-2xl border border-iron bg-pit">
      {/* Messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        {isEmpty && (
          <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
            <div>
              <p className="text-sm font-medium text-ash">Ask anything. Get an answer in seconds.</p>
            </div>
            <div className="grid gap-2 w-full max-w-md">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="rounded-lg border border-iron bg-slate px-4 py-2.5 text-left text-[13px] text-bone transition-colors hover:border-deal/40 hover:bg-pit"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-deal text-pit font-medium rounded-br-sm"
                  : "bg-slate text-bone rounded-bl-sm border border-iron"
              }`}
            >
              {/* Inline image thumbnail for user messages */}
              {msg.role === "user" && hasImage(msg.content) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageDataUrl(msg.content)!}
                  alt="Attached"
                  className="mb-2 max-h-48 rounded-lg object-contain"
                />
              )}
              {typeof msg.content === "string" ? msg.content : displayText(msg.content)}
              {msg.role === "assistant" && msg.content === "" && streaming && (
                <span className="inline-flex gap-1 items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-ash animate-bounce [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-ash animate-bounce [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-ash animate-bounce [animation-delay:300ms]" />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-iron px-4 py-3">
        {/* Image preview */}
        {imagePreview && (
          <div className="mb-2 inline-flex items-start gap-2">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Preview"
                className="h-16 w-16 rounded-lg object-cover border border-iron"
              />
              <button
                type="button"
                onClick={clearImage}
                aria-label="Remove image"
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate border border-iron text-ash hover:text-bone transition-colors"
              >
                <X className="h-3 w-3" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )}

        <div className="flex items-end gap-2">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Paperclip button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={streaming}
            aria-label="Attach image"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-iron bg-slate text-ash transition-all hover:border-white/25 hover:text-bone disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Paperclip className="h-4 w-4" strokeWidth={2} />
          </button>

          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about objections, pay plan, scripts..."
            disabled={streaming}
            className="flex-1 resize-none rounded-xl border border-iron bg-slate px-4 py-3 text-[14px] text-bone placeholder:text-muted focus:border-deal/60 focus:outline-none disabled:opacity-50 max-h-32 overflow-y-auto"
            style={{ lineHeight: "1.5" }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={(!input.trim() && !imageContent) || streaming}
            aria-label="Send message"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-deal text-pit transition-all hover:bg-deal-hover disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-muted">
          Powered by Closers Assist AI · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
