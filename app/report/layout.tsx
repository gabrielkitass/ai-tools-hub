import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIレポート自動生成（無料）",
  description: "CSV・売上データを貼るだけで、経営報告書・週次レポートをAIが自動作成。登録不要・基本無料。",
  alternates: { canonical: "/report" },
  openGraph: {
    title: "AIレポート自動生成（無料） | AIツール集",
    description: "CSV・売上データを貼るだけで、経営報告書・週次レポートをAIが自動作成。登録不要・基本無料。",
    url: "/report",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
