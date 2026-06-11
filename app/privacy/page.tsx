import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "AI Tools Hub のプライバシーポリシー。取得する情報、利用目的、Google AdSense・Cookieの取り扱いについて記載しています。",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="プライバシーポリシー" updated="2025年6月">
      <LegalSection title="運営者情報">
        <p style={{ margin: 0 }}>
          サービス名: AI Tools Hub<br />
          連絡先: <a href="mailto:gabkitass716@gmail.com" style={{ color: "var(--accent2)" }}>gabkitass716@gmail.com</a>
        </p>
      </LegalSection>

      <LegalSection title="AIサービスへのデータ送信について">
        <p style={{ margin: 0 }}>
          当サービスの各AIツールでは、ユーザーが入力した内容をAIによる処理のため、Anthropic, PBC が提供するAIサービス「Claude」のAPIに送信します。
        </p>
        <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem" }}>
          <li>入力内容はAIの応答を生成する目的でのみ送信されます。</li>
          <li>入力内容および生成結果を当サービスのサーバーに保存することはありません。</li>
          <li>送信先であるAnthropicでの取り扱いは <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent2)" }}>Anthropic プライバシーポリシー</a> をご確認ください。</li>
        </ul>
        <p style={{ margin: "0.75rem 0 0" }}>
          機密情報・個人情報・社外秘データなど、第三者に送信されては困る情報は入力しないでください。入力は利用者ご自身の責任において行っていただきますようお願いいたします。
        </p>
      </LegalSection>

      <LegalSection title="取得する情報">
        <p style={{ margin: 0 }}>
          当サービスでは、サービスの提供・改善のために以下の情報を取得する場合があります。
        </p>
        <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem" }}>
          <li>アクセスログ（IPアドレス、ブラウザの種類、参照元、アクセス日時など）</li>
          <li>Cookie（クッキー）情報</li>
          <li>Google Analytics による利用状況データ</li>
        </ul>
      </LegalSection>

      <LegalSection title="情報の利用目的">
        <p style={{ margin: 0 }}>取得した情報は、以下の目的で利用します。</p>
        <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem" }}>
          <li>サービスの提供・維持・改善のため</li>
          <li>利用状況の分析およびコンテンツの最適化のため</li>
          <li>不正利用の防止およびセキュリティ確保のため</li>
          <li>お問い合わせへの対応のため</li>
        </ul>
      </LegalSection>

      <LegalSection title="Google Analytics について">
        <p style={{ margin: 0 }}>
          当サービスでは、アクセス解析ツール「Google Analytics」を利用しています。Google Analytics はトラフィックデータの収集のために Cookie を使用します。このデータは匿名で収集されており、個人を特定するものではありません。Cookie を無効にすることで収集を拒否できますので、ブラウザの設定をご確認ください。
        </p>
      </LegalSection>

      <LegalSection title="Google AdSense による広告配信">
        <p style={{ margin: 0 }}>
          当サービスでは、第三者配信の広告サービス「Google AdSense」を利用しています。広告配信事業者は、ユーザーの興味に応じた広告を表示するために Cookie を使用することがあります。Cookie を使用することで、当サービスや他サイトへの過去のアクセス情報に基づいて広告を配信します。
        </p>
        <p style={{ margin: "0.75rem 0 0" }}>
          ユーザーは <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent2)" }}>広告設定</a> で、パーソナライズ広告を無効にできます。また、<a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent2)" }}>www.aboutads.info</a> で第三者配信事業者の Cookie を無効にできます。
        </p>
      </LegalSection>

      <LegalSection title="第三者提供について">
        <p style={{ margin: 0 }}>
          当サービスは、法令に基づく場合を除き、ご本人の同意なく取得した情報を第三者に提供することはありません。ただし、上記の Google Analytics および Google AdSense など、サービス運営に必要な範囲で外部サービスを利用する場合があります。
        </p>
      </LegalSection>

      <LegalSection title="お問い合わせ先">
        <p style={{ margin: 0 }}>
          本ポリシーに関するお問い合わせは、以下の連絡先までお願いいたします。<br />
          <a href="mailto:gabkitass716@gmail.com" style={{ color: "var(--accent2)" }}>gabkitass716@gmail.com</a>
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
