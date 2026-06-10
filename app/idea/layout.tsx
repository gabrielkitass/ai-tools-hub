import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "アイデア出し",
  description: "テーマを入力するだけで企画・キャッチコピー・新規事業のアイデアをAIが提案。登録不要・完全無料。",
  alternates: { canonical: "/idea" },
  openGraph: {
    title: "アイデア出し | AIツール集",
    description: "テーマを入力するだけで企画・キャッチコピー・新規事業のアイデアをAIが提案。登録不要・完全無料。",
    url: "/idea",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
