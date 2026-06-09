import { getArticle, getAllArticles, parseMarkdown } from "@/lib/articles";
import Nav from "../../components/Nav";
import AdBanner from "../../components/AdBanner";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Tag, Calendar } from "lucide-react";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: article.keyword,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  "レポート生成": "#7c6dfa",
  "製造業": "#10b981",
  "AIツール": "#06b6d4",
  "多言語・教育": "#f59e0b",
  "業務効率化": "#ec4899",
};

export default function ArticlePage({ params }: Props) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const color = CATEGORY_COLORS[article.category] || "var(--accent)";
  const html = parseMarkdown(article.content);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Nav />
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>

        <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--muted)", textDecoration: "none", fontSize: 13, marginBottom: "1.5rem" }}>
          <ArrowLeft size={14} /> 記事一覧に戻る
        </Link>

        <AdBanner size="banner" />

        <div style={{ marginTop: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
            <span style={{ fontSize: 12, background: `${color}22`, color, padding: "3px 12px", borderRadius: 99, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
              <Tag size={11} />{article.category}
            </span>
            <span style={{ fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 4 }}>
              <Calendar size={12} />{article.date}
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(1.4rem,4vw,2rem)", fontWeight: 700, lineHeight: 1.4, marginBottom: "1.5rem", color: "var(--text)" }}>
            {article.title}
          </h1>

          {/* 記事本文 */}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        <AdBanner size="rectangle" />

        {/* CTA */}
        <div style={{ background: "var(--bg2)", border: "1px solid rgba(124,109,250,0.3)", borderRadius: 14, padding: "2rem", marginTop: "2rem", textAlign: "center" }}>
          <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>実際にAIツールを試してみませんか？</p>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: "1.25rem" }}>登録不要・完全無料でレポート生成や翻訳ツールをすぐ使えます</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/report" style={{ background: "var(--accent)", color: "#fff", padding: "10px 22px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
              AIレポート生成を試す →
            </Link>
            <Link href="/" style={{ background: "var(--bg3)", color: "var(--text)", padding: "10px 22px", borderRadius: 8, textDecoration: "none", fontSize: 14, border: "1px solid var(--border)" }}>
              全ツールを見る
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        .article-body { color: var(--text); line-height: 1.9; font-size: 16px; }
        .article-body h2 { font-size: 22px; font-weight: 700; margin: 2rem 0 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border); }
        .article-body h3 { font-size: 18px; font-weight: 600; margin: 1.5rem 0 0.75rem; color: var(--accent2); }
        .article-body p { margin: 0.75rem 0; }
        .article-body ul { padding-left: 1.5rem; margin: 0.75rem 0; }
        .article-body li { margin: 0.4rem 0; color: #c4c3e0; }
        .article-body strong { color: var(--text); font-weight: 600; }
      `}</style>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "1.5rem", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
        © 2025 AIツール集
      </footer>
    </div>
  );
}
