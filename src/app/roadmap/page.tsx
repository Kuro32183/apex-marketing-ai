// src/app/roadmap/page.tsx
import { PageShell } from '@/components/layout/PageShell'
export default function RoadmapPage() {
  return (
    <PageShell title="開発" titleAccent="ロードマップ" desc="仕様策定から収益最大化まで、4フェーズの実施計画です。">
      <RoadmapContent />
    </PageShell>
  )
}

function RoadmapContent() {
  const PHASES = [
    {
      num: '01', color: 'var(--gold-l)', bg: 'rgba(201,168,76,.15)', border: 'var(--gold-d)',
      title: 'Phase 1 — 仕様策定・設計',
      period: 'Week 1〜2（現在）',
      tasks: [
        '✓ 要件定義・KPI設定・ターゲットペルソナ策定',
        '✓ ファネル設計・LP構成設計・コピー戦略立案',
        '✓ 技術スタック選定（Next.js / Vercel / Claude API）',
        '✓ このダッシュボードのプロトタイプ確認',
      ],
    },
    {
      num: '02', color: 'var(--blue-l)', bg: 'rgba(74,144,217,.12)', border: 'var(--blue)',
      title: 'Phase 2 — MVP開発',
      period: 'Week 3〜6（2週間後〜）',
      tasks: [
        '□ Next.js 14 App Router での画面実装',
        '□ Claude API（Streaming）でLP生成・コピー生成を実装',
        '□ Supabase で生成履歴・設定を永続化',
        '□ Vercel にデプロイ・環境変数設定',
        '□ β版リリース・初期ユーザーテスト',
      ],
    },
    {
      num: '03', color: 'var(--green)', bg: 'rgba(62,207,142,.1)', border: 'var(--green)',
      title: 'Phase 3 — 広告連携・最適化',
      period: 'Week 7〜10（1.5ヶ月後〜）',
      tasks: [
        '□ Meta Ads API・Google Ads API 連携',
        '□ Python FastAPI でデータ集計・AI分析バックエンド構築',
        '□ Vercel Cron で週次レポート自動生成',
        '□ A/Bテスト管理機能の実装',
        '□ CVスコアリングエンジンの精度向上',
      ],
    },
    {
      num: '04', color: 'var(--text3)', bg: 'rgba(90,93,112,.1)', border: 'var(--text3)',
      title: 'Phase 4 — スケール',
      period: 'Week 11〜（2.5ヶ月後〜）',
      tasks: [
        '□ LTV最大化のためのアップセル設計支援機能',
        '□ 複数講座・複数ユーザーへの拡張',
        '□ データ蓄積によるAIモデル精度向上',
        '□ 月商3,000万達成の検証・次期戦略立案',
      ],
    },
  ]

  return (
    <div>
      <div className="card" style={{ padding: 28, marginBottom: 24 }}>
        {PHASES.map((p, i) => (
          <div key={p.num} style={{ display: 'flex', gap: 16, marginBottom: i < PHASES.length - 1 ? 28 : 0, paddingBottom: i < PHASES.length - 1 ? 28 : 0, borderBottom: i < PHASES.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: p.bg, border: `1px solid ${p.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, color: p.color, flexShrink: 0 }}>{p.num}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{p.title}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold)', letterSpacing: 1, marginBottom: 10 }}>{p.period}</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 2 }}>
                {p.tasks.map((t, j) => <div key={j}>{t}</div>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-3">
        {[
          { label: '開発投資', val: '¥800K', sub: '開発160h / API月¥8〜15K / インフラ月¥5K〜', color: 'var(--gold-l)' },
          { label: 'ROI回収時期', val: '2ヶ月',  sub: '月商8.5M→15M達成時に投資回収', color: 'var(--blue-l)' },
          { label: '目標ROI（初年度）', val: '3,100%', sub: '月商3,000万達成時・投資対効果31倍', color: 'var(--green)' },
        ].map(m => (
          <div key={m.label} className="card" style={{ padding: 22 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>{m.label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: m.color, marginBottom: 8 }}>{m.val}</div>
            <div style={{ fontSize: 11.5, color: 'var(--text2)', lineHeight: 1.6 }}>{m.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
