export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 py-8 text-xs text-muted-foreground sm:px-6">
        <div className="flex gap-4">
          <a
            href="https://github.com/packed7Ice"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            GitHub
          </a>
          <a
            href="https://x.com/yorikawaaise"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            Twitter
          </a>
        </div>
        <p>© {new Date().getFullYear()} Yorikawa Aise</p>
      </div>
    </footer>
  );
}
