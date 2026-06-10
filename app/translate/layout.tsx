import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "多言語翻訳",
  description: "日本語から英語・ポルトガル語・ベトナム語など多言語へAIが自然に翻訳。登録不要・完全無料。",
  alternates: { canonical: "/translate" },
  openGraph: {
    title: "多言語翻訳 | AIツール集",
    description: "日本語から英語・ポルトガル語・ベトナム語など多言語へAIが自然に翻訳。登録不要・完全無料。",
    url: "/translate",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
