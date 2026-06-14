"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const COLS = 6;
const ROWS = 4;
const TOTAL = COLS * ROWS;
const STAGGER_MS = 12;    // タイル間の遅延
const TILE_MS = 200;      // 1 タイルのアニメーション時間
/** leaving アニメーション全体が完了するまでの時間 */
const DISMISS_MS = (TOTAL - 1) * STAGGER_MS + TILE_MS + 60;

type Phase = "idle" | "entering" | "leaving";

export default function PageTransitionOverlay() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");

  // ページ遷移完了（pathname 変化）→ タイルを退場させる
  useEffect(() => {
    setPhase("leaving");
    const t = setTimeout(() => setPhase("idle"), DISMISS_MS);
    return () => clearTimeout(t);
  }, [pathname]);

  // TransitionLink からの「遷移開始」シグナルを受け取る
  useEffect(() => {
    const handle = () => setPhase("entering");
    window.addEventListener("page-transition-start", handle);
    return () => window.removeEventListener("page-transition-start", handle);
  }, []);

  if (phase === "idle") return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[500] grid"
      style={{
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      }}
    >
      {Array.from({ length: TOTAL }, (_, i) => {
        // entering: 左上→右下の順でタイルが現れる
        // leaving:  右下→左上の順でタイルが消える
        const delay =
          phase === "entering"
            ? i * STAGGER_MS
            : (TOTAL - 1 - i) * STAGGER_MS;

        return (
          <div
            key={i}
            className="bg-background"
            style={{
              animation: `${
                phase === "entering" ? "page-tile-in" : "page-tile-out"
              } ${TILE_MS}ms ease ${delay}ms both`,
            }}
          />
        );
      })}
    </div>
  );
}
