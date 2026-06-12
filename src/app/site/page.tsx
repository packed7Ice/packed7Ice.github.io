import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Tech Stack",
  description: "このホームページで使用している技術スタックの紹介です。",
  openGraph: {
    title: "Tech Stack | 依川 愛瀬",
    description: "このホームページで使用している技術スタックの紹介です。",
  },
};

type StackItem = { name: string; role: string };
type StackCategory = { name: string; items: StackItem[] };

const stack: StackCategory[] = [
  {
    name: "Framework",
    items: [
      {
        name: "Next.js 16",
        role: "App Router + 静的エクスポートで全ページをビルド時に生成",
      },
    ],
  },
  {
    name: "Language",
    items: [
      {
        name: "TypeScript",
        role: "作品・プロフィールデータを型付きで一元管理",
      },
    ],
  },
  {
    name: "Styling",
    items: [
      {
        name: "Tailwind CSS v4",
        role: "テーマカラーを CSS 変数で定義し @theme で統合",
      },
    ],
  },
  {
    name: "Libraries",
    items: [
      { name: "React 19", role: "UI 構築" },
      {
        name: "shiki",
        role: "コード抜粋のハイライト(ビルド時に HTML 化)",
      },
      {
        name: "IntersectionObserver",
        role: "スクロール連動フェードイン(ライブラリ不使用)",
      },
    ],
  },
  {
    name: "Fonts",
    items: [
      { name: "Noto Sans JP", role: "日本語本文" },
      { name: "Inter", role: "欧文(next/font でセルフホスト)" },
    ],
  },
  {
    name: "Hosting / Infrastructure",
    items: [
      { name: "GitHub Pages", role: "ホスティング" },
      {
        name: "GitHub Actions",
        role: "main への push で自動ビルド・デプロイ",
      },
    ],
  },
];

export default function SitePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Link
        href="/"
        className="text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        ← トップに戻る
      </Link>
      <FadeIn>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
          Tech Stack
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          本ポートフォリオサイト自体も制作物のひとつです。ソースコードは{" "}
          <a
            href="https://github.com/packed7Ice/packed7Ice.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-2 hover:underline"
          >
            GitHub
          </a>{" "}
          で公開しています。
        </p>
      </FadeIn>
      <div className="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((category, i) => (
          <FadeIn key={category.name} delay={Math.min(i * 100, 300)}>
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground/60">
              {category.name}
            </h2>
            <ul className="mt-5 space-y-5">
              {category.items.map((item) => (
                <li key={item.name}>
                  <p className="text-base font-medium text-foreground sm:text-lg">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {item.role}
                  </p>
                </li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
