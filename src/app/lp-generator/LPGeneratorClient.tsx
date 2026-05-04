'use client'
// src/app/lp-generator/LPGeneratorClient.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const APPEAL_OPTIONS = [
  { id: 'pain',    label: '課題解決' },
  { id: 'number',  label: '数値訴求' },
  { id: 'proof',   label: '社会証明' },
  { id: 'urgency', label: '緊急性' },
  { id: 'anchor',  label: 'アンカリング' },
]

const OUTPUT_TABS = ['LPプレビュー', 'CVスコア', 'A/Bバリアント']

export function LPGeneratorClient() {
  const [form, setForm] = useState({
    name: '売上10倍を実現するマーケティング完全習得プログラム',
    price: '500000',
    target: '売上に伸び悩む中小企業経営者・個人事業主',
    achievements: '受講生累計300名 / 平均売上改善率280% / 1対1サポート付き / 6ヶ月間全額返金保証',
    appeals: ['pain', 'proof'],
  })
  const [activeTab, setActiveTab] = useState(0)
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [streamText, setStreamText] = useState('')

  function toggleAppeal(id: string) {
    setForm(f => ({
      ...f,
      appeals: f.appeals.includes(id)
        ? f.appeals.filter(a => a !== id)
        : [...f.appeals, id],
    }))
  }

  async function generate() {
    setGenerating(true)
    setGenerated(false)
    setStreamText('')

    try {
      const res = await fetch('/api/generate-lp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let full = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        full += decoder.decode(value)
        setStreamText(full)
      }
      setGenerated(true)
    } catch {
      setStreamText('API接続エラー。ANTHROPIC_API_KEYを確認してください。')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 22 }}>

      {/* Input panel */}
      <div className="card" style={{ padding: 24, height: 'fit-content', position: 'sticky', top: 20 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
          講座情報
        </div>

        <div className="form-group">
          <label className="form-label">講座名</label>
          <input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="form-group">
          <label className="form-label">価格（円）</label>
          <select className="form-select" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}>
            <option value="300000">30万円</option>
            <option value="500000">50万円</option>
            <option value="800000">80万円</option>
            <option value="1000000">100万円</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">ターゲット</label>
          <input className="form-input" value={form.target} onChange={e => setForm(f => ({ ...f, target: e.target.value }))} />
        </div>
        <div className="form-group">
          <label className="form-label">実績・保証</label>
          <textarea className="form-textarea" value={form.achievements} onChange={e => setForm(f => ({ ...f, achievements: e.target.value }))} />
        </div>
        <div className="form-group">
          <label className="form-label">訴求軸（複数選択可）</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
            {APPEAL_OPTIONS.map(a => (
              <span
                key={a.id}
                className={`tag${form.appeals.includes(a.id) ? ' active' : ''}`}
                onClick={() => toggleAppeal(a.id)}
              >{a.label}</span>
            ))}
          </div>
        </div>

        <button
          className="btn btn-gold"
          style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
          onClick={generate}
          disabled={generating}
        >
          {generating ? '生成中...' : 'LP を AI生成する →'}
        </button>
      </div>

      {/* Output panel */}
      <div className="card" style={{ overflow: 'hidden' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg3)' }}>
          {OUTPUT_TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setActiveTab(i)}
              style={{
                padding: '12px 20px',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: 1,
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${activeTab === i ? 'var(--gold)' : 'transparent'}`,
                color: activeTab === i ? 'var(--gold-l)' : 'var(--text3)',
                cursor: 'pointer',
                transition: 'all .15s',
              }}
            >{t}</button>
          ))}
        </div>

        <div style={{ padding: 24 }}>
          <AnimatePresence mode="wait">
            {activeTab === 0 && (
              <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Browser chrome */}
                <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
                  <div style={{ background: 'var(--surface)', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border)' }}>
                    {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
                    <div style={{ flex: 1, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 4, padding: '3px 10px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)' }}>
                      https://yoursite.com/lp/{form.name.slice(0,20).replace(/\s/g,'').toLowerCase()}
                    </div>
                  </div>

                  {generating && (
                    <div style={{ padding: '10px 18px', background: 'var(--bg3)', borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)', letterSpacing: 1 }}>
                      ✦ AIが最適化中...
                    </div>
                  )}
                  <LPPreview form={form} generated={generated} streamText={streamText} />
                </div>
              </motion.div>
            )}
            {activeTab === 1 && <CVScorePanel generated={generated} />}
            {activeTab === 2 && <ABVariantsPanel generated={generated} name={form.name} target={form.target} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ── LP Preview ── */
function LPPreview({ form, generated, streamText }: { form: any; generated: boolean; streamText: string }) {
  const price = Number(form.price).toLocaleString()
  const anchorPrice = (Number(form.price) * 2).toLocaleString()
  const achievementList: string[] = form.achievements.split(/[/／]/).map((s: string) => s.trim()).filter(Boolean)
  const eyebrow = achievementList.slice(0, 2).join(' · ')
  const guarantee = achievementList.find((a: string) => a.includes('返金') || a.includes('保証')) ?? '分割払い対応'
  const firstTarget = form.target.split(/[・,、]/)[0]

  const showPain    = form.appeals.includes('pain')
  const showProof   = form.appeals.includes('proof') || form.appeals.includes('number')
  const showUrgency = form.appeals.includes('urgency')
  const showAnchor  = form.appeals.includes('anchor')

  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#0a0c14,#12101e)', padding: '40px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        {eyebrow && <div className="eyebrow gold" style={{ marginBottom: 12 }}>{eyebrow}</div>}
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 400, lineHeight: 1.3, marginBottom: 12, color: 'var(--text)' }}>
          {firstTarget}のための<br />
          <span style={{ color: 'var(--gold-l)' }}>{form.name}</span>
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, maxWidth: 440, margin: '0 auto 22px' }}>
          {form.target}を対象にした、再現性のある成果を出すプログラムです。
        </p>
        <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,var(--gold),#a07020)', color: '#060400', padding: '13px 32px', borderRadius: 6, fontWeight: 700, fontSize: 13, cursor: 'pointer', marginBottom: 8 }}>
          無料個別相談を予約する{showUrgency ? '（今月残3枠）' : ''}
        </div>
        {showUrgency && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--red)', letterSpacing: 2 }}>⚡ 今月の受付は残り3名です</div>
        )}
      </div>

      {/* Pain */}
      {showPain && (
        <div style={{ padding: '28px 40px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 14, color: 'var(--text)' }}>
            {firstTarget}の方へ — 次の状況に当てはまりますか？
          </h3>
          {[
            '広告費を投下しても成約が増えない',
            'SNS投稿を続けているが問い合わせが来ない',
            '値下げしないと売れない状況が続いている',
            '何を改善すれば売上が上がるか分からない',
          ].map(p => (
            <div key={p} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 12.5, color: 'var(--text2)' }}>
              <span style={{ color: 'var(--red)', flexShrink: 0 }}>✕</span>{p}
            </div>
          ))}
        </div>
      )}

      {/* Results / Proof */}
      {showProof && achievementList.length > 0 && (
        <div style={{ padding: '28px 40px', borderBottom: '1px solid var(--border)', background: 'rgba(201,168,76,.02)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 16, color: 'var(--gold-l)' }}>
            実績・保証
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(achievementList.length, 3)},1fr)`, gap: 12 }}>
            {achievementList.slice(0, 3).map((ach, i) => (
              <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--gold-l)', lineHeight: 1.3 }}>{ach}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Anchor */}
      {showAnchor && (
        <div style={{ padding: '16px 40px', background: 'rgba(201,168,76,.04)', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)', textDecoration: 'line-through' }}>通常価格: ¥{anchorPrice}</span>
          <span style={{ marginLeft: 12, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold-l)' }}>→ 今なら特別価格でご提供</span>
        </div>
      )}

      {/* Price */}
      <div style={{ padding: '28px 40px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,var(--surface),var(--bg3))', border: '1px solid var(--gold-d)', borderRadius: 12, padding: '24px 48px' }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>プログラム料金</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 600, color: 'var(--gold-l)' }}>¥{price}</div>
          <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 6 }}>{guarantee}</div>
        </div>
      </div>
    </div>
  )
}

/* ── CV Score Panel ── */
function CVScorePanel({ generated }: { generated: boolean }) {
  const IMPROVEMENTS = [
    { priority: 'HIGH', label: 'CTAボタンを3箇所に配置（ファーストビュー・中段・最下部）', impact: 'CV率 +1.2〜1.8pt 見込み' },
    { priority: 'HIGH', label: '顔写真付き・売上数値入りの受講生の声を5件以上掲載', impact: 'CV率 +1.0〜1.5pt 見込み' },
    { priority: 'MID',  label: 'フォーム入力項目を5項目→3項目（名前・メール・電話）に削減', impact: '離脱率 −22% 見込み' },
    { priority: 'MID',  label: '価格提示前に「通常100万円→今なら50万円」のアンカリング表現を追加', impact: 'CV率 +0.6〜0.9pt 見込み' },
    { priority: 'LOW',  label: 'ページ読み込み速度 1.8秒（良好）。画像WebP化でさらに0.4秒短縮可能', impact: '直帰率 −4% 見込み' },
  ]

  if (!generated) {
    return <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 2 }}>LP生成後に表示されます</div>
  }

  return (
    <div>
      <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span className="eyebrow">CV予測スコア</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--green)', fontWeight: 600 }}>82 / 100</span>
        </div>
        <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
          <motion.div initial={{ width: 0 }} animate={{ width: '82%' }} transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ height: '100%', background: 'linear-gradient(90deg,var(--green),var(--blue))', borderRadius: 3 }} />
        </div>
      </div>
      <div className="eyebrow" style={{ marginBottom: 10 }}>改善提案（優先度順）</div>
      {IMPROVEMENTS.map((imp, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, padding: '11px 0', borderBottom: '1px solid var(--border)', alignItems: 'flex-start' }}>
          <span className={`badge badge-${imp.priority.toLowerCase()}`}>{imp.priority}</span>
          <div>
            <div style={{ fontSize: 12.5, color: 'var(--text)', lineHeight: 1.5, marginBottom: 4 }}>{imp.label}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--blue-l)' }}>→ {imp.impact}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── A/B Variants Panel ── */
