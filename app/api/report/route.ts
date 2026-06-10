import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { data, reportType, companyName } = await req.json();

  if (!data) return NextResponse.json({ error: "データが必要です" }, { status: 400 });

  const company = companyName || "（社名未記入）";

  const SYSTEM = `あなたは大手コンサルティングファーム出身のシニアビジネスアナリストです。経営層に提出するレポートを作成します。

【品質の鉄則】
- 与えられたデータの実数値を必ず引用し、具体的な数字で語る（「好調」ではなく「売上1,250万円・前月比+12%」）。
- 数値からインサイト（なぜそうなったか／何を意味するか）を導く。単なる数字の羅列や言い換えは禁止。
- 推測する場合は「データ上は〜と推測される」と明示し、断定と区別する。
- 一般論・抽象論・当たり障りのない表現を避け、このデータ固有の示唆を述べる。
- 推奨アクションは「誰が・何を・いつまでに」が分かる粒度で、優先度（高/中/低）を付ける。
- 可能な指標は前月比・達成率・構成比などを自分で計算して補足する。
- 出力はMarkdownのみ。前置きや「承知しました」等の挨拶は書かない。`;

  const prompts: Record<string, string> = {
    weekly: `次のデータから、${company}の週次レポートを作成してください。

# データ
${data}

# 構成（この見出し構成を厳守）
## 週次レポート
### 1. 今週のハイライト（3点・各1行）
### 2. 主要指標サマリー（表形式：指標 / 実績 / 前週比 / コメント）
### 3. トレンド分析（数値の背景にある要因を考察）
### 4. 注目点・懸念事項（リスクとその影響度）
### 5. 来週のアクションプラン（優先度・担当の粒度・期限）`,

    monthly: `次のデータから、${company}の経営層向け月次レポートを作成してください。

# データ
${data}

# 構成（この見出し構成を厳守）
## 月次経営レポート
### 1. エグゼクティブサマリー（最重要の示唆を3行以内で）
### 2. KPI達成状況（表形式：KPI / 実績 / 目標 / 達成率 / 評価）
### 3. 売上・コスト分析（構成・効率・前月比を数値で）
### 4. リスクと機会（各2〜3点、影響度と対応方針）
### 5. 翌月の重点施策（優先度付き・期待効果も明記）`,

    custom: `次のデータを分析し、${company}向けの最適なビジネスレポートを作成してください。

# データ
${data}

# 指示
- データの性質を見極め、最も価値が伝わる見出し構成を自分で設計する。
- 重要指標は表形式で整理し、トレンドと示唆、優先度付きの推奨アクションを必ず含める。`,
  };

  const prompt = prompts[reportType] || prompts.custom;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "サーバー設定エラー（APIキー未設定）" }, { status: 500 });
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      system: SYSTEM,
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
