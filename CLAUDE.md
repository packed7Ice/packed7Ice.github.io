# CLAUDE.md — ポートフォリオサイト引き継ぎ

Yorikawa Aise (GitHub: packed7Ice) のポートフォリオ。https://packed7ice.github.io/

## 構成(完成済み。大規模な再設計は不要)

- Next.js 16 (App Router) + TS + Tailwind v4、`output: "export"` で静的エクスポート
- main へ push → `.github/workflows/deploy.yml` が GitHub Pages へ自動デプロイ
- フォント: Noto Sans JP + Inter (`src/app/layout.tsx` で next/font)
- テーマカラーは `src/app/globals.css` の `:root` で定義
  (#a0d8ef=accent, #1d50a2=primary, #fffffe=background, #eaeff3=surface)

## ファイルマップ(必要なものだけ読むこと)

| 目的 | ファイル |
|---|---|
| 作品データ(全コンテンツ。`image` = `public/works/` のスクショ) | `src/data/works.ts` |
| プロフィール(日本語名/英語名)・スキル(`level`=練度1-5, 降順表示) | `src/data/profile.ts` |
| トップページ(Profile/Skills/Works 3画面スナップ、脱カードデザイン) | `src/app/page.tsx` |
| WIP(制作中)一覧ページ | `src/app/making/page.tsx` |
| Tech Stack ページ(カテゴリ別カラム表示) | `src/app/site/page.tsx` |
| 作品詳細(全 slug 共通) | `src/app/works/[slug]/page.tsx` |
| コード抜粋表示 | `src/components/CodeBlock.tsx` (shiki, server component) |
| スクロール時フェードイン | `src/components/FadeIn.tsx` (IntersectionObserver) |
| 色・フォント・スクロールスナップ | `src/app/globals.css` |
| OG 画像(アイコン+名前、ビルド時生成) | `src/app/opengraph-image.tsx` |
| ファビコン(avatar から生成) | `src/app/icon.tsx` |

OGP: 既定の説明文・theme-color は `layout.tsx`。各ページの概要は各 page の
metadata / generateMetadata の `description` と `openGraph` を両方更新すること。
OG 画像生成はビルド時に Google Fonts と GitHub アバターへアクセスする(要ネットワーク)。

- カード風 UI(枠線+角丸の箱)は使わないデザイン方針。
- アイコンは GitHub アバター参照中。差し替えは `public/icon.png` を置き `profile.ts` の `avatar` を変更。
- 作品スクショは `public/works/<slug>.png`(16:9 推奨)。
- `src/components/WorkCard.tsx` は未使用(削除可)。

## 最頻タスク: 作品の追加

`src/data/works.ts` の配列に Work を 1 件追加するだけ。他のファイルの変更は不要。
ファイル末尾にコメントでテンプレートあり。`status: "wip"` → 「Now Making」枠に表示。
コード抜粋を載せる場合のみ `snippets` を追加(言語は shiki の lang 名)。

## 検証

```bash
npm run build   # 静的エクスポートが通れば OK
```

## 注意

- localStorage 等は使わない(静的サイト)。画像は `public/` に置き `next/image` は unoptimized。
- リンク先 URL: sofumeweb=https://softmedia.sakura.ne.jp/, yuruden=https://www.yuruden.net/, そふ花=https://packed7ice.github.io/sofuhana/
- このリポジトリ名は GitHub Pages のユーザーサイト用のため変更しない。