function ABVariantsPanel({ generated, name, target }: { generated: boolean; name: string; target: string }) {
  if (!generated) {
    return <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 2 }}>LP生成後に表示されます</div>
  }

  const VARIANTS = [
    { type: 'A', style: '課題解決型（推奨）', color: 'var(--gold)', headline: `${target}が\n6ヶ月で売上3倍を実現した\n再現性のある集客戦略`, cvr: '4.2%', badge: 'badge-mid' },
    { type: 'B', style: '数値訴求型', color: 'var(--blue-l)', headline: `広告費に頼らず\n月商1,000万を突破した\n300名が実践したマーケ戦略`, cvr: '3.8%', badge: 'badge-blue' },
    { type: 'C', style: '感情・共感型', color: 'var(--text3)', headline: `「なぜ売れないのか」\nその答えを知った日から\nすべてが変わりました`, cvr: '3.5%', badge: '' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="eyebrow" style={{ marginBottom: 4 }}>ヘッドライン A/Bバリアント</div>
      {VARIANTS.map(v => (
        <div key={v.type} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, padding: 18 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: v.color, letterSpacing: 2, marginBottom: 10 }}>
            VARIANT {v.type} — {v.style}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text)', lineHeight: 1.4, whiteSpace: 'pre-line', marginBottom: 10 }}>
            {v.headline}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: v.color }}>予測CV率: {v.cvr}</div>
        </div>
      ))}
    </div>
  )
}
