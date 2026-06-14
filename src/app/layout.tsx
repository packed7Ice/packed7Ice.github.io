import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Header from "@/components/Header";
import PageTransitionOverlay from "@/components/PageTransitionOverlay";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const viewport: Viewport = {
  themeColor: "#1d50a2",
};

const SITE_NAME = "依川 愛瀬 | Portfolio";
const SITE_DESCRIPTION = "よりかわあいせのホームページです。";

export const metadata: Metadata = {
  metadataBase: new URL("https://packed7ice.github.io"),
  title: {
    default: SITE_NAME,
    template: "%s | 依川 愛瀬",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "https://packed7ice.github.io",
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body
        className={`${inter.variable} ${notoSansJP.variable} flex min-h-screen flex-col antialiased`}
      >
        <Header />
        <PageTransitionOverlay />
        <main className="flex-1 pt-14 md:ml-12 md:mr-12 md:pt-0">{children}</main>
      </body>
    </html>
  );
}
