import { getAllArticles } from "@/lib/articles";
import Nav from "../components/Nav";
import AdBanner from "../components/AdBanner";
import Link from "next/link";
import { BookOpen, Tag } from "lucide-react";

export const metadata = {
  title: "AIツール活用ガイド | AIツール集ブログ",
  description: "AI・業務効率化・製造業のDXに関する実践的な情報を発信。無料AIツールの使い方・活用事例を詳しく解説。",
};

const CATEGORY_COLORS: Record<string, string> = {
  "レポート生成": "#7c6dfa",
  "製造業": "#10b981",
  "AIツール": "#06b6d4",
  "多言語・教育": "#f59e0b",
  "業務効率化": "#ec4899",
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Nav />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2.5rem 1.5rem" }}>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2rem" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(124,109,250,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BookOpen size={24} color="var(--accent)" />
          </div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>AIツール活用ガイド</h1>
            <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>業務効率化・AI活用の実践情報</p>
          </div>
        </div>

        <AdBanner size="leaderboard" />

        {articles.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--muted)" }}>
            <BookOpen size={48} style={{ opacity: 0.3, marginBottom: "1rem" }} />
            <p style={{ fontSize: 16 }}>記事を生成中です...</p>
            <p style={{ fontSize: 13, marginTop: 8 }}>
              <code style={{ background: "var(--bg3)", padding: "2px 8px", borderRadius: 4 }}>
                node scripts/generate-articles.mjs all
              </code> を実行して記事を生成してください
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 16, marginTop: "1.5rem" }}>
            {articles.map((article, i) => {
              const color = CATEGORY_COLORS[article.category] || "var(--accent)";
              return (
                <Link key={article.slug} href={`/blog/${article.slug}`} style={{ textDecoration: "none" }}>
                  <div className="blog-card" style={{
                    background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.25rem",
                    transition: "border-color 0.2s, transform 0.2s",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 11, background: `${color}22`, color, padding: "2px 10px", borderRadius: 99, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                        <Tag size={11} />{article.category}
                      </span>
                      <span style={{ fontSize: 12, color: "var(--muted)" }}>{article.date}</span>
                      {i === 0 && <span style={{ fontSize: 11, background: "rgba(124,109,250,0.2)", color: "var(--accent2)", padding: "2px 10px", borderRadius: 99 }}>最新</span>}
                    </div>
                    <h2 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 6px", color: "var(--text)", lineHeight: 1.4 }}>{article.title}</h2>
                    <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>{article.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <AdBanner size="leaderboard" />
      </div>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "1.5rem", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
        © 2025 AIツール集
      </footer>
    </div>
  );
}
