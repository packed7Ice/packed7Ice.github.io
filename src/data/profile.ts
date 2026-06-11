export const profile = {
  name: "Yorikawa Aise",
  // public/icon.png を置いて "/icon.png" に変えるとローカル画像になる
  avatar: "https://avatars.githubusercontent.com/u/108216674?v=4",
  intro: [
    "ウェブサイト開発を中心に活動しています。",
    "サークルの公式サイトやブラウザゲームなど、企画から実装・運用までを一貫して手がけています。",
  ],
  github: "https://github.com/packed7Ice",
  x: "https://x.com/yorikawaaise",
};

export type SkillCategory = { name: string; items: string[] };

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    items: ["TypeScript", "JavaScript", "HTML5 / CSS3", "PHP", "Python"],
  },
  {
    name: "Frontend",
    items: ["React", "Next.js (App Router)", "Tailwind CSS", "Vite"],
  },
  {
    name: "Backend / Infra",
    items: [
      "MySQL",
      "GitHub Actions (CI/CD)",
      "GitHub Pages",
      "AWS Amplify",
      "さくらインターネット",
    ],
  },
];
