# APEX Marketing AI

高単価オンライン講座（30万〜100万円）の集客最大化を目的としたマーケティングAIシステム。

## 技術スタック

| 用途 | 技術 |
|------|------|
| フロントエンド | Next.js 14 (App Router) + TypeScript |
| AI生成 | Claude API (claude-sonnet-4) — Edge Streaming |
| UI アニメーション | Framer Motion |
| 状態管理 | Zustand |
| デプロイ | Vercel (nrt1 リージョン) |
| DB（Phase 2〜） | Supabase (PostgreSQL) |
| 広告連携（Phase 3〜） | Python FastAPI + Meta/Google Ads API |

## ローカル起動

```bash
# 1. 依存関係インストール
npm install

# 2. 環境変数設定
cp .env.example .env.local
# .env.local の ANTHROPIC_API_KEY を設定

# 3. 開発サーバー起動
npm run dev
# → http://localhost:3000
```

## Vercel デプロイ

```bash
# Vercel CLI でデプロイ
npm i -g vercel
vercel

# 環境変数をVercelに追加
vercel env add ANTHROPIC_API_KEY
```

## ページ構成

| パス | 機能 |
|------|------|
| `/` | ダッシュボード（KPI・プロセスフロー） |
| `/spec` | システム仕様書（機能要件・技術スタック） |
| `/lp-generator` | LP自動生成（Claude API Streaming） |
| `/copywriter` | セールスコピー生成（4チャネル） |
| `/ads` | 広告最適化（改善提案・AI分析） |
| `/funnel` | ファネル分析（CV改善ロードマップ） |
| `/roadmap` | 開発ロードマップ（Phase 1〜4） |

## API Routes

| エンドポイント | 機能 |
|----------------|------|
| `POST /api/generate-lp` | LP構成・コピーをストリーミング生成 |
| `POST /api/generate-copy` | 各チャネルのセールスコピー生成 |
| `POST /api/analyze-ads` | 広告パフォーマンスをAIで分析 |

## Phase 3: Python バックエンド追加手順

広告API連携が必要になった時点で以下を追加します。

```bash
# /backend ディレクトリを作成
mkdir backend && cd backend
pip install fastapi uvicorn anthropic google-ads facebook-business

# main.py に Meta/Google Ads API 連携を実装
# Vercel の rewrite で /api/ads/* → FastAPI に転送
```

## 設計方針

- **曖昧な表現禁止**: 生成プロンプトで「豊かな人生」「夢の実現」などを明示的に禁止
- **数値必須**: 実績・改善効果・予測値は必ず数値で表現
- **Streaming 優先**: 生成はすべて Edge Streaming でリアルタイム表示
- **シームレス遷移**: Framer Motion で全ページにフェードイン遷移
