#!/usr/bin/env node
/**
 * fal.ai image generation script
 * Usage: node scripts/generate-images.mjs
 * Generates 30 images and saves URLs to scripts/image-results.json
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FAL_KEY = process.env.FAL_KEY;

if (!FAL_KEY) {
  console.error("❌ FAL_KEY が設定されていません");
  console.error("   $env:FAL_KEY='your_key_here' を実行してください");
  process.exit(1);
}

const PAGES = [
  {
    id: "37a7b012-9cc6-810e-b71b-c898c9540257",
    prompt: "Bold black background with electric purple accent lines, dramatic light beams, minimalist business concept, no text, 1200x675 social media banner, professional modern design"
  },
  {
    id: "37a7b012-9cc6-81f6-bd2f-ecf71bd8294f",
    prompt: "Clean white background infographic style layout, five glowing icons connected by lines, purple accent #7c6dfa, modern flat design, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-8107-863a-ea1c0cb11a04",
    prompt: "Deep navy blue background, dramatic cost reduction visual, sharp diagonal lines, dollar sign dissolving into particles, gold accent, no text, 1200x675 banner"
  },
  {
    id: "37a7b012-9cc6-81f7-85f0-e8aecdd16056",
    prompt: "Orange to black gradient background, email envelope with speed lines, dynamic motion blur effect, warm vibrant energy, no text, 1200x675 social banner"
  },
  {
    id: "37a7b012-9cc6-81fb-9492-d275fe095175",
    prompt: "Industrial blue and grey background, factory silhouette with glowing AI circuit overlay, manufacturing meets technology aesthetic, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-8185-a825-f6e94fa392cf",
    prompt: "Clean white minimalist background, single floating smartphone with soft purple glow, first-time user experience feel, gentle shadow, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-8178-8dc5-d48bc3f8e21a",
    prompt: "Black sharp angular background, document transforming into lightning bolt, dramatic time compression visual, neon purple accent, no text, 1200x675 banner"
  },
  {
    id: "37a7b012-9cc6-8119-a55e-eee0b17a783e",
    prompt: "Yellow to orange gradient background, sunrise energy morning concept, calendar with glowing Monday highlight, productivity and optimism, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-81ea-af7a-c2c9d2c2fa22",
    prompt: "Split screen design, left side green ChatGPT color vs right side purple Claude color, VS battle concept, clean comparison layout, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-817c-bbbe-d7c076c85130",
    prompt: "Grey and navy blue professional background, monthly report document with data charts, corporate business aesthetic, clean lines, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-81e9-be84-e083e92835ee",
    prompt: "Deep navy background, executive silhouette with automation gears reducing burden, leadership and efficiency concept, no text, 1200x675 banner"
  },
  {
    id: "37a7b012-9cc6-81cd-b46f-efd74dabd36d",
    prompt: "Orange and white background, diverse hands together team concept, multilingual communication bubbles, warm welcoming tone, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-81af-b312-e60f55470334",
    prompt: "White background with clean flowchart diagram, step by step process arrows in purple, training manual visual, organized and clear, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-8165-b582-f34e3ba5fe5d",
    prompt: "Bright blue and white background, three glowing steps connected upward, staircase of progress concept, optimistic and clear, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-81db-922d-dd996832e813",
    prompt: "White background, person with surprised expression replaced by abstract happy burst, first AI experience emotion, soft colors, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-81a3-bff8-d932ef1094b8",
    prompt: "Deep purple background, meeting table from above with glowing AI orb in center, brainstorming energy, dramatic lighting, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-8123-8922-d1d3d764fadf",
    prompt: "Sky blue gradient background, horizontal timeline with glowing checkpoints, ten steps visual journey, airy and informative, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-8105-993b-f575b6057a61",
    prompt: "Orange and white vibrant background, job posting document with magnifying glass, recruitment and hiring concept, energetic, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-8179-af5e-f09fb39a2160",
    prompt: "Pink and white gradient background, social media icons with speed transformation arrows, content creation acceleration, playful modern, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-81fe-8f35-ce868c1629a5",
    prompt: "White infographic background, eight glowing tool icons in grid layout, free tools showcase, clean and informative, purple accents, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-817a-b74f-f0d09e9a8faf",
    prompt: "Navy to sunrise gradient background, before and after time comparison, overtime reduction dramatic visual, hopeful transformation, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-810a-81b0-ebe78796d27d",
    prompt: "Industrial grey and blue background, quality report document with factory machinery silhouette, professional manufacturing aesthetic, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-81ad-8a1f-e73aacc034e0",
    prompt: "White background, weekly calendar grid with colorful icons for each day, organized productivity visual, clean and functional, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-81c2-a58d-dc5d35d447f8",
    prompt: "White and green background, accounting calculator and coins with upward arrow, financial efficiency concept, professional and clean, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-8120-9726-ecc2c2be6874",
    prompt: "Black background with gold accent, large annual savings number concept, wealth and efficiency, luxury business aesthetic, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-8174-8381-fe3d34781a5e",
    prompt: "Green and white vibrant background, three glowing tool icons ready to use, actionable and inviting, no text, 1200x675 banner"
  },
  {
    id: "37a7b012-9cc6-8149-8ef9-e6075152af69",
    prompt: "Black to deep navy gradient background, presentation screen with audience silhouettes, dramatic stage lighting, professional and impressive, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-8150-9ffa-d78685a858e9",
    prompt: "Blue and white global concept background, translation document with world map overlay, multilingual and international, clean professional, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-8182-bef1-dbe452063168",
    prompt: "Black and gold background, hourglass with time savings visualization, dramatic time value concept, premium aesthetic, no text, 1200x675"
  },
  {
    id: "37a7b012-9cc6-819c-9e71-e647169eb8d9",
    prompt: "White minimalist background, habit streak calendar with soft purple check marks, consistency and daily routine concept, calm and motivating, no text, 1200x675"
  }
];

async function generateImage(page, index) {
  console.log(`🎨 [${index + 1}/30] 生成中...`);

  const res = await fetch("https://fal.run/fal-ai/flux/schnell", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Key ${FAL_KEY}`
    },
    body: JSON.stringify({
      prompt: page.prompt,
      image_size: { width: 1200, height: 675 },
      num_images: 1,
      num_inference_steps: 4
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`fal.ai API Error: ${err}`);
  }

  const data = await res.json();
  const imageUrl = data.images?.[0]?.url;

  if (!imageUrl) throw new Error("No image URL in response");

  console.log(`   ✅ 完了: ${imageUrl.substring(0, 60)}...`);
  return { id: page.id, url: imageUrl };
}

async function main() {
  const results = [];
  const outPath = path.join(__dirname, "image-results.json");

  console.log("🚀 30枚の画像を生成します\n");

  for (let i = 0; i < PAGES.length; i++) {
    try {
      const result = await generateImage(PAGES[i], i);
      results.push(result);
      fs.writeFileSync(outPath, JSON.stringify(results, null, 2), "utf-8");
      if (i < PAGES.length - 1) await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      console.error(`   ❌ 失敗: ${PAGES[i].id}`, e.message);
      results.push({ id: PAGES[i].id, url: null, error: e.message });
      fs.writeFileSync(outPath, JSON.stringify(results, null, 2), "utf-8");
    }
  }

  const success = results.filter(r => r.url).length;
  console.log(`\n🎉 完了: ${success}/30 枚生成成功`);
  console.log(`   結果: scripts/image-results.json`);
}

main();
