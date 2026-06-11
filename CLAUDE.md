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
| 作品データ(全コンテンツ) | `src/data/works.ts` |
| トップページ | `src/app/page.tsx` |
| 作品詳細(全 slug 共通) | `src/app/works/[slug]/page.tsx` |
| コード抜粋表示 | `src/components/CodeBlock.tsx` (shiki, server component) |
| 色・フォント | `src/app/globals.css` |

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
