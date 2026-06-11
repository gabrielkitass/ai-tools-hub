import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "文章要約",
  description: "長い文章・議事録・ニュースを3行や箇条書きにAIが瞬時に要約。登録不要・基本無料。",
  alternates: { canonical: "/summarize" },
  openGraph: {
    title: "文章要約 | AIツール集",
    description: "長い文章・議事録・ニュースを3行や箇条書きにAIが瞬時に要約。登録不要・基本無料。",
    url: "/summarize",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
