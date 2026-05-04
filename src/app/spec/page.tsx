// src/app/spec/page.tsx
import { PageShell } from '@/components/layout/PageShell'

export default function SpecPage() {
  const MODULES = [
    {
      icon: '⬡', title: 'LP自動生成モジュール',
      items: [
        'ターゲット・価格帯・実績をフォーム入力→LP全体をストリーミング生成',
        'ヒーロー・課題提起・実績数値・CTA・料金・FAQ の6セクションを自動構成',
        'PASONA原則に基づくコピーを出力。曖昧な表現は生成プロンプトで禁止',
        'A/Bテスト用ヘッドライン3案（課題解決型・数値訴求型・感情型）を同時生成',
        'CVスコアリングAIが0〜100点で評価し、改善点を優先度順に出力',
        '生成結果はHTMLコードとしてもコピー可能',
      ],
    },
    {
      icon: '✦', title: 'セールスコピー生成モジュール',
      items: [
        'メルマガ（認知→興味→欲求→行動の7通シリーズ）を自動生成',
        'LINE配信テキスト（200文字以内・限定性訴求）の自動生成',
        'Meta広告：フィード用150〜200文字・ストーリーズ用50文字以内の2形式',
        'Google検索広告：RSA形式・見出し15案＋説明文4案を自動生成',
        '各コピーに開封率・CTR・CVRの予測値を出力',
        'ワンクリックでクリップボードにコピー可能',
      ],
    },
    {
      icon: '◎', title: '広告最適化モジュール',
      items: [
        'Meta Ads / Google Ads のAPIからパフォーマンスデータを自動取得（Phase 3）',
        'ROAS・CPL・CTR・成約率を総合評価し改善提案を優先度HIGH/MID/LOWで出力',
        '各提案に「何を変えるか」「期待効果（数値）」を明記（曖昧な表現なし）',
        '除外キーワード・類似オーディエンス・入札戦略の具体的な設定手順を提示',
        '週次でAIが自動分析・レポートを生成（Vercel Cron）',
      ],
    },
    {
      icon: '▽', title: 'ファネル分析・CV改善',
      items: [
        '広告→LP→フォーム→決済の各ステップのCV率・ドロップ率を数値で可視化',
        'ボトルネックを自動特定し、改善施策をスケジュール付きで提示',
        'LP到達率・フォーム到達率・成約率の改善シミュレーションを算出',
        'アンカリング・限定性・緊急性など心理的CV要因の適用状況をチェック',
      ],
    },
  ]

  const STACK = [
    { icon: '⚛️', name: 'Next.js 14 (App Router)', role: 'フロントエンド・ページルーティング・API Routes' },
    { icon: '🤖', name: 'Claude API (Sonnet 4)', role: 'LP生成・コピー生成・広告分析（Edge Streaming）' },
    { icon: '🗄️', name: 'Supabase (PostgreSQL)', role: '生成履歴・設定・ユーザー認証の永続化' },
    { icon: '🚀', name: 'Vercel (nrt1リージョン)', role: 'デプロイ・Edge Functions・Cron・環境変数管理' },
    { icon: '🐍', name: 'Python FastAPI（Phase 3）', role: 'Meta/Google Ads APIとのデータ連携・集計バックエンド' },
    { icon: '📊', name: 'Meta / Google Ads API', role: '広告データ取得・パフォーマンス自動解析（Phase 3）' },
    { icon: '💳', name: 'Stripe', role: '決済・サブスクリプション管理（Phase 4）' },
    { icon: '🎭', name: 'Framer Motion', role: 'ページ遷移・UI アニメーション' },
  ]

  return (
    <PageShell title="システム" titleAccent="仕様書" desc="APEX Marketing AI — 機能要件・技術スタック・デプロイ構成の全体設計です。">
      <div className="grid-2" style={{ marginBottom: 24 }}>
        {MODULES.map(m => (
          <div key={m.title} className="card" style={{ padding: '22px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 18 }}>{m.icon}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600 }}>{m.title}</span>
            </div>
            <ul style={{ listStyle: 'none' }}>
              {m.items.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontSize: 11, flexShrink: 0, marginTop: 1 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: '22px 24px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, marginBottom: 18 }}>技術スタック</div>
        <div className="grid-2">
          {STACK.map(s => (
            <div key={s.name} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, padding: '13px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 500, marginBottom: 3 }}>{s.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', letterSpacing: .5 }}>{s.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
