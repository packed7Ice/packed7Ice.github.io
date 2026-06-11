import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { profile, skillCategories } from "@/data/profile";
import { releasedWorks } from "@/data/works";

const SECTION =
  "flex min-h-[calc(100dvh-3.5rem)] snap-start scroll-mt-14 items-center";

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
  return (
    <>
      {/* 1. Profile */}
      <section
        id="profile"
        className={`${SECTION} bg-gradient-to-b from-surface to-background`}
      >
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <FadeIn>
            <div className="flex flex-col items-center gap-10 text-center sm:flex-row sm:gap-14 sm:text-left">
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
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Skills
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              使用できる技術(各カテゴリ内は習得練度順)
            </p>
          </FadeIn>
          <div className="mx-auto mt-12 grid w-fit gap-x-16 gap-y-10 text-left sm:grid-cols-3">
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

      {/* 3. Works */}
      <section id="works" className={`${SECTION} bg-surface`}>
        <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Works
            </h2>
            <p className="mt-3 text-base text-muted-foreground">主な制作物</p>
          </FadeIn>
          <div className="mt-10 space-y-10">
            {releasedWorks.map((work, i) => (
              <FadeIn key={work.slug} delay={i * 150}>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
                  {work.image && (
                    <Link
                      href={`/works/${work.slug}/`}
                      className="block w-full shrink-0 sm:w-2/5"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={work.image}
                        alt={`${work.title} のスクリーンショット`}
                        className="aspect-video w-full rounded-lg object-cover object-top shadow-md transition-transform hover:scale-[1.02]"
                      />
                    </Link>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold leading-snug text-foreground sm:text-2xl">
                      <Link
                        href={`/works/${work.slug}/`}
                        className="transition-colors hover:text-primary"
                      >
                        {work.title}
                      </Link>
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {work.summary}
                    </p>
                    <p className="mt-2.5 text-xs text-muted-foreground/70 sm:text-sm">
                      {work.tech.join(" / ")}
                    </p>
                    <Link
                      href={`/works/${work.slug}/`}
                      className="mt-3 inline-block text-sm text-primary underline-offset-4 hover:underline"
                    >
                      詳しく見る →
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={450} className="mt-10 text-center">
            <Link
              href="/making/"
              className="text-sm text-primary underline-offset-4 hover:underline"
            >
              制作中のプロジェクト (WIP) を見る →
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
