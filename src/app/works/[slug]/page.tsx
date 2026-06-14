import Link from "next/link";
import { works } from "@/data/works";

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export default function WorkPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-muted-foreground">
        このページは Works セクションに統合されました。
      </p>
      <Link
        href="/#works"
        className="text-sm text-primary underline-offset-4 hover:underline"
      >
        Works を見る →
      </Link>
    </div>
  );
}
