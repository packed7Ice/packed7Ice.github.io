import FadeIn from "@/components/FadeIn";
import TransitionLink from "@/components/TransitionLink";
import { wipWorks } from "@/data/works";

export const metadata = {
  title: "WIP",
  description: "よりかわあいせが現在制作中のプロジェクトの一覧です。",
  openGraph: {
    title: "WIP | 依川 愛瀬",
    description: "よりかわあいせが現在制作中のプロジェクトの一覧です。",
  },
};

export default function MakingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <TransitionLink
        href="/"
        className="text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        ← トップに戻る
      </TransitionLink>
      <FadeIn>
        <h1 className="mt-8 text-4xl font-bold text-foreground">WIP</h1>
        <p className="mt-3 text-base text-muted-foreground">
          制作中のプロジェクト
        </p>
      </FadeIn>
      {wipWorks.length > 0 ? (
        <div className="mt-12 space-y-14">
          {wipWorks.map((work, i) => (
            <FadeIn key={work.slug} delay={i * 150}>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
                {work.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={work.image}
                    alt={`${work.title} のスクリーンショット`}
                    className="aspect-video w-full rounded-lg object-cover object-top shadow-md sm:w-2/5 sm:shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold leading-snug text-foreground sm:text-2xl">
                      {work.title}
                    </h2>
                    <span className="shrink-0 rounded-full bg-accent/40 px-2.5 py-0.5 text-xs font-medium text-primary">
                      WIP
                    </span>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {work.summary}
                  </p>
                  <p className="mt-2.5 text-xs text-muted-foreground/70 sm:text-sm">
                    {work.tech.join(" / ")}
                  </p>
                  {work.url && (
                    <a
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm text-primary underline-offset-4 hover:underline"
                    >
                      サイトを見る →
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      ) : (
        <FadeIn delay={150}>
          <p className="mt-14 text-base leading-relaxed text-muted-foreground">
            現在制作中のプロジェクトは、公開準備ができ次第ここに掲載します。
          </p>
        </FadeIn>
      )}
    </div>
  );
}
