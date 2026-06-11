import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "アイデア出し",
  description: "テーマを入力するだけで企画・キャッチコピー・新規事業のアイデアをAIが提案。登録不要・基本無料。",
  alternates: { canonical: "/idea" },
  openGraph: {
    title: "アイデア出し | Work AI Hub",
    description: "テーマを入力するだけで企画・キャッチコピー・新規事業のアイデアをAIが提案。登録不要・基本無料。",
    url: "/idea",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
