'use client'
// src/app/funnel/FunnelClient.tsx
import { motion } from 'framer-motion'

const STAGES = [
  { label: '広告インプレッション', count: '84,000',  rate: null,    pct: 100, color: 'rgba(201,168,76,.15)',  border: 'rgba(201,168,76,.3)'  },
  { label: 'LP流入（クリック）',   count: '2,940',   rate: 'CTR 3.5%',  pct: 88, color: 'rgba(74,144,217,.12)',  border: 'rgba(74,144,217,.28)' },
  { label: 'フォーム到達',         count: '588',     rate: '20.0%',  pct: 64, color: 'rgba(62,207,142,.12)',  border: 'rgba(62,207,142,.28)' },
  { label: '無料相談申込',         count: '147',     rate: '25.0%',  pct: 42, color: 'rgba(122,184,245,.12)', border: 'rgba(122,184,245,.28)'},
  { label: '成約（購入）',         count: '17件',    rate: '11.6%',  pct: 16, color: 'rgba(240,96,96,.15)',   border: 'rgba(240,96,96,.3)'   },
]

export function FunnelClient() {
  return (
    <div className="grid-2" style={{ alignItems: 'start' }}>
      {/* Funnel visual */}
      <div className="card" style={{ padding: 24 }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>月間コンバージョンファネル（直近30日）</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {STAGES.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .08 }}
              style={{ width: `${s.pct}%`, background: s.color, border: `1px solid ${s.border}`, borderRadius: 6, padding: '11px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12.5, fontWeight: 500 }}>{s.label}</span>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text2)' }}>{s.count}</span>
                {s.rate && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: s.border }}>{s.rate}</span>}
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: 18, padding: 14, background: 'var(--bg3)', borderRadius: 8, border: '1px solid rgba(240,96,96,.2)' }}>
          <div className="eyebrow" style={{ marginBottom: 6, color: 'var(--red)' }}>ボトルネック</div>
          <div style={{ fontSize: 12.5, color: 'var(--red)', marginBottom: 4 }}>LP→フォーム到達率 20%（業界平均 35%）</div>
          <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>
            ヒーローセクション内にCTAを追加し、ページ中段に社会的証明を配置することで到達率28〜32%に改善見込み。
          </div>
        </div>
      </div>

      {/* Simulation + roadmap */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div className="card" style={{ padding: 22 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>売上シミュレーション</div>
          <div className="grid-2">
            <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, padding: 14 }}>
              <div className="eyebrow" style={{ marginBottom: 6 }}>現状</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--text)' }}>¥8.5M</div>
              <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 4 }}>17件 × 50万円</div>
            </div>
            <div style={{ background: 'rgba(201,168,76,.05)', border: '1px solid var(--gold-d)', borderRadius: 8, padding: 14 }}>
              <div className="eyebrow gold" style={{ marginBottom: 6 }}>改善後（3ヶ月）</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--gold-l)' }}>¥25M+</div>
              <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 4 }}>50件 × 50万円</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 22 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>CV改善 施策スケジュール</div>
          {[
            { label: 'CTAボタンを3箇所に配置',         when: '今週',   color: 'rgba(240,96,96,.2)' },
            { label: '受講生の声セクション追加（数値入り）', when: '来週',   color: 'rgba(201,168,76,.2)' },
            { label: 'フォーム項目を5→3に削減',         when: '2週間後', color: 'rgba(74,144,217,.2)' },
            { label: 'ヘッドラインA/Bテスト開始',       when: '1ヶ月後', color: 'var(--border)' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--bg3)', border: `1px solid ${item.color}`, borderRadius: 6, marginBottom: 8, fontSize: 12 }}>
              <span style={{ color: 'var(--text)' }}>{item.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>{item.when}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
