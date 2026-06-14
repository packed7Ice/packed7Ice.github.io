import Link from "next/link";
import TransitionLink from "@/components/TransitionLink";

const NAV = [
  { href: "/#skills", label: "Skills" },
  { href: "/#works",  label: "Works"  },
  { href: "/making/", label: "WIP"        },
  { href: "/site/",   label: "Tech Stack" },
];

/** ハッシュを含むリンクはページ内スクロールなので遷移不要 */
const isPageLink = (href: string) =>
  !href.includes("#") && !href.startsWith("http");

export default function Header() {
  return (
    <>
      {/* Mobile: top bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur md:hidden">
        <TransitionLink
          href="/"
          className="text-sm font-bold tracking-wide text-primary"
        >
          依川 愛瀬
        </TransitionLink>
        <nav className="flex items-center gap-3 text-xs text-muted-foreground">
          {NAV.slice(0, 3).map(({ href, label }) =>
            isPageLink(href) ? (
              <TransitionLink
                key={href}
                href={href}
                className="transition-colors hover:text-primary"
              >
                {label}
              </TransitionLink>
            ) : (
              <Link
                key={href}
                href={href}
                className="transition-colors hover:text-primary"
              >
                {label}
              </Link>
            )
          )}
          <a
            href="https://github.com/packed7Ice"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            GitHub
          </a>
        </nav>
      </header>

      {/* Desktop: left sidebar — name */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-12 flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-sm md:flex">
        <span className="block h-10 w-px bg-border" />
        <TransitionLink
          href="/"
          className="text-xs font-bold tracking-[0.28em] text-primary transition-opacity hover:opacity-70"
          style={{ writingMode: "vertical-rl" }}
        >
          依川 愛瀬
        </TransitionLink>
        <span className="block h-10 w-px bg-border" />
      </aside>

      {/* Desktop: right sidebar — nav */}
      <aside className="fixed inset-y-0 right-0 z-50 hidden w-12 flex-col items-center justify-center gap-8 bg-background/80 backdrop-blur-sm md:flex">
        {NAV.map(({ href, label }) =>
          isPageLink(href) ? (
            <TransitionLink
              key={href}
              href={href}
              className="text-[0.6rem] font-medium tracking-[0.2em] text-muted-foreground/70 transition-colors hover:text-primary"
              style={{ writingMode: "vertical-rl" }}
            >
              {label}
            </TransitionLink>
          ) : (
            <Link
              key={href}
              href={href}
              className="text-[0.6rem] font-medium tracking-[0.2em] text-muted-foreground/70 transition-colors hover:text-primary"
              style={{ writingMode: "vertical-rl" }}
            >
              {label}
            </Link>
          )
        )}
        <a
          href="https://github.com/packed7Ice"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.6rem] font-medium tracking-[0.2em] text-muted-foreground/70 transition-colors hover:text-primary"
          style={{ writingMode: "vertical-rl" }}
        >
          GitHub
        </a>
      </aside>
    </>
  );
}
