import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://packed7ice.github.io"),
  title: {
    default: "Yorikawa Aise | Portfolio",
    template: "%s | Yorikawa Aise",
  },
  description:
    "Yorikawa Aise のポートフォリオサイト。ウェブサイト開発・ゲーム制作などの成果物をまとめています。",
  openGraph: {
    title: "Yorikawa Aise | Portfolio",
    description:
      "Yorikawa Aise のポートフォリオサイト。ウェブサイト開発・ゲーム制作などの成果物をまとめています。",
    url: "https://packed7ice.github.io",
    siteName: "Yorikawa Aise | Portfolio",
    locale: "ja_JP",
    type: "website",
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
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
