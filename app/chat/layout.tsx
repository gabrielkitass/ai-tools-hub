import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIチャット",
  description: "何でも質問できる日本語対応のAIチャットアシスタント。登録不要・基本無料。",
  alternates: { canonical: "/chat" },
  openGraph: {
    title: "AIチャット | Work AI Hub",
    description: "何でも質問できる日本語対応のAIチャットアシスタント。登録不要・基本無料。",
    url: "/chat",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
