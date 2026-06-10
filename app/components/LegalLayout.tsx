import Nav from "./Nav";
import Footer from "./Footer";

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2 style={{
        fontSize: 18, fontWeight: 800, margin: "0 0 0.75rem",
        letterSpacing: "-0.01em", color: "var(--text)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ width: 4, height: 18, borderRadius: 2, background: "linear-gradient(180deg, var(--accent), #c084fc)" }} />
        {title}
      </h2>
      <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.9 }}>
        {children}
      </div>
    </section>
  );
}

export default function LegalLayout({
  title, updated, children,
}: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="grid-bg" style={{ minHeight: "100vh" }}>
      <Nav />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        <h1 style={{ fontSize: 30, fontWeight: 900, margin: "0 0 0.5rem", letterSpacing: "-0.02em" }}>
          {title}
        </h1>
        <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 2.5rem" }}>
          制定日: {updated}
        </p>

        <div style={{
          background: "var(--bg2)", border: "1px solid var(--border)",
          borderRadius: 16, padding: "2rem 2rem 1rem",
        }}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
