import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Supabase 未設定" }, { status: 500 });
  }

  let tool: string | null = null;
  try {
    const body = await req.json();
    if (typeof body?.tool === "string") tool = body.tool;
  } catch {
    /* no/invalid body — increment without tool */
  }

  try {
    const res = await fetch(`${url}/rest/v1/rpc/increment_usage`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ p_tool: tool }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "カウント更新に失敗しました" }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "通信エラーが発生しました" }, { status: 500 });
  }
}
