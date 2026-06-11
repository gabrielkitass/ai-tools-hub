import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "文章リライト・校正",
  description: "ビジネス文書・メールをAIが自然で読みやすい日本語に校正・リライト。登録不要・基本無料。",
  alternates: { canonical: "/writing" },
  openGraph: {
    title: "文章リライト・校正 | Work AI Hub",
    description: "ビジネス文書・メールをAIが自然で読みやすい日本語に校正・リライト。登録不要・基本無料。",
    url: "/writing",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
