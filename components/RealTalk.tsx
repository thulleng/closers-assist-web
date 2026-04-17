import FadeIn from "@/components/FadeIn";

type BubbleSide = "in" | "out";

interface Bubble {
  side: BubbleSide;
  text: string;
  reaction?: string;
}

interface Conversation {
  name: string;
  avatar: string;
  avatarGradient: string;
  context: string;
  bubbles: Bubble[];
  commission: string | null;
}

const conversations: Conversation[] = [
  {
    name: "Patrick G.",
    avatar: "PG",
    avatarGradient: "from-[#10B981] to-[#059669]",
    context: "half mini turned full",
    bubbles: [
      { side: "in", text: "bro you gotta try this Closers Assist thing" },
      { side: "out", text: "the ai thing? does it actually work" },
      { side: "in", text: "used it on a $499 RAV4 objection at 8pm" },
      {
        side: "in",
        text: "flipped the deal in 4 minutes. desk couldn't believe it",
        reaction: "🔥",
      },
    ],
    commission: "+$2,500",
  },
  {
    name: "Fernando F.",
    avatar: "FF",
    avatarGradient: "from-[#FBBF24] to-[#D97706]",
    context: "Sun Toyota",
    bubbles: [
      { side: "in", text: "my CXI went from 4.7 to 5.0 in 3 weeks" },
      {
        side: "in",
        text: "that's +$500 in my pocket. for a $9.99 app",
        reaction: "💰",
      },
      { side: "out", text: "wait how" },
      {
        side: "in",
        text: "it remembers every customer and reminds me to check in at the right time",
      },
    ],
    commission: "+$250 CXI",
  },
  {
    name: "Anonymous rep",
    avatar: "??",
    avatarGradient: "from-[#7F77DD] to-[#534AB7]",
    context: "Kia dealer, Tampa",
    bubbles: [
      { side: "in", text: "told my manager about it" },
      { side: "in", text: "he tried to block it from the store ipad 😂" },
      {
        side: "in",
        text: "jokes on him i got my own phone",
        reaction: "💀",
      },
    ],
    commission: null,
  },
];

export default function RealTalk() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 p-6 md:p-8"
      style={{
        background:
          "linear-gradient(135deg, rgba(20,20,24,0.8), rgba(8,8,10,0.9))",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.25), transparent 70%)",
        }}
        aria-hidden
      />

      <FadeIn>
        <div className="relative mb-8 flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center text-gold-light">
            <svg
              viewBox="0 0 16 16"
              width="14"
              height="14"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M2 2h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5l-3 2V3a1 1 0 0 1 1-1z" />
            </svg>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
            Real talk from the floor
          </span>
        </div>
      </FadeIn>

      <div className="relative grid gap-5 md:grid-cols-3">
        {conversations.map((convo, i) => (
          <FadeIn key={convo.name} delay={i * 100}>
            <div
              className="flex h-full flex-col overflow-hidden rounded-[20px] border border-white/10"
              style={{
                background: "#0A0A0B",
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex items-center gap-2.5 border-b border-white/8 bg-black/80 px-4 py-3 backdrop-blur">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${convo.avatarGradient} text-[10px] font-black text-white shadow-[0_4px_12px_rgba(0,0,0,0.4)]`}
                >
                  {convo.avatar}
                </div>
                <div className="flex-1">
                  <div className="text-[12px] font-bold text-white">
                    {convo.name}
                  </div>
                  <div className="text-[10px] text-ash">{convo.context}</div>
                </div>
                {convo.commission && (
                  <div className="rounded-md bg-deal/15 px-2 py-0.5 font-mono text-[9px] font-bold text-deal-light">
                    {convo.commission}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-1.5 bg-[#050506] p-3">
                {convo.bubbles.map((bubble, j) => {
                  const isOut = bubble.side === "out";
                  return (
                    <div
                      key={j}
                      className={`flex ${isOut ? "justify-end" : "justify-start"}`}
                    >
                      <div className="relative max-w-[85%]">
                        <div
                          className={`rounded-[18px] px-3.5 py-2 text-[12px] leading-snug ${
                            isOut
                              ? "rounded-br-[4px] text-white"
                              : "rounded-bl-[4px] text-white"
                          }`}
                          style={
                            isOut
                              ? {
                                  background:
                                    "linear-gradient(135deg, #007AFF, #0051D5)",
                                }
                              : { background: "#262628" }
                          }
                        >
                          {bubble.text}
                        </div>
                        {bubble.reaction && (
                          <div
                            suppressHydrationWarning
                            className={`absolute -bottom-2 text-base ${
                              isOut ? "left-0" : "right-0"
                            }`}
                          >
                            {bubble.reaction}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div className="mt-1 flex justify-end">
                  <span className="text-[9px] text-muted">Delivered</span>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={400}>
        <div className="relative mt-6 flex items-center justify-center gap-2 text-[11px] text-ash">
          <span className="h-1 w-8 rounded-full bg-deal/40" />
          <span>Real texts. Real reps. Names changed where asked.</span>
          <span className="h-1 w-8 rounded-full bg-deal/40" />
        </div>
      </FadeIn>
    </div>
  );
}
