"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
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
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
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
              {msg.content}
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
        <div className="flex items-end gap-2">
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
            disabled={!input.trim() || streaming}
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
