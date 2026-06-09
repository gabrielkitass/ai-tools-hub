#!/usr/bin/env node
/**
 * SEO記事�E動生成スクリプト
 * 使ぁE��: node scripts/generate-articles.mjs [slug]
 * 侁E node scripts/generate-articles.mjs all         ↁE全記事生戁E *     node scripts/generate-articles.mjs muryou-ai-tool-matome ↁE1記事だけ生戁E */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KEYWORDS_FILE = path.join(__dirname, "keywords.json");
const OUTPUT_DIR = path.join(__dirname, "../content/articles");
const API_KEY = process.env.ANTHROPIC_API_KEY;

if (!API_KEY) {
  console.error("❁EANTHROPIC_API_KEY が設定されてぁE��せん");
  console.error("   export ANTHROPIC_API_KEY=your_key_here を実行してください");
  process.exit(1);
}

const keywords = JSON.parse(fs.readFileSync(KEYWORDS_FILE, "utf-8"));

async function generateArticle(kw) {
  console.log(`\n📝 生�E中: ${kw.title}`);

  const prompt = `あなた�ESEOに詳しい日本語ライターです、E以下�E条件でブログ記事を書ぁE��ください、E
【キーワード、E{kw.keyword}
【タイトル、E{kw.title}
【カチE��リ、E{kw.category}
【概要、E{kw.description}

【記事�E要件、E- 斁E��数: 1500、E500孁E- 読老E 中小企業の経営老E�E管琁E�E・製造業の拁E��老E- 口調: 丁寧でわかりやすく、専門用語�E少なめE- 構�E: h2見�EぁE、Eつ、各見�Eし下に400字程度の本斁E- 最後に「まとめ」セクションを�Eれる
- 記事�E中で自然に「このサイト�EAIチE�Eルを試してほしい」とぁE��冁E��を含める�E�押し付けがましくなぁE��度に�E�E
【�E力形式、EMarkdownで出力してください。frontmatterは不要です。見�EしとチE��スト�Eみ。`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
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
  console.log(`   ✁E保孁E content/articles/${kw.slug}.md`);
  return outPath;
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const target = process.argv[2] || "all";

  const targets = target === "all"
    ? keywords
    : keywords.filter(k => k.slug === target);

  if (targets.length === 0) {
    console.error(`❁Eslug "${target}" が見つかりません`);
    process.exit(1);
  }

  console.log(`🚀 ${targets.length}件の記事を生�Eします`);

  for (const kw of targets) {
    try {
      await generateArticle(kw);
      // API レート制限を避けるため1秒征E��E      if (targets.length > 1) await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.error(`   ❁E失敁E ${kw.slug}`, e.message);
    }
  }

  console.log("\n🎉 完亁E��次のスチE��チE");
  console.log("   npm run dev でローカル確誁EↁEgit push でVercelに自動デプロイ");
}

main();
