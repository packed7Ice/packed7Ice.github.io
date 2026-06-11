import Link from "next/link";
import type { Work } from "@/data/works";

export default function WorkCard({ work }: { work: Work }) {
  return (
    <Link
      href={`/works/${work.slug}/`}
      className="group flex flex-col rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
          {work.title}
        </h3>
        {work.status === "wip" && (
          <span className="shrink-0 rounded-full bg-accent/40 px-2.5 py-0.5 text-[11px] font-medium text-primary">
            制作中
          </span>
        )}
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {work.summary}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {work.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-md bg-surface px-2 py-0.5 text-[11px] text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
