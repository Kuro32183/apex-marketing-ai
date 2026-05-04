'use client'
// src/app/DashboardClient.tsx
import { motion } from 'framer-motion'
import Link from 'next/link'

const KPI = [
  { label: 'LP CV予測率',  value: '4.2%',  delta: '業界平均 +2.8pt', trend: 'up'   },
  { label: '広告 ROAS',    value: '820%',  delta: '目標値 800%',      trend: 'up'   },
  { label: 'CPL 目標',     value: '¥2,400', delta: '現状比 −40%',     trend: 'up'   },
  { label: '成約率',       value: '12%',   delta: '前月比 +3.2pt',    trend: 'up'   },
]

const STEPS = [
  { num: '01', icon: '📋', name: '仕様策定',   desc: '要件定義・KPI設定・競合分析',            status: 'done',   label: '完了' },
  { num: '02', icon: '🗺️', name: 'ファネル設計', desc: '集客〜成約シナリオ・LP構成',           status: 'done',   label: '完了' },
  { num: '03', icon: '⚙️', name: 'AI機能開発', desc: 'LP生成AI・コピーAI・広告最適化AI',       status: 'active', label: '進行中' },
  { num: '04', icon: '🚀', name: 'MVP公開',    desc: 'β版リリース・A/Bテスト開始',            status: 'pending', label: '2週間後' },
  { num: '05', icon: '📈', name: '継続最適化', desc: 'データドリブンなCV改善・ROAS最大化',      status: 'pending', label: '1ヶ月後〜' },
]

const STATUS_STYLE: Record<string, { border: string; bg: string; badge: string }> = {
  done:    { border: 'rgba(201,168,76,.35)',  bg: 'rgba(201,168,76,.04)',  badge: 'var(--gold-l)' },
  active:  { border: 'rgba(74,144,217,.4)',   bg: 'rgba(74,144,217,.06)',  badge: 'var(--blue-l)' },
  pending: { border: 'var(--border)',          bg: 'transparent',           badge: 'var(--text3)' },
}

export function DashboardClient() {
  return (
    <div>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .05 }}
        style={{
          background: 'linear-gradient(135deg, #0d1020, #181228)',
          border: '1px solid var(--border2)',
          borderRadius: 'var(--r-lg)',
          padding: '36px 44px',
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 280, height: 280,
          background: 'radial-gradient(circle, rgba(201,168,76,.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="eyebrow gold" style={{ marginBottom: 14 }}>
          High-Ticket Course Marketing System
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 38,
          fontWeight: 300,
          lineHeight: 1.2,
          marginBottom: 14,
        }}>
          30万〜100万円の講座を<br />
          <em style={{ color: 'var(--gold-l)', fontStyle: 'italic' }}>AIが売れる仕組みに変える</em>
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 28, maxWidth: 560 }}>
          LP自動生成・セールスコピー・広告最適化をAIが一気通貫でサポート。<br />
          CV改善を中心に「成約につながるファネル」を設計・実行します。
        </p>
        <div style={{ display: 'flex', gap: 36 }}>
          {[
            { val: '3.8×', label: 'CV改善期待値' },
            { val: '−68%', label: '制作コスト削減' },
            { val: '72h',  label: 'LP公開まで' },
          ].map((m) => (
            <div key={m.label}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 600, color: 'var(--gold-l)', lineHeight: 1 }}>{m.val}</div>
              <div className="eyebrow" style={{ marginTop: 4 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* KPI grid */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        {KPI.map((k, i) => (
          <motion.div
            key={k.label}
            className="card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .1 + i * .06 }}
            style={{ padding: '18px 20px' }}
          >
            <div className="eyebrow" style={{ marginBottom: 10 }}>{k.label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, lineHeight: 1, marginBottom: 6 }}>{k.value}</div>
            <div className={`trend-${k.trend}`} style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>↑ {k.delta}</div>
          </motion.div>
        ))}
      </div>

      {/* Process */}
      <div style={{ marginBottom: 8 }}>
        <div className="eyebrow" style={{ marginBottom: 6 }}>開発プロセス</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 0 }}>
        {STEPS.map((s, i) => {
          const st = STATUS_STYLE[s.status]
          return (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .2 + i * .06 }}
              style={{
                background: st.bg,
                border: `1px solid ${st.border}`,
                borderLeft: i > 0 ? 'none' : `1px solid ${st.border}`,
                borderRadius: i === 0 ? 'var(--r) 0 0 var(--r)' : i === 4 ? '0 var(--r) var(--r) 0' : 0,
                padding: '18px 16px',
              }}
            >
              <div className="eyebrow" style={{ marginBottom: 6 }}>STEP {s.num}</div>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 4 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.5, marginBottom: 10 }}>{s.desc}</div>
              <span style={{
                display: 'inline-block',
                padding: '2px 8px',
                borderRadius: 4,
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: 1,
                color: st.badge,
                background: `${st.badge}20`,
              }}>{s.label}</span>
            </motion.div>
          )
        })}
      </div>

      {/* Quick links */}
      <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
        <Link href="/lp-generator" className="btn btn-gold">LP生成を開始 →</Link>
        <Link href="/spec" className="btn btn-ghost">仕様書を確認</Link>
        <Link href="/funnel" className="btn btn-blue">ファネル分析</Link>
      </div>
    </div>
  )
}
