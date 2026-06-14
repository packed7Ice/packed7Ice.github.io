"use client";

import { useRouter } from "next/navigation";
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
