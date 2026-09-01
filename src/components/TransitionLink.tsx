"use client";

import { useRouter, usePathname } from "next/navigation";
import type { AnchorHTMLAttributes } from "react";

/** タイルが全て表示し終わってからページ遷移するまでの待機時間 */
const NAVIGATE_MS = (6 * 4 - 1) * 12 + 200 + 40; // ≈ 516ms

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export default function TransitionLink({
  href,
  children,
  className,
  onClick,
  ...rest
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // ハッシュリンク（/#skills 等）・外部 URL はそのまま通す
    if (
      !href ||
      href.includes("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto")
    ) {
      return;
    }

    e.preventDefault();
    onClick?.(e);

    // 現在と同じページへのリンクは pathname が変化せず遷移完了を検知できず、
    // オーバーレイのタイルが画面を覆ったまま残ってしまうため、遷移自体を行わない
    if (href === pathname) return;

    // オーバーレイにタイル登場を指示
    window.dispatchEvent(new CustomEvent("page-transition-start"));
    // 全タイルが揃ってからページを切り替える
    setTimeout(() => router.push(href), NAVIGATE_MS);
  };

  return (
    <a href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
