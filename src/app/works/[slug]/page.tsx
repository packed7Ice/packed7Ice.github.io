import Link from "next/link";
import { notFound } from "next/navigation";
import CodeBlock from "@/components/CodeBlock";
import { works } from "@/data/works";

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  return {
    title: work?.title,
    description: work?.summary,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Link
        href="/#works"
        className="text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        ← Works に戻る
      </Link>

      <div className="mt-6 flex items-start justify-between gap-3">
        <h1 className="text-3xl font-bold leading-tight text-foreground">
          {work.title}
        </h1>
        {work.status === "wip" && (
          <span className="mt-1 shrink-0 rounded-full bg-accent/40 px-3 py-1 text-xs font-medium text-primary">
            WIP
          </span>
        )}
      </div>

      <dl className="mt-7 grid gap-x-8 gap-y-2.5 border-l-2 border-accent pl-5 text-sm sm:grid-cols-[auto_1fr] sm:text-base">
        <dt className="font-medium text-foreground">担当</dt>
        <dd className="text-muted-foreground">{work.role}</dd>
        {work.url && (
          <>
            <dt className="font-medium text-foreground">URL</dt>
            <dd>
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-primary underline-offset-2 hover:underline"
              >
                {work.url}
              </a>
            </dd>
          </>
        )}
        {work.repo && (
          <>
            <dt className="font-medium text-foreground">ソースコード</dt>
            <dd>
              <a
                href={work.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-primary underline-offset-2 hover:underline"
              >
                {work.repo}
              </a>
            </dd>
          </>
        )}
      </dl>

      <p className="mt-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {work.description}
      </p>

      <h2 className="mt-10 text-xl font-bold text-foreground sm:text-2xl">
        技術スタック
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {work.tech.join(" / ")}
      </p>

      <h2 className="mt-10 text-xl font-bold text-foreground">
        制作のポイント
      </h2>
      <ul className="mt-4 space-y-3">
        {work.points.map((point) => (
          <li
            key={point}
            className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {point}
          </li>
        ))}
      </ul>

      {work.snippets && work.snippets.length > 0 && (
        <>
          <h2 className="mt-10 text-xl font-bold text-foreground">
            コード抜粋
          </h2>
          <div className="mt-5 space-y-8">
            {work.snippets.map((snippet) => (
              <CodeBlock key={snippet.title} snippet={snippet} />
            ))}
          </div>
        </>
      )}
    </article>
  );
}
