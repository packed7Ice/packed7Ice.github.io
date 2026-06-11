import WorkCard from "@/components/WorkCard";
import { releasedWorks, wipWorks } from "@/data/works";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface to-background">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-medium tracking-widest text-primary">
            PORTFOLIO
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Yorikawa Aise
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            ウェブサイト開発を中心に活動しています。サークルの公式サイトや
            ブラウザゲームなど、企画から実装・運用までを一貫して手がけた
            制作物をまとめています。
          </p>
          <div className="mt-8 flex gap-3">
            <a
              href="#works"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
            >
              Works を見る
            </a>
            <a
              href="https://github.com/packed7Ice"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border bg-white px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-primary"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Works */}
      <section id="works" className="scroll-mt-14">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-foreground">Works</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            公開済みの制作物
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {releasedWorks.map((work) => (
              <WorkCard key={work.slug} work={work} />
            ))}
          </div>
        </div>
      </section>

      {/* WIP */}
      <section id="wip" className="scroll-mt-14 bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-foreground">Now Making</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            制作中のプロジェクト
          </p>
          {wipWorks.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {wipWorks.map((work) => (
                <WorkCard key={work.slug} work={work} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-border bg-white/60 p-10 text-center text-sm text-muted-foreground">
              現在制作中のプロジェクトは、公開準備ができ次第ここに掲載します。
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-14">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-foreground">About</h2>
          <div className="mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              千葉工業大学のサークル「ソフトメディア研究会」を中心に、
              ウェブサイトの設計・実装から CI/CD・バックアップなどの
              運用基盤の整備までを手がけています。
            </p>
            <p>
              主な技術スタック: TypeScript / React / Next.js / Tailwind CSS。
              用途に応じて PHP + MySQL の CMS 開発や、フレームワークを使わない
              素の JavaScript でのゲーム開発も行います。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
