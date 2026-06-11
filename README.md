# packed7Ice.github.io

Yorikawa Aise のポートフォリオサイト。
https://packed7ice.github.io/ で公開。

## 技術スタック

- Next.js (App Router) / TypeScript / Tailwind CSS v4
- shiki (コード抜粋のシンタックスハイライト)
- フォント: Noto Sans JP + Inter
- GitHub Pages (静的エクスポート, GitHub Actions で自動デプロイ)

## 開発

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # out/ に静的出力
```

## 作品の追加・更新

コンテンツはすべて `src/data/works.ts` に集約されています。
配列に `Work` を 1 件追加するだけで、一覧カードと詳細ページが自動生成されます。
`status: "wip"` にすると「Now Making(制作中)」セクションに表示されます。

詳細は `CLAUDE.md` を参照。
