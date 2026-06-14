"use client";

import { useEffect, useRef, useState } from "react";

export type SectionMeta = {
  id: string;
  label: string;       // このセクション自身の名前（上方向遷移時に表示）
  nextLabel: string | null; // 次セクションの名前（下方向遷移時に表示）
  nextId: string | null;
};

/** ホイール累積のしきい値（大きいほど余裕が増える） */
const THRESHOLD = 280;
const COOLDOWN_MS = 1050;
const EDGE_PX = 10;

export default function ScrollController({ sections }: { sections: SectionMeta[] }) {
  const [progress, setProgress] = useState(0);          // 0–100
  const [direction, setDirection] = useState<"down" | "up" | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const accRef = useRef(0);
  const cooldownRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const touchStartY = useRef(0);

  useEffect(() => {
    /** viewport 内のアクティブセクションを判定 */
    const getIdx = (): number => {
      let idx = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.5) idx = i;
      }
      return idx;
    };

    /**
     * イベントターゲットから最も近い内部スクロール可能コンテナを返す。
     * html / body は除外。
     */
    const findInnerScrollable = (target: EventTarget | null): Element | null => {
      let el = target as Element | null;
      while (el && el !== document.documentElement && el !== document.body) {
        const ov = getComputedStyle(el).overflowY;
        if ((ov === "auto" || ov === "scroll") && el.scrollHeight > el.clientHeight + 2) {
          return el;
        }
        el = el.parentElement;
      }
      return null;
    };

    const scheduleUpdate = (pct: number, dir: "down" | "up") => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        setProgress(pct);
        setDirection(dir);
      });
    };

    const reset = () => {
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      accRef.current = 0;
      setProgress(0);
      setDirection(null);
    };

    const navigateTo = (id: string, newIdx: number) => {
      reset();
      cooldownRef.current = true;
      setActiveIndex(newIdx);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        cooldownRef.current = false;
        setActiveIndex(getIdx());
      }, COOLDOWN_MS);
    };

    const handleWheel = (e: WheelEvent) => {
      // クールダウン中はページスクロールを止めるのみ
      if (cooldownRef.current) { e.preventDefault(); return; }

      // 内部スクロールコンテナが境界に達していなければ自然スクロールに委ねる
      const inner = findInnerScrollable(e.target);
      if (inner) {
        const down = e.deltaY > 0;
        const atBot = inner.scrollTop >= inner.scrollHeight - inner.clientHeight - EDGE_PX;
        const atTop = inner.scrollTop <= EDGE_PX;
        if ((down && !atBot) || (!down && !atTop)) {
          reset();
          return; // ページスクロール防止せず内部スクロールへ
        }
      }

      // ここ以降はページスクロールを防止してセクション遷移に使う
      e.preventDefault();

      const idx = getIdx();

      // 方向転換時は蓄積リセット
      if (e.deltaY > 0 && accRef.current < 0) accRef.current = 0;
      if (e.deltaY < 0 && accRef.current > 0) accRef.current = 0;

      if (e.deltaY > 0 && sections[idx]?.nextId) {
        accRef.current = Math.min(accRef.current + e.deltaY, THRESHOLD);
        scheduleUpdate((accRef.current / THRESHOLD) * 100, "down");
        if (accRef.current >= THRESHOLD) navigateTo(sections[idx].nextId!, idx + 1);
      } else if (e.deltaY < 0 && idx > 0) {
        accRef.current = Math.max(accRef.current + e.deltaY, -THRESHOLD);
        scheduleUpdate((Math.abs(accRef.current) / THRESHOLD) * 100, "up");
        if (accRef.current <= -THRESHOLD) navigateTo(sections[idx - 1].id, idx - 1);
      } else {
        reset();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (cooldownRef.current) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 60) return;

      // 内部スクロールコンテナが境界外なら自然スクロールへ
      const inner = findInnerScrollable(e.target);
      if (inner) {
        const down = delta > 0;
        const atBot = inner.scrollTop >= inner.scrollHeight - inner.clientHeight - EDGE_PX;
        const atTop = inner.scrollTop <= EDGE_PX;
        if ((down && !atBot) || (!down && !atTop)) return;
      }

      const idx = getIdx();
      if (delta > 0 && sections[idx]?.nextId) {
        navigateTo(sections[idx].nextId!, idx + 1);
      } else if (delta < 0 && idx > 0) {
        navigateTo(sections[idx - 1].id, idx - 1);
      }
    };

    setActiveIndex(getIdx());
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [sections]);

  // ── UI ──────────────────────────────────────────────────────────
  const current = sections[activeIndex];
  const barLabel =
    direction === "down"
      ? current?.nextLabel
      : activeIndex > 0
      ? sections[activeIndex - 1].label
      : null;
  const arrow = direction === "down" ? "↓" : "↑";

  if (!direction || progress <= 0) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 right-4 z-40 md:left-[50%] md:right-16"
      aria-hidden
    >
      <div className="px-6 pb-4 md:px-12">
        {barLabel && (
          <p className="mb-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground/60">
            {arrow}&ensp;{barLabel}
          </p>
        )}
        {/* 進捗バー: 下方向は左→右、上方向は右→左 */}
        <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-border/50">
          <div
            className="absolute top-0 h-full rounded-full bg-primary"
            style={{
              width: `${progress}%`,
              ...(direction === "up"
                ? { right: 0, left: "auto" }
                : { left: 0, right: "auto" }),
            }}
          />
        </div>
      </div>
    </div>
  );
}
