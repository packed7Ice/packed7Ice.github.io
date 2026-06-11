export const profile = {
  nameJa: "依川 愛瀬",
  nameEn: "Yorikawa Aise",
  // public/icon.png を置いて "/icon.png" に変えるとローカル画像になる
  avatar: "https://avatars.githubusercontent.com/u/108216674?v=4",
  intro: [
    "ウェブサイト開発を中心に活動しています。",
    "サークルの公式サイトやブラウザゲームなど、企画から実装・運用までを一貫して手がけています。",
  ],
  github: "https://github.com/packed7Ice",
  x: "https://x.com/yorikawaaise",
};

// level: 習得練度 (1〜5)。各カテゴリ内で level の降順に表示される。
export type Skill = { name: string; level: number };
export type SkillCategory = { name: string; items: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    items: [
      { name: "TypeScript", level: 5 },
      { name: "JavaScript", level: 5 },
      { name: "HTML5 / CSS3", level: 4 },
      { name: "PHP", level: 3 },
      { name: "Python", level: 3 },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "React", level: 5 },
      { name: "Next.js (App Router)", level: 5 },
      { name: "Tailwind CSS", level: 4 },
      { name: "Vite", level: 3 },
    ],
  },
  {
    name: "Backend / Infra",
    items: [
      { name: "GitHub Actions (CI/CD)", level: 4 },
      { name: "GitHub Pages", level: 4 },
      { name: "MySQL", level: 3 },
      { name: "AWS Amplify", level: 3 },
      { name: "さくらインターネット", level: 3 },
    ],
  },
];
