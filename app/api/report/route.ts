import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { data, reportType, companyName } = await req.json();

  if (!data) return NextResponse.json({ error: "データが必要です" }, { status: 400 });

  const prompts: Record<string, string> = {
    weekly: `あなたは優秀なビジネスアナリストです。以下のデータをもとに、わかりやすい週次レポートを作成してください。
会社名: ${companyName || "（未記入）"}
データ:
${data}

以下の形式でMarkdownレポートを作成してください：
## 週次レポート
### 主要指標サマリー
### 先週との比較・トレンド分析
### 注目すべき点・懸念事項
### 来週に向けた推奨アクション`,

    monthly: `あなたは優秀なビジネスアナリストです。以下のデータをもとに、経営層向けの月次レポートを作成してください。
会社名: ${companyName || "（未記入）"}
データ:
${data}

以下の形式でMarkdownレポートを作成してください：
## 月次経営レポート
### エグゼクティブサマリー（3行以内）
### KPI達成状況
### 売上・コスト分析
### リスクと機会
### 翌月の重点施策`,

    custom: `あなたは優秀なビジネスアナリストです。以下のデータをもとに、プロフェッショナルなビジネスレポートを作成してください。
会社名: ${companyName || "（未記入）"}
データ:
${data}

データの内容を分析し、最も適切な形式でMarkdownレポートを作成してください。
重要な指標、トレンド、推奨アクションを含めてください。`,
  };

  const prompt = prompts[reportType] || prompts.custom;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "AI生成に失敗しました" }, { status: 500 });
  }

  const result = await response.json();
  const text = result.content?.find((b: { type: string }) => b.type === "text")?.text || "";

  return NextResponse.json({ report: text });
}
