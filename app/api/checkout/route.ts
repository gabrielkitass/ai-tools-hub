import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!secretKey || !priceId) {
    return NextResponse.json(
      { error: "決済設定が未完了です（STRIPE_SECRET_KEY / STRIPE_PRICE_ID 未設定）" },
      { status: 500 }
    );
  }

  const origin =
    req.headers.get("origin") ||
    `https://${req.headers.get("host") || "ai-tools-hub-gules.vercel.app"}`;

  const params = new URLSearchParams();
  params.set("mode", "subscription");
  params.set("line_items[0][price]", priceId);
  params.set("line_items[0][quantity]", "1");
  params.set("success_url", `${origin}/report?premium=success`);
  params.set("cancel_url", `${origin}/report?premium=cancel`);
  params.set("allow_promotion_codes", "true");
  params.set("locale", "ja");

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const session = await response.json();

  if (!response.ok || !session.url) {
    return NextResponse.json({ error: "決済の開始に失敗しました" }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
