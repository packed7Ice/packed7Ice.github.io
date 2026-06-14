import FadeIn from "@/components/FadeIn";
import CodeBlock from "@/components/CodeBlock";
import ScrollController, { type SectionMeta } from "@/components/ScrollController";
import TransitionLink from "@/components/TransitionLink";
import { profile, skillCategories } from "@/data/profile";
import { releasedWorks } from "@/data/works";

/**
 * 各セクションを viewport ぴったりの高さにして、ページスクロールを
 * ScrollController に完全に委ねる。
 * overflow-hidden で内容がはみ出してもセクション境界をクリップ。
 */
const SECTION =
  "flex h-[calc(100dvh-3.5rem)] scroll-mt-14 items-center overflow-hidden md:h-screen md:scroll-mt-0";

const getWorkId = (i: number) =>
  i === 0 ? "works" : `work-${releasedWorks[i].slug}`;

function LevelDots({ level }: { level: number }) {
  return (
    <span className="flex gap-1" aria-label={`習得練度 ${level} / 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`h-2 w-2 rounded-full ${
            n <= level ? "bg-primary" : "bg-border"
          }`}
        />
      ))}
    </span>
  );
}

export default function Home() {
  const scrollNavSections: SectionMeta[] = [
    { id: "profile", label: "Profile", nextLabel: "Skills",  nextId: "skills" },
    { id: "skills",  label: "Skills",  nextLabel: "Works",   nextId: "works"  },
    ...releasedWorks.map((_, i) => ({
      id:        getWorkId(i),
      label:     i === 0 ? "Works" : `Works ${String(i + 1).padStart(2, "0")}`,
      nextLabel: i < releasedWorks.length - 1 ? "次の作品" : null,
      nextId:    i < releasedWorks.length - 1 ? getWorkId(i + 1) : null,
    })),
  ];

  return (
    <>
      {/* 1. Profile */}
      <section
        id="profile"
        className={`${SECTION} bg-gradient-to-b from-surface to-background`}
      >
        <div className="mx-auto w-full max-w-5xl overflow-hidden px-4 sm:px-6">
          <FadeIn>
            <div className="flex flex-col items-center gap-10 py-6 text-center sm:flex-row sm:gap-14 sm:text-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.avatar}
                alt={`${profile.nameJa} のアイコン`}
                width={224}
                height={224}
                className="h-44 w-44 shrink-0 rounded-full border-4 border-white shadow-lg ring-2 ring-accent sm:h-56 sm:w-56"
              />
              <div>
                <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
                  {profile.nameJa}
                </h1>
                <p className="mt-3 text-lg tracking-widest text-muted-foreground/70 sm:text-xl">
                  {profile.nameEn}
                </p>
                <div className="mt-6 max-w-xl space-y-1.5 text-base leading-relaxed text-muted-foreground">
                  {profile.intro.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <div className="mt-8 flex justify-center gap-3 sm:justify-start">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-primary px-7 py-3 text-base font-medium text-white transition-opacity hover:opacity-85"
                  >
                    GitHub
                  </a>
                  <a
                    href={profile.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border bg-white px-7 py-3 text-base font-medium text-foreground transition-colors hover:border-accent hover:text-primary"
                  >
                    X (Twitter)
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. Skills */}
      <section id="skills" className={SECTION}>
        <div className="mx-auto w-full max-w-4xl overflow-hidden px-4 text-center sm:px-6">
          <FadeIn>
            <h2 className="pt-6 text-3xl font-bold text-foreground sm:text-4xl">
              Skills
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              使用できる技術(各カテゴリ内は習得練度順)
            </p>
          </FadeIn>
          <div className="mx-auto mt-12 grid w-fit gap-x-16 gap-y-10 pb-6 text-left sm:grid-cols-3">
            {skillCategories.map((category, i) => (
              <FadeIn key={category.name} delay={i * 150}>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/70">
                  {category.name}
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {[...category.items]
                    .sort((a, b) => b.level - a.level)
                    .map((item) => (
                      <li key={item.name}>
                        <span className="text-base font-medium text-foreground">
                          {item.name}
                        </span>
                        <span className="mt-1.5 block">
                          <LevelDots level={item.level} />
                        </span>
                      </li>
                    ))}
                </ul>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Works — 作品ごとに 1 セクション（viewport 固定高さ） */}
      {releasedWorks.map((work, i) => (
        <section
          key={work.slug}
          id={getWorkId(i)}
          className="h-[calc(100dvh-3.5rem)] scroll-mt-14 md:flex md:h-screen md:scroll-mt-0"
        >
          {/* Desktop: スティッキー左パネル（画像カード・16:9） */}
          <div className="hidden md:block md:w-1/2 md:shrink-0">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-surface/40 p-7">
              {work.image && (
                <FadeIn className="w-full">
                  <div className="relative w-full overflow-hidden rounded-2xl border-[3px] border-white shadow-2xl shadow-primary/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={work.image}
                      alt={`${work.title} のスクリーンショット`}
                      className="aspect-video w-full object-cover object-top"
                    />
                    <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(255,255,255,0.45)]" />
                  </div>
                </FadeIn>
              )}
            </div>
          </div>

          {/*
           * 右パネル: overflow-y-auto で内容が長い場合は内部スクロール。
           * ScrollController の findInnerScrollable がこのコンテナを検出し、
           * 上端 / 下端に達したときのみセクション遷移トリガーに使う。
           */}
          <div className="w-full overflow-y-auto px-6 py-16 md:w-1/2 md:py-24 md:pl-12 md:pr-8">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                Works&ensp;
                {String(i + 1).padStart(2, "0")}&thinsp;/&thinsp;
                {String(releasedWorks.length).padStart(2, "0")}
              </p>
            </FadeIn>

            {/* モバイル用画像カード */}
            {work.image && (
              <FadeIn delay={100} className="mt-4 md:hidden">
                <div className="relative overflow-hidden rounded-xl border-[3px] border-white shadow-lg shadow-primary/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={work.image}
                    alt={`${work.title} のスクリーンショット`}
                    className="aspect-video w-full object-cover object-top"
                  />
                  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(255,255,255,0.4)]" />
                </div>
              </FadeIn>
            )}

            <FadeIn delay={150}>
              <h3 className="mt-5 break-words text-4xl font-black leading-tight text-foreground sm:text-5xl">
                {work.title}
              </h3>
            </FadeIn>

            <FadeIn delay={250}>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {work.description}
              </p>
            </FadeIn>

            <FadeIn delay={350}>
              <h4 className="mt-7 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/60">
                制作のポイント
              </h4>
              <ul className="mt-3 space-y-2.5">
                {work.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={450}>
              <div className="mt-6 flex flex-wrap gap-5">
                {work.url && (
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    公式サイトを見る →
                  </a>
                )}
                {work.repo && (
                  <a
                    href={work.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    ソースコードを見る →
                  </a>
                )}
              </div>
              <p className="mt-3 text-xs text-muted-foreground/60 sm:text-sm">
                {work.tech.join(" / ")}
              </p>
            </FadeIn>

            {work.snippets && work.snippets.length > 0 && (
              <FadeIn delay={500} className="mt-8">
                <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/60">
                  コード抜粋
                </h4>
                <div className="mt-4 space-y-8">
                  {work.snippets.map((snippet) => (
                    <CodeBlock key={snippet.title} snippet={snippet} />
                  ))}
                </div>
              </FadeIn>
            )}

            {i === releasedWorks.length - 1 && (
              <FadeIn delay={550} className="mt-10 pb-12">
                <TransitionLink
                  href="/making/"
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  制作中のプロジェクト (WIP) を見る →
                </TransitionLink>
              </FadeIn>
            )}
          </div>
        </section>
      ))}

      {/* スクロール制御 + 進捗バー UI */}
      <ScrollController sections={scrollNavSections} />
    </>
  );
}
