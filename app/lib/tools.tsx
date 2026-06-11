import type { ComponentType } from "react";
import type { IconProps } from "../components/icons/types";
import IconReport from "../components/icons/IconReport";
import IconSummarize from "../components/icons/IconSummarize";
import IconTranslate from "../components/icons/IconTranslate";
import IconChat from "../components/icons/IconChat";
import IconIdea from "../components/icons/IconIdea";
import IconWriting from "../components/icons/IconWriting";
import IconEmail from "../components/icons/IconEmail";
import IconSeo from "../components/icons/IconSeo";

export type Tool = {
  href: string;
  icon: ComponentType<IconProps>;
  title: string;
  description: string;
  badge?: string;
  color: string;
};

export const TOOLS: Tool[] = [
  { href: "/report",    icon: IconReport,    title: "AIレポート自動生成",      description: "CSV・データを貼るだけで経営報告書・週報を自動作成",    badge: "人気No.1", color: "#7c6dfa" },
  { href: "/summarize", icon: IconSummarize, title: "文章要約",                description: "長い文章を3行・箇条書きに瞬時に要約",                    color: "#06b6d4" },
  { href: "/translate", icon: IconTranslate, title: "多言語翻訳",              description: "日→英・ポルトガル語・ベトナム語など10言語対応",           color: "#10b981" },
  { href: "/chat",      icon: IconChat,      title: "AIチャット",              description: "何でも聞けるAIアシスタント（日本語対応）",                color: "#f59e0b" },
  { href: "/idea",      icon: IconIdea,      title: "アイデア出し",            description: "テーマを入力するだけで企画・キャッチコピーを生成",        color: "#ec4899" },
  { href: "/writing",   icon: IconWriting,   title: "文章リライト・校正",      description: "ビジネス文書・メールを自然な日本語に整える",              color: "#8b5cf6" },
  { href: "/email",     icon: IconEmail,     title: "メール文面作成",          description: "状況を入力するだけでプロのメール文面を自動生成",          color: "#f97316" },
  { href: "/seo",       icon: IconSeo,       title: "SEOタイトル・見出し生成", description: "キーワードから検索上位を狙えるタイトルを自動生成",        color: "#14b8a6" },
];

// 表示用の初期評価シード（社会的証明）。ユーザー評価とブレンドして平均を算出
export const TOOL_SEEDS: Record<string, { avg: number; count: number }> = {
  "/report":    { avg: 4.8, count: 312 },
  "/summarize": { avg: 4.6, count: 198 },
  "/translate": { avg: 4.7, count: 256 },
  "/chat":      { avg: 4.5, count: 173 },
  "/idea":      { avg: 4.4, count: 121 },
  "/writing":   { avg: 4.6, count: 144 },
  "/email":     { avg: 4.7, count: 167 },
  "/seo":       { avg: 4.3, count: 98 },
};

export function getTool(href: string): Tool | undefined {
  return TOOLS.find(t => t.href === href);
}
