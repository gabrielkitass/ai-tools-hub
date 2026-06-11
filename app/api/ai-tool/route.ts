import { NextRequest, NextResponse } from "next/server";

const MAX_INPUT_LENGTH = 12000;

export async function POST(req: NextRequest) {
  let body: { tool?: string; input?: string; options?: Record<string, string> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "リクエスト形式が不正です" }, { status: 400 });
  }
  const { tool, input, options } = body;

  if (typeof input !== "string" || !input.trim()) {
    return NextResponse.json({ error: "入力が空です" }, { status: 400 });
  }
  if (input.length > MAX_INPUT_LENGTH) {
    return NextResponse.json(
      { error: `入力が長すぎます（最大${MAX_INPUT_LENGTH.toLocaleString()}文字）` },
      { status: 400 },
    );
  }

  const systemPrompts: Record<string, string> = {
    summarize: "あなたは優秀な日本語の文章要約AIです。与えられたテキストを指定された形式で要約してください。",
    translate: "あなたは優秀な翻訳AIです。指定された言語に正確かつ自然に翻訳してください。",
    chat: "あなたは親切で知識豊富なAIアシスタントです。日本語で丁寧に回答してください。",
    idea: "あなたはクリエイティブなビジネスアイデアの専門家です。実用的かつ革新的なアイデアを提案してください。",
    writing: "あなたは日本語の文章校正・リライトの専門家です。自然で読みやすい文章に改善してください。",
    email: "あなたはビジネスメールの専門家です。状況に合った適切なメール文面を作成してください。",
    seo: "あなたはSEOの専門家です。検索上位を狙えるタイトルと見出しを提案してください。",
  };

  const userPrompts: Record<string, (i: string, o: Record<string, string>) => string> = {
    summarize: (i, o) => `以下の文章を${o.style === "bullets" ? "箇条書き5点" : "3行"}で要約してください:\n\n${i}`,
    translate: (i, o) => `以下のテキストを${o.lang || "英語"}に翻訳してください:\n\n${i}`,
    chat: (i) => i,
    idea: (i, o) => `テーマ:「${i}」に関して${o.count || "5"}つのアイデアを提案してください。各アイデアに実現可能性と期待効果も添えてください。`,
    writing: (i) => `以下の文章をビジネス向けに自然な日本語にリライト・校正してください:\n\n${i}`,
    email: (i) => `以下の状況に合ったビジネスメール文面を作成してください:\n\n${i}`,
    seo: (i) => `キーワード「${i}」でSEO効果の高いタイトル5案と主要見出し構成を提案してください。`,
  };

  const toolKey = typeof tool === "string" ? tool : "";
  const systemPrompt = systemPrompts[toolKey] || "あなたは優秀なAIアシスタントです。";
  const userPrompt = userPrompts[toolKey]?.(input, options || {}) || input;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "サーバー設定エラー（APIキー未設定）" }, { status: 500 });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const status = response.status === 429 ? 429 : 502;
      const error = status === 429
        ? "アクセスが集中しています。少し時間をおいて再度お試しください"
        : "AI生成に失敗しました";
      return NextResponse.json({ error }, { status });
    }

    const result = await response.json();
    const text = result.content?.find((b: { type: string }) => b.type === "text")?.text || "";
    return NextResponse.json({ result: text });
  } catch {
    return NextResponse.json({ error: "通信エラーが発生しました" }, { status: 502 });
  }
}
