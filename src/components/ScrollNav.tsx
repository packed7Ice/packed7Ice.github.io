"use client";

import { useEffect, useState } from "react";

export type SectionMeta = {
  id: string;
  nextLabel: string | null;
  nextId: string | null;
};

export default function ScrollNav({ sections }: { sections: SectionMeta[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      let idx = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= window.innerHeight * 0.4) {
          idx = i;
        }
      }
      setActiveIndex(idx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // 初期位置の計算（requestAnimationFrame でDOM確定後に実行）
    const raf = requestAnimationFrame(handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, [sections]);

  const current = sections[activeIndex];
  if (!current?.nextId || !current?.nextLabel) return null;

  return (
    <a
      href={`#${current.nextId}`}
      className="fixed bottom-7 right-4 z-40 flex flex-col items-center gap-1 rounded-full bg-background/85 px-4 py-2 shadow-sm backdrop-blur transition-colors hover:text-primary md:right-16"
      style={{ color: "var(--color-muted-foreground)" }}
    >
      <span className="text-[0.58rem] font-semibold tracking-[0.22em] uppercase opacity-70">
        {current.nextLabel}
      </span>
      <span className="animate-bounce text-sm leading-none">↓</span>
    </a>
  );
}
