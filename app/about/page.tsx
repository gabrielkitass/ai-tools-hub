import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "運営者情報",
  description: "AI Tools Hub の運営者情報・サービス概要。提供するAIツールと運営方針について記載しています。",
  alternates: { canonical: "/about" },
};

const TOOLS = [
  "AIレポート自動生成",
  "文章要約",
  "多言語翻訳",
  "AIチャット",
  "アイデア出し",
  "文章リライト・校正",
  "ビジネスメール作成",
  "SEOタイトル・見出し生成",
];

export default function AboutPage() {
  return (
    <LegalLayout title="運営者情報" updated="2025年6月">
      <LegalSection title="サービス概要">
        <p style={{ margin: 0 }}>
          AI Tools Hub は、登録不要・基本無料で使える日本語対応のAIツール集です。Anthropic 社のAIモデル「Claude」を活用し、レポート作成・要約・翻訳・文章校正など、日々の業務やコンテンツ制作を効率化するツールをまとめて提供しています。
        </p>
      </LegalSection>

      <LegalSection title="提供サービス">
        <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
          {TOOLS.map(t => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection title="運営方針">
        <p style={{ margin: 0 }}>
          ユーザーが安心して利用できることを第一に、以下の方針でサービスを運営しています。
        </p>
        <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem" }}>
          <li>入力内容・生成結果を当サービスのサーバーに保存しません。</li>
          <li>アカウント登録なしで、すべてのツールをすぐに利用できます。</li>
          <li>日本語での自然な入出力に対応しています。</li>
          <li>継続的に機能の追加・改善を行っています。</li>
        </ul>
      </LegalSection>

      <LegalSection title="運営者情報">
        <p style={{ margin: 0 }}>
          サービス名: AI Tools Hub<br />
          運営形態: 個人運営
        </p>
      </LegalSection>

      <LegalSection title="関連ページ">
        <p style={{ margin: 0 }}>
          <a href="/privacy" style={{ color: "var(--accent2)" }}>プライバシーポリシー</a>
          {" / "}
          <a href="/terms" style={{ color: "var(--accent2)" }}>利用規約</a>
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
