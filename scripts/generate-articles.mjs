#!/usr/bin/env node
/**
 * SEO記事自動生成スクリプト
 * 使い方: node scripts/generate-articles.mjs [slug]
 * 例: node scripts/generate-articles.mjs all         → 全記事生成
 *     node scripts/generate-articles.mjs muryou-ai-tool-matome → 1記事だけ生成
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KEYWORDS_FILE = path.join(__dirname, "keywords.json");
const OUTPUT_DIR = path.join(__dirname, "../content/articles");
const API_KEY = process.env.ANTHROPIC_API_KEY;

if (!API_KEY) {
  console.error("❌ ANTHROPIC_API_KEY が設定されていません");
  console.error("   export ANTHROPIC_API_KEY=your_key_here を実行してください");
  process.exit(1);
}

const keywords = JSON.parse(fs.readFileSync(KEYWORDS_FILE, "utf-8"));

async function generateArticle(kw) {
  console.log(`\n📝 生成中: ${kw.title}`);

  const prompt = `あなたはSEOに詳しい日本語ライターです。
以下の条件でブログ記事を書いてください。

【キーワード】${kw.keyword}
【タイトル】${kw.title}
【カテゴリ】${kw.category}
【概要】${kw.description}

【記事の要件】
- 文字数: 1500〜2500字
- 読者: 中小企業の経営者・管理職・製造業の担当者
- 口調: 丁寧でわかりやすく、専門用語は少なめ
- 構成: h2見出し3〜4つ、各見出し下に400字程度の本文
- 最後に「まとめ」セクションを入れる
- 記事の中で自然に「このサイトのAIツールを試してほしい」という内容を含める（押し付けがましくない程度に）

【出力形式】
Markdownで出力してください。frontmatterは不要です。見出しとテキストのみ。`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 3000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API Error: ${err}`);
  }

  const data = await res.json();
  const content = data.content?.[0]?.text || "";

  // frontmatterを付けてファイルに保存
  const now = new Date().toISOString().split("T")[0];
  const mdContent = `---
title: "${kw.title}"
slug: "${kw.slug}"
keyword: "${kw.keyword}"
category: "${kw.category}"
description: "${kw.description}"
date: "${now}"
---

${content}`;

  const outPath = path.join(OUTPUT_DIR, `${kw.slug}.md`);
  fs.writeFileSync(outPath, mdContent, "utf-8");
  console.log(`   ✅ 保存: content/articles/${kw.slug}.md`);
  return outPath;
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const target = process.argv[2] || "all";

  const targets = target === "all"
    ? keywords
    : keywords.filter(k => k.slug === target);

  if (targets.length === 0) {
    console.error(`❌ slug "${target}" が見つかりません`);
    process.exit(1);
  }

  console.log(`🚀 ${targets.length}件の記事を生成します`);

  for (const kw of targets) {
    try {
      await generateArticle(kw);
      // API レート制限を避けるため1秒待機
      if (targets.length > 1) await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.error(`   ❌ 失敗: ${kw.slug}`, e.message);
    }
  }

  console.log("\n🎉 完了！次のステップ:");
  console.log("   npm run dev でローカル確認 → git push でVercelに自動デプロイ");
}

main();
