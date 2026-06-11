import { codeToHtml } from "shiki";
import type { Snippet } from "@/data/works";

export default async function CodeBlock({ snippet }: { snippet: Snippet }) {
  const html = await codeToHtml(snippet.code, {
    lang: snippet.lang,
    theme: "github-light",
  });

  return (
    <figure className="code-block">
      <figcaption className="mb-2 text-sm font-medium text-foreground">
        {snippet.title}
      </figcaption>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {snippet.caption && (
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {snippet.caption}
        </p>
      )}
    </figure>
  );
}
