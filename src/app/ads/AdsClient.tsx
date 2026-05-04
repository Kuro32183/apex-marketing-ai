'use client'
// src/app/ads/AdsClient.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'

const METRICS = [
  { label: '広告費（月）', value: '¥384K', delta: '+12%', trend: 'down' },
  { label: '売上（月）',   value: '¥3.15M', delta: '+34%', trend: 'up'   },
  { label: 'ROAS',        value: '820%',  delta: '目標達成', trend: 'up' },
  { label: 'CPL',         value: '¥2,480', delta: '目標比 −3%', trend: 'up' },
  { label: '成約率',      value: '11.8%', delta: '+2.4pt', trend: 'up'   },
]

const SUGGESTIONS = [
  {
    priority: 'HIGH',
    title: 'Meta広告：類似オーディエンスを購入者データで再構築',
    detail: '現在の類似オーディエンスはLP閲覧者ベース（2,940件）です。実際の購入者データ（23件）でカスタムオーディエンスを作成し、1〜3%類似に変更することでCPLを30〜40%改善できます。購入者CSVをMeta広告マネージャーにアップロードして設定してください。',
    impact: 'CPL ¥2,480 → ¥1,500〜1,700 / ROAS +120〜180pt',
  },
  {
    priority: 'HIGH',
    title: 'Google検索：除外キーワードに「無料」「格安」「安い」を追加',
    detail: '現在のキャンペーンで「無料マーケティング」「格安コンサル」などの検索クエリからの流入が全体の18%を占め、CVRはほぼ0%です。これらを除外キーワード（フレーズ一致）に設定することで、月間¥69,000の無駄な広告費を削減できます。',
    impact: '無駄なクリック削減 −18% / 実質CPL −22%',
  },
  {
    priority: 'MID',
    title: '入札戦略を「クリック数最大化」→「目標CPA ¥20,000」に変更',
    detail: 'CVデータが30件以上蓄積されたため、スマート自動入札に切り替えるタイミングです。目標CPAを現在のCPA（¥20,678）より10%低い¥20,000に設定してください。最適化には2〜3週間かかります。切り替え後1週間はパフォーマンスが一時的に下がる可能性があります。',
    impact: 'ROAS 820% → 950〜1,000%（3週間後）',
  },
  {
    priority: 'MID',
    title: 'LP到達後の離脱率が80%（LP→フォーム到達20%）',
    detail: 'ヒートマップ分析（仮定）によると、訪問者の65%がファーストビューのスクロール前に離脱しています。CTAボタンをファーストビュー内に配置し、ヘッドライン直下に社会的証明（受講生300名・返金保証）を追加することを推奨します。',
    impact: 'LP→フォーム到達率 20% → 28〜32%（CV率 +40〜60%）',
  },
  {
    priority: 'LOW',
    title: 'Meta広告クリエイティブに15〜30秒の動画を追加テスト',
    detail: '現在は静止画のみです。受講生の「ビフォーアフター」を語る縦型動画（iPhone撮影可）をリール広告として配信することで、CTRが静止画比1.8〜2.5倍になる事例が多数あります。まず1本作成して静止画とA/Bテストすることを推奨します。',
    impact: 'CTR +80〜150% / インプレッション単価 −30%',
  },
]

export function AdsClient() {
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState('')

  async function runAnalysis() {
    setAnalyzing(true)
    setAnalysis('')
    try {
      const res = await fetch('/api/analyze-ads', { method: 'POST' })
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let text = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        text += decoder.decode(value)
        setAnalysis(text)
      }
    } catch {
      setAnalysis('API接続エラー')
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div>
      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, marginBottom: 28 }}>
        {METRICS.map((m, i) => (
          <motion.div key={m.label} className="card" style={{ padding: '16px 18px' }}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .06 }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>{m.label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, lineHeight: 1, marginBottom: 4 }}>{m.value}</div>
            <div className={`trend-${m.trend}`} style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>{m.delta}</div>
          </motion.div>
        ))}
      </div>

      {/* AI Analysis button */}
      <div style={{ marginBottom: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
        <button className="btn btn-gold" onClick={runAnalysis} disabled={analyzing}>
          {analyzing ? 'AI分析中...' : '広告データをAIで分析する →'}
        </button>
        {analysis && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)' }}>✓ 分析完了</span>}
      </div>

      {analysis && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="card" style={{ padding: 20, marginBottom: 24, whiteSpace: 'pre-wrap', fontSize: 13, color: 'var(--text2)', lineHeight: 1.8 }}>
          {analysis}
        </motion.div>
      )}

      {/* Suggestions */}
      <div className="eyebrow" style={{ marginBottom: 12 }}>AI改善提案（優先度順）</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {SUGGESTIONS.map((s, i) => (
          <motion.div key={i} className="card" style={{ padding: '18px 22px', display: 'flex', gap: 14 }}
            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .1 + i * .07 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: s.priority === 'HIGH' ? 'rgba(240,96,96,.12)' : s.priority === 'MID' ? 'rgba(201,168,76,.12)' : 'rgba(62,207,142,.12)',
              color: s.priority === 'HIGH' ? 'var(--red)' : s.priority === 'MID' ? 'var(--gold-l)' : 'var(--green)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500, flexShrink: 0,
            }}>{s.priority}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 8 }}>{s.detail}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--blue-l)' }}>→ 期待効果: {s.impact}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
