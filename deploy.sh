#!/bin/bash
# ============================================
# ai-tools-hub デプロイスクリプト
# 使い方: bash deploy.sh
# ============================================

set -e  # エラーが出たら止まる

echo ""
echo "🚀 ai-tools-hub デプロイセットアップ"
echo "======================================"

# ── 1. 必要なツール確認 ──────────────────
echo ""
echo "📋 ステップ1: 必要なツールを確認中..."

if ! command -v git &> /dev/null; then
  echo "❌ git が見つかりません。インストールします..."
  sudo apt-get update -qq && sudo apt-get install -y git
fi

if ! command -v node &> /dev/null; then
  echo "❌ Node.js が見つかりません"
  echo "   fnm で Node.js をインストールしてください:"
  echo "   curl -fsSL https://fnm.vercel.app/install | bash"
  exit 1
fi

echo "✅ git: $(git --version)"
echo "✅ node: $(node --version)"

# ── 2. GitHub CLI インストール確認 ──────────
echo ""
echo "📋 ステップ2: GitHub CLI を確認中..."

if ! command -v gh &> /dev/null; then
  echo "⬇️  GitHub CLI をインストール中..."
  curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
  sudo apt update -qq && sudo apt install -y gh
  echo "✅ GitHub CLI インストール完了"
else
  echo "✅ gh: $(gh --version | head -1)"
fi

# ── 3. GitHub ログイン ───────────────────
echo ""
echo "📋 ステップ3: GitHub にログイン..."

if ! gh auth status &> /dev/null; then
  echo ""
  echo "🔐 ブラウザが開きます。GitHubにログインしてください。"
  gh auth login --web --git-protocol https
else
  echo "✅ GitHub ログイン済み"
fi

# ── 4. リポジトリ名を入力 ────────────────
echo ""
echo "📋 ステップ4: リポジトリ設定"
echo ""
read -p "📝 GitHubリポジトリ名を入力してください (例: ai-tools-hub): " REPO_NAME
REPO_NAME=${REPO_NAME:-ai-tools-hub}

# ── 5. git 初期化 & push ─────────────────
echo ""
echo "📋 ステップ5: GitHubにプッシュ中..."

# .gitignore 作成
cat > .gitignore << 'EOF'
node_modules/
.next/
.env
.env.local
*.log
EOF

git init
git add .
git commit -m "🚀 initial commit: ai-tools-hub"

# GitHubにリポジトリ作成 & push
gh repo create "$REPO_NAME" --public --source=. --remote=origin --push

echo ""
echo "✅ GitHubへのプッシュ完了！"
GH_USER=$(gh api user --jq .login)
echo "   👉 https://github.com/$GH_USER/$REPO_NAME"

# ── 6. Vercel CLI インストール & デプロイ ──
echo ""
echo "📋 ステップ6: Vercel にデプロイ中..."

if ! command -v vercel &> /dev/null; then
  echo "⬇️  Vercel CLI をインストール中..."
  npm install -g vercel
fi

echo ""
echo "🔐 Vercel にログインします（ブラウザが開きます）"
vercel login

echo ""
echo "⬇️  Vercel にデプロイ中..."
echo "   ※ 以下の質問には全部 Enter（デフォルト）でOKです"
echo ""

# Vercel プロジェクト設定を自動化
vercel --yes 2>&1 | head -30

# ── 7. 環境変数を設定 ────────────────────
echo ""
echo "📋 ステップ7: Anthropic APIキーを設定"
echo ""
echo "🔑 Anthropic APIキーを取得してください:"
echo "   https://console.anthropic.com/settings/keys"
echo ""
read -p "APIキーを貼り付けてください (sk-ant-...): " API_KEY

if [ -n "$API_KEY" ]; then
  echo "$API_KEY" | vercel env add ANTHROPIC_API_KEY production
  echo "✅ APIキー設定完了"
else
  echo "⚠️  スキップ。後で vercel env add ANTHROPIC_API_KEY production で設定できます"
fi

# ── 8. 本番デプロイ ──────────────────────
echo ""
echo "📋 ステップ8: 本番環境にデプロイ中..."
vercel --prod --yes

echo ""
echo "============================================"
echo "🎉 デプロイ完了！"
echo "============================================"
echo ""
echo "📌 次のステップ:"
echo ""
echo "  1️⃣  記事を生成する（ローカルで実行）"
echo "      export ANTHROPIC_API_KEY=$API_KEY"
echo "      node scripts/generate-articles.mjs all"
echo "      git add . && git commit -m 'add articles' && git push"
echo ""
echo "  2️⃣  Google AdSense を申請する"
echo "      https://adsense.google.com"
echo ""
echo "  3️⃣  サイトURLを確認"
vercel --prod 2>/dev/null | grep "Production:" || echo "      vercel ls で確認できます"
