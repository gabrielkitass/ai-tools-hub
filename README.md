# AIツール集サイト

無料AIツール集 + AIレポート自動生成サービス

## ローカル起動

```bash
npm install
npm run dev
```
http://localhost:3000 で確認

## Vercelデプロイ手順

### 1. GitHubにアップロード
1. https://github.com/new でリポジトリ作成（例: ai-tools-hub）
2. このフォルダをプッシュ

### 2. Vercelで設定
1. https://vercel.com → New Project → GitHubリポジトリを選択
2. Environment Variables に追加:
   - Key: ANTHROPIC_API_KEY
   - Value: Anthropic APIキー（https://console.anthropic.com から取得）
3. Deploy クリック

### 3. Google AdSense（広告収入）
- https://adsense.google.com でアカウント申請
- 審査通過後 app/components/AdBanner.tsx にAdSenseコードを貼る

## ページ一覧
- / : トップページ
- /report : AIレポート自動生成
- /summarize : 文章要約
- /translate : 多言語翻訳
- /chat : AIチャット
- /idea : アイデア出し
- /writing : 文章リライト
- /email : メール文面作成
- /seo : SEOタイトル生成
