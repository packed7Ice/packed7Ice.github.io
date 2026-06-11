import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-sm font-bold tracking-wide text-primary">
          Yorikawa Aise
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link href="/#works" className="transition-colors hover:text-primary">
            Works
          </Link>
          <Link href="/#about" className="transition-colors hover:text-primary">
            About
          </Link>
          <a
            href="https://github.com/packed7Ice"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
