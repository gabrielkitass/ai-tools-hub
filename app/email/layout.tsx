import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "メール文面作成",
  description: "状況を入力するだけでビジネスメールの文面をAIが自動作成。登録不要・基本無料。",
  alternates: { canonical: "/email" },
  openGraph: {
    title: "メール文面作成 | Work AI Hub",
    description: "状況を入力するだけでビジネスメールの文面をAIが自動作成。登録不要・基本無料。",
    url: "/email",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
