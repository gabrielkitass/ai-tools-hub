import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "利用規約 | AI Tools Hub",
  description: "AI Tools Hub の利用規約。サービスの概要、利用条件、禁止事項、免責事項などについて記載しています。",
};

export default function TermsPage() {
  return (
    <LegalLayout title="利用規約" updated="2025年6月">
      <LegalSection title="サービスの概要">
        <p style={{ margin: 0 }}>
          AI Tools Hub（以下「当サービス」）は、AI を活用したレポート生成・文章要約・翻訳・アイデア出しなどの各種ツールを無料で提供する Web サービスです。本規約は、当サービスの利用に関する条件を定めるものです。利用者は、当サービスを利用することで本規約に同意したものとみなされます。
        </p>
      </LegalSection>

      <LegalSection title="利用条件">
        <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
          <li>当サービスは、アカウント登録不要で無料でご利用いただけます。</li>
          <li>一部の機能には、月間の利用回数など一定の制限が設けられる場合があります。</li>
          <li>利用者は、自己の責任において当サービスを利用するものとします。</li>
        </ul>
      </LegalSection>

      <LegalSection title="禁止事項">
        <p style={{ margin: 0 }}>利用者は、当サービスの利用にあたり、以下の行為を行ってはなりません。</p>
        <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem" }}>
          <li>スパム目的の利用、または公序良俗に反する内容の入力・生成</li>
          <li>プログラム等を用いた自動的な大量アクセスや過度な負荷をかける行為</li>
          <li>当サービスのシステムやサーバーに不正にアクセスする行為</li>
          <li>法令または本規約に違反する行為</li>
          <li>第三者または当サービスの権利・利益を侵害する行為</li>
        </ul>
      </LegalSection>

      <LegalSection title="免責事項">
        <p style={{ margin: 0 }}>
          当サービスが提供する AI による生成コンテンツは、その正確性・完全性・有用性を保証するものではありません。生成された内容には誤りが含まれる可能性があるため、利用者はその内容を自己の責任において確認・判断のうえご利用ください。当サービスの利用により生じたいかなる損害についても、運営者は一切の責任を負いません。
        </p>
      </LegalSection>

      <LegalSection title="サービスの変更・停止">
        <p style={{ margin: 0 }}>
          運営者は、利用者への事前の通知なく、当サービスの内容を変更し、または提供を停止・中断することができるものとします。これにより利用者または第三者に生じた損害について、運営者は責任を負いません。
        </p>
      </LegalSection>

      <LegalSection title="準拠法・管轄">
        <p style={{ margin: 0 }}>
          本規約の解釈および適用は、日本法に準拠するものとします。当サービスに関して紛争が生じた場合には、運営者の所在地を管轄する裁判所を専属的合意管轄とします。
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
