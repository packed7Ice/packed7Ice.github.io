"use client";

import { useEffect } from "react";

type Section = { id: string; nextId: string | null };

const THRESHOLD = 120; // ホイール累積量のしきい値
const COOLDOWN_MS = 950; // 連続ナビゲーション防止の待機時間(ms)
const EDGE_PX = 64; // セクション境界とみなす範囲(px)

export default function ScrollDriver({ sections }: { sections: Section[] }) {
  useEffect(() => {
    let accumulated = 0;
    let cooldown = false;
    let touchStartY = 0;

    /** 現在表示中のセクションのインデックスを返す */
    const getCurrentIndex = (): number => {
      let idx = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.4) idx = i;
      }
      return idx;
    };

    /** セクション下端が viewport 下端付近かどうか */
    const atBottom = (el: HTMLElement): boolean =>
      el.getBoundingClientRect().bottom <= window.innerHeight + EDGE_PX;

    /** セクション上端が viewport 上端付近かどうか */
    const atTop = (el: HTMLElement): boolean =>
      el.getBoundingClientRect().top >= -EDGE_PX;

    const navigateTo = (id: string): void => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const handleWheel = (e: WheelEvent) => {
      if (cooldown) return;

      const idx = getCurrentIndex();
      const el = document.getElementById(sections[idx].id);
      if (!el) return;

      const goingDown = e.deltaY > 0;

      if (goingDown && atBottom(el) && sections[idx].nextId) {
        // 下端に達してさらに下にスクロール → 次セクション
        e.preventDefault();
        accumulated += e.deltaY;
        if (accumulated >= THRESHOLD) {
          accumulated = 0;
          cooldown = true;
          navigateTo(sections[idx].nextId!);
          setTimeout(() => { cooldown = false; }, COOLDOWN_MS);
        }
      } else if (!goingDown && atTop(el) && idx > 0) {
        // 上端に達してさらに上にスクロール → 前セクション
        e.preventDefault();
        accumulated += e.deltaY; // 負の値
        if (accumulated <= -THRESHOLD) {
          accumulated = 0;
          cooldown = true;
          navigateTo(sections[idx - 1].id);
          setTimeout(() => { cooldown = false; }, COOLDOWN_MS);
        }
      } else {
        // 境界外: 蓄積をリセットしてネイティブスクロールに委ねる
        accumulated = 0;
      }
    };

    /** タッチ開始時の Y 座標を記録 */
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      accumulated = 0;
    };

    /** タッチ終了時に境界チェックしてセクション遷移 */
    const handleTouchEnd = (e: TouchEvent) => {
      if (cooldown) return;
      const delta = touchStartY - e.changedTouches[0].clientY; // 正 = 上スワイプ = 下スクロール
      if (Math.abs(delta) < 60) return;

      const idx = getCurrentIndex();
      const el = document.getElementById(sections[idx].id);
      if (!el) return;

      if (delta > 0 && atBottom(el) && sections[idx].nextId) {
        cooldown = true;
        navigateTo(sections[idx].nextId!);
        setTimeout(() => { cooldown = false; }, COOLDOWN_MS);
      } else if (delta < 0 && atTop(el) && idx > 0) {
        cooldown = true;
        navigateTo(sections[idx - 1].id);
        setTimeout(() => { cooldown = false; }, COOLDOWN_MS);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [sections]);

  return null;
}
