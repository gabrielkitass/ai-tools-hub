import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEOタイトル・見出し生成",
  description: "キーワードから検索上位を狙えるSEOタイトル・見出し構成をAIが提案。登録不要・完全無料。",
  alternates: { canonical: "/seo" },
  openGraph: {
    title: "SEOタイトル・見出し生成 | AIツール集",
    description: "キーワードから検索上位を狙えるSEOタイトル・見出し構成をAIが提案。登録不要・完全無料。",
    url: "/seo",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
