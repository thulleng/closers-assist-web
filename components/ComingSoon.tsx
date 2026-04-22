import Link from "next/link";

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  backHref?: string;
  backLabel?: string;
};

export default function ComingSoon({
  eyebrow,
  title,
  body,
  backHref = "/",
  backLabel = "Back home",
}: Props) {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-6 py-20">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-deal" />
        <span className="text-xs font-medium uppercase tracking-widest text-deal">
          {eyebrow}
        </span>
      </div>
      <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-bone md:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash">{body}</p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href="/#waitlist"
          className="rounded-md bg-deal px-6 py-3 text-[15px] font-medium text-pit transition-colors hover:bg-deal-hover"
        >
          Join Waitlist →
        </Link>
        <Link
          href={backHref}
          className="rounded-md border border-iron px-6 py-3 text-[15px] font-medium text-bone transition-colors hover:border-ash"
        >
          {backLabel}
        </Link>
      </div>
    </section>
  );
}
