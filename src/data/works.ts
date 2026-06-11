export type Snippet = {
  title: string;
  lang: string;
  caption?: string;
  code: string;
};

export type Work = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  role: string;
  period?: string;
  status: "released" | "wip";
  /** トップページに表示するスクリーンショット (public/ 配下のパス) */
  image?: string;
  tech: string[];
  url?: string;
  repo?: string;
  points: string[];
  snippets?: Snippet[];
};

// ─────────────────────────────────────────────
// 作品を追加するときは、この配列に Work を 1 件追加するだけ。
// status: "wip" にすると「制作中」セクションに表示され、
// 詳細ページも自動生成される。
// ─────────────────────────────────────────────
export const works: Work[] = [
  {
    slug: "sofumeweb",
    title: "ソフトメディア研究会 公式ウェブサイト",
    summary:
      "千葉工業大学文化会所属サークルの公式サイト。Next.js 静的エクスポートと自作 PHP/MySQL CMS のハイブリッド構成。",
    description:
      "千葉工業大学文化会所属「ソフトメディア研究会」の公式ウェブサイト。Next.js (App Router) + TypeScript + Tailwind CSS のフロントエンドと、PHP / MySQL による自作 CMS を組み合わせたハイブリッド構成で、さくらインターネット上で運用しています。記事の作成・公開は CMS の管理画面から行え、GitHub Actions による自動デプロイ・自動バックアップまで含めた運用基盤を整備しました。",
    role: "設計・実装・運用",
    status: "released",
    image: "/works/sofumeweb.png",
    tech: [
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS v4",
      "PHP",
      "MySQL",
      "GitHub Actions",
    ],
    url: "https://softmedia.sakura.ne.jp/",
    points: [
      "Next.js 静的エクスポートと PHP/MySQL 自作 CMS を共存させたハイブリッド構成の設計",
      "GitHub Actions から rsync で さくらインターネットへ自動デプロイする CI/CD の構築",
      "日次差分・月次フルの自動バックアップと Discord への通知連携(デプロイ/バックアップ/CMS ログイン)",
      "remark / rehype による Markdown 記事パイプライン(GFM・サニタイズ対応)",
      "セットアップ・CMS 利用法・デプロイ・バックアップ等のドキュメントを整備し、サークル内で引き継ぎ可能な運用体制を構築",
    ],
  },
  {
    slug: "yurudennet",
    title: "放課後ゆる電波スタジオ 公式ウェブサイト",
    summary:
      "音楽サークルの公式サイト。Markdown ファイルを置くだけで更新できる「Markdown CMS」方式を採用。",
    description:
      "「放課後ゆる電波スタジオ」の公式ウェブサイト。News・Events・Discography の各コンテンツを、指定フォルダに Markdown ファイルを追加するだけで更新できる「Markdown CMS」方式で設計しました。非エンジニアのメンバーでも frontmatter 付きの Markdown を書くだけで記事を公開でき、運用コストを最小化しています。本ポートフォリオサイトのデザインの基にもなっています。",
    role: "設計・実装・運用",
    status: "released",
    image: "/works/yurudennet.png",
    tech: [
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS v4",
      "AWS Amplify",
    ],
    url: "https://www.yuruden.net/",
    points: [
      "Markdown + frontmatter によるファイルベース CMS の設計(News / Events / Discography)",
      "ファイル名がそのまま URL になる規約設計で、記事追加を「ファイルを置くだけ」に簡素化",
      "OGP・メタデータ対応(SNS シェア時のカード表示)",
      "Swiper 等を用いたシンプルでモダンな UI / レスポンシブデザイン",
      "AWS Amplify によるホスティングと自動デプロイ",
    ],
  },
  {
    slug: "sofuhana",
    title: "花札ゲーム「そふ花」",
    summary:
      "ブラウザで遊べる花札「こいこい」。素の JavaScript (ES Modules) でルール・役判定・CPU AI をフルスクラッチ実装。",
    description:
      "サークルの成果物として制作した、ブラウザで遊べる花札「こいこい」ゲーム。フレームワークを使わず、素の HTML5 / CSS3 / JavaScript (ES Modules) のみで SPA として実装しました。山札・手札・場札の状態管理、役判定・得点計算、CPU の簡易 AI、チュートリアル機能までを自前で実装しています。MIT ライセンスでソースコードを公開中です。",
    role: "ゲームロジック・UI 実装",
    status: "released",
    image: "/works/sofuhana.png",
    tech: [
      "HTML5",
      "CSS3",
      "JavaScript (ES Modules)",
      "node --test",
      "GitHub Pages",
    ],
    url: "https://packed7ice.github.io/sofuhana/",
    repo: "https://github.com/packed7Ice/sofuhana",
    points: [
      "花札「こいこい」のルール・役判定・得点計算をフルスクラッチで実装",
      "DOM 操作 (ui.js / dom-elements.js) とゲームロジック (state.js / card-data.js) をモジュール単位で分離",
      "点数・山札残り枚数・こいこい状態から「上がり / こいこい」を判断する簡易 CPU AI",
      "fitApp() + visualViewport 等で画面サイズ・向きに追従するレスポンシブな盤面レイアウト",
      "Node.js 組み込みテストランナー (node --test) による役判定ロジックのユニットテスト",
      "初心者向けのチュートリアル機能・役アシスト(ヒント表示)機能",
    ],
    snippets: [
      {
        title: "役判定ロジック(js/card-data.js より抜粋)",
        lang: "javascript",
        caption:
          "取得札の集合から猪鹿蝶・赤短・五光などの役を判定する。光札・タネ・短冊・カスの枚数と特殊札(柳に小野道風・菊に盃)の扱いを自前で管理。",
        code: `export function checkYaku(cards){
  const yakuList = [];
  const capturedSet = new Set(cards);
  const containsAll = (names) => names.every(name => capturedSet.has(name));

  const inoshikacho = ['萩に猪','紅葉に鹿','牡丹に蝶'];
  if (containsAll(inoshikacho)) yakuList.push('猪鹿蝶');

  if (containsAll(RED_TAN_CARDS)) yakuList.push('赤短');
  if (containsAll(BLUE_TAN_CARDS)) yakuList.push('青短');

  if (capturedSet.has('芒に月') && capturedSet.has('菊に盃')) yakuList.push('月見酒');
  if (capturedSet.has('桜に幕') && capturedSet.has('菊に盃')) yakuList.push('花見酒');

  const lights = cards.filter(c => getCardType(c)==='光' || c==='柳に小野道風');
  const tane = cards.filter(c => getCardType(c)==='タネ');
  const tanzaku = cards.filter(c => getCardType(c)==='短冊');
  let kasu = cards.filter(c => getCardType(c)==='カス').length;
  if (cards.includes('菊に盃')) kasu += 1; // 「菊に盃」はカスにも数える

  const hasRain = cards.includes('柳に小野道風');
  if (lights.length >= 5) yakuList.push('五光');
  else if (lights.length === 4 && !hasRain) yakuList.push('四光');
  else if (lights.length === 4 && hasRain) yakuList.push('雨四光');
  else if (lights.length >= 3 && !hasRain) yakuList.push('三光');

  if (tane.length >= 5) yakuList.push('タネ');
  if (tanzaku.length >= 5) yakuList.push('短冊');
  if (kasu >= 10) yakuList.push('カス');

  return yakuList;
}`,
      },
      {
        title: "CPU の「こいこい / 上がり」判断(script.js より抜粋)",
        lang: "javascript",
        caption:
          "現在の得点・山札の残り枚数・強制上がり条件を加味して、CPU が「上がり」か「こいこい」かを選択する簡易 AI。",
        code: `const cpuEvaluation = scoreFromCaptured(state.cpuCaptured);
if (cpuEvaluation.basePoints > 0){
  let cpuEnds = false;
  if (cpuEvaluation.basePoints >= 7) cpuEnds = true;
  else if (state.deck.length <= 8 && cpuEvaluation.basePoints >= 5) cpuEnds = true;
  else if (state.cpuHand.length === 0 || state.playerKoikoi) cpuEnds = true; // 強制上がり
  else cpuEnds = Math.random() < 0.5;

  if (cpuEnds){
    endRound('cpu');
    return;
  }

  state.cpuKoikoi = true;
  state.cpuKoikoiBasePoints = cpuEvaluation.basePoints || 0;
  showKoikoiDeclaration('cpu');
  showBottomMessage('相手は「こいこい」!');
}`,
      },
    ],
  },
  // ── 制作中の作品のテンプレート(コピーして使う) ──
  // {
  //   slug: "new-project",
  //   title: "プロジェクト名",
  //   summary: "一覧カードに表示される短い説明。",
  //   description: "詳細ページに表示される説明。",
  //   role: "担当",
  //   status: "wip",
  //   tech: ["TypeScript"],
  //   url: undefined,
  //   repo: undefined,
  //   points: ["制作のポイント"],
  // },
];

export const releasedWorks = works.filter((w) => w.status === "released");
export const wipWorks = works.filter((w) => w.status === "wip");
