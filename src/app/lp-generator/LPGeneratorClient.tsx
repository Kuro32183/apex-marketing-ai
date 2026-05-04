'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const INDUSTRY_OPTIONS = [
  { value: 'coaching',   label: 'コーチング・コンサル' },
  { value: 'education',  label: 'オンライン講座・スクール' },
  { value: 'fitness',    label: 'フィットネス・ダイエット' },
  { value: 'realestate', label: '不動産・資産運用' },
  { value: 'tech',       label: 'IT・プログラミング' },
  { value: 'creative',   label: 'デザイン・クリエイティブ' },
  { value: 'sns',        label: 'SNS・Web集客' },
  { value: 'english',    label: '語学・英語' },
  { value: 'other',      label: 'その他' },
]

const APPEAL_OPTIONS = [
  { id: 'pain',    label: '課題解決' },
  { id: 'number',  label: '数値訴求' },
  { id: 'proof',   label: '社会証明' },
  { id: 'urgency', label: '緊急性' },
  { id: 'anchor',  label: 'アンカリング' },
]

const OUTPUT_TABS = ['LPプレビュー', '生成コピー', 'CVスコア', 'A/Bバリアント']

interface Parsed {
  headline:    string
  subheadline: string
  cta:         string
  urgency:     string
}

function parseCopy(text: string): Parsed {
  const section = (heading: string) => {
    const m = text.match(new RegExp(`## ${heading}\n([\\s\\S]*?)(?=\\n##|$)`))
    return m?.[1]?.trim() ?? ''
  }
  return {
    headline:    section('ヘッドライン'),
    subheadline: section('サブヘッドライン'),
    cta:         section('CTA文言'),
    urgency:     section('緊急性'),
  }
}

export function LPGeneratorClient() {
  const [form, setForm] = useState({
    industry:     'coaching',
    name:         '売上10倍を実現するマーケティング完全習得プログラム',
    price:        '500000',
    target:       '売上に伸び悩む中小企業経営者・個人事業主',
    achievements: '受講生累計300名 / 平均売上改善率280% / 1対1サポート付き / 6ヶ月間全額返金保証',
    appeals:      ['pain', 'proof'] as string[],
  })
  const [activeTab,  setActiveTab]  = useState(0)
  const [generating, setGenerating] = useState(false)
  const [generated,  setGenerated]  = useState(false)
  const [streamText, setStreamText] = useState('')
  const [parsed,     setParsed]     = useState<Parsed>({ headline: '', subheadline: '', cta: '', urgency: '' })

  useEffect(() => {
    if (generated) setParsed(parseCopy(streamText))
  }, [generated, streamText])

  function toggleAppeal(id: string) {
    setForm(f => ({
      ...f,
      appeals: f.appeals.includes(id) ? f.appeals.filter(a => a !== id) : [...f.appeals, id],
    }))
  }

  async function generate() {
    setGenerating(true)
    setGenerated(false)
    setStreamText('')
    setParsed({ headline: '', subheadline: '', cta: '', urgency: '' })
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
    <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 22, alignItems: 'start' }}>

      {/* ── 入力パネル ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'sticky', top: 20 }}>
        <motion.div className="card" style={{ overflow: 'hidden' }}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>

          {/* Panel header */}
          <div style={{ padding: '13px 18px', borderBottom: '1px solid var(--border)', background: 'var(--bg3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>LP生成設定</span>
            <span style={{ padding: '2px 8px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, background: 'rgba(168,132,74,.12)', color: 'var(--gold-l)' }}>AI GENERATE</span>
          </div>

          {/* 基本情報 */}
          <div style={{ padding: '16px 18px 0' }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>基本情報</div>
            <div className="form-group">
              <label className="form-label">業種カテゴリ</label>
              <select className="form-select" value={form.industry} onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}>
                {INDUSTRY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">サービス・講座名</label>
              <input className="form-input" value={form.name} placeholder="例：〇〇の売上改善プログラム"
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">提供価格</label>
              <select className="form-select" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}>
                <option value="300000">30万円</option>
                <option value="500000">50万円</option>
                <option value="800000">80万円</option>
                <option value="1000000">100万円</option>
              </select>
            </div>
          </div>

          <hr className="divider" style={{ margin: '4px 18px' }} />

          {/* ターゲット・実績 */}
          <div style={{ padding: '12px 18px 0' }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>ターゲット・実績</div>
            <div className="form-group">
              <label className="form-label">ターゲット顧客</label>
              <input className="form-input" value={form.target} placeholder="例：売上に悩む中小企業経営者"
                onChange={e => setForm(f => ({ ...f, target: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">実績 / 保証条件</label>
              <textarea className="form-textarea" value={form.achievements}
                placeholder="例：受講生300名 / 平均成果280% / 全額返金保証"
                onChange={e => setForm(f => ({ ...f, achievements: e.target.value }))} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', marginTop: 4 }}>
                「 / 」区切りで複数入力
              </div>
            </div>
          </div>

          <hr className="divider" style={{ margin: '4px 18px' }} />

          {/* 訴求軸 */}
          <div style={{ padding: '12px 18px 18px' }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>訴求の優先軸</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {APPEAL_OPTIONS.map(a => (
                <span key={a.id} className={`tag${form.appeals.includes(a.id) ? ' active' : ''}`}
                  onClick={() => toggleAppeal(a.id)}>{a.label}</span>
              ))}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', marginTop: 8 }}>
              選択した軸がLPの構成に反映されます
            </div>
          </div>
        </motion.div>

        <button className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}
          onClick={generate} disabled={generating}>
          {generating ? 'AIが生成中...' : 'LP コピーを AI生成する →'}
        </button>

        {generated && !generating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--green)', padding: '0 2px' }}>
            ✓ 生成完了 — プレビューとコピータブに反映されました
          </motion.div>
        )}
      </div>

      {/* ── 出力パネル ── */}
      <motion.div className="card" style={{ overflow: 'hidden' }}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .06 }}>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg3)' }}>
          {OUTPUT_TABS.map((t, i) => (
            <button key={t} onClick={() => setActiveTab(i)} style={{
              padding: '11px 16px',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: 1,
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${activeTab === i ? 'var(--gold-l)' : 'transparent'}`,
              color: activeTab === i ? 'var(--gold-l)' : 'var(--text3)',
              cursor: 'pointer',
              transition: 'all .15s',
              whiteSpace: 'nowrap',
            }}>{t}</button>
          ))}
        </div>

        <div style={{ padding: 22 }}>
          <AnimatePresence mode="wait">

            {/* ── Tab 0: LP プレビュー ── */}
            {activeTab === 0 && (
              <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
                  {/* Browser chrome */}
                  <div style={{ background: 'var(--surface)', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border)' }}>
                    {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                      <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                    ))}
                    <div style={{ flex: 1, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 4, padding: '3px 10px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)' }}>
                      {form.name.slice(0, 30).toLowerCase().replace(/[\s　]/g, '-')}
                    </div>
                  </div>
                  {generating && (
                    <div style={{ padding: '8px 16px', background: 'rgba(168,132,74,.05)', borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold-l)', letterSpacing: 1 }}>
                      AIがコピーを最適化中...
                    </div>
                  )}
                  <LPPreview form={form} parsed={parsed} generated={generated} />
                </div>
              </motion.div>
            )}

            {/* ── Tab 1: 生成コピー ── */}
            {activeTab === 1 && (
              <motion.div key="rawcopy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {!streamText ? (
                  <div style={{ padding: '52px 0', textAlign: 'center', color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2 }}>
                    AIコピーは生成後に表示されます
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                      <div className="eyebrow">生成されたコピー</div>
                      {generated && (
                        <button className="btn btn-ghost" style={{ padding: '4px 10px', fontSize: 10 }}
                          onClick={() => navigator.clipboard.writeText(streamText)}>
                          コピー
                        </button>
                      )}
                    </div>
                    <div className="card" style={{ padding: '16px 20px', whiteSpace: 'pre-wrap', fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.9 }}>
                      {streamText}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ── Tab 2: CV スコア ── */}
            {activeTab === 2 && <CVScorePanel generated={generated} />}

            {/* ── Tab 3: A/B バリアント ── */}
            {activeTab === 3 && <ABVariantsPanel generated={generated} name={form.name} target={form.target} />}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

/* ── LP プレビュー（白背景・実LP風） ── */
const LP = {
  bg:      '#ffffff',
  bg2:     '#f7f7f5',
  bg3:     '#f0ede8',
  text:    '#1c1c1e',
  text2:   '#4a4a52',
  text3:   '#8a8a94',
  border:  '#e4e2dc',
  accent:  '#2c4a7c',
  accentL: '#3a5f9a',
  amber:   '#7a5c30',
  amberBg: '#f5f0e8',
  red:     '#7a3030',
}

function LPPreview({ form, parsed, generated }: { form: any; parsed: Parsed; generated: boolean }) {
  const price        = Number(form.price).toLocaleString()
  const anchorPrice  = (Number(form.price) * 2).toLocaleString()
  const achList: string[] = form.achievements.split(/[/／]/).map((s: string) => s.trim()).filter(Boolean)
  const eyebrow      = achList.slice(0, 2).join('　|　')
  const guarantee    = achList.find((a: string) => a.includes('返金') || a.includes('保証')) ?? '分割払い対応'
  const firstTarget  = form.target.split(/[・,、]/)[0]

  const showPain    = form.appeals.includes('pain')
  const showProof   = form.appeals.includes('proof') || form.appeals.includes('number')
  const showUrgency = form.appeals.includes('urgency')
  const showAnchor  = form.appeals.includes('anchor')

  const heroHeadline    = (generated && parsed.headline)    ? parsed.headline    : form.name
  const heroSubheadline = (generated && parsed.subheadline) ? parsed.subheadline : `${form.target}を対象にした、再現性のある成果を出すプログラムです。`
  const ctaText         = (generated && parsed.cta)         ? parsed.cta         : `無料個別相談を予約する${showUrgency ? '（今月残3枠）' : ''}`
  const urgencyText     = (generated && parsed.urgency)     ? parsed.urgency     : '今月の受付は残り3名です'

  return (
    <div style={{ background: LP.bg, color: LP.text, fontFamily: 'var(--font-body)' }}>

      {/* Hero */}
      <div style={{ padding: '44px 48px 40px', textAlign: 'center', borderBottom: `1px solid ${LP.border}` }}>
        {eyebrow && (
          <div style={{ fontSize: 10.5, letterSpacing: 1.5, color: LP.text3, marginBottom: 16, fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
            {eyebrow}
          </div>
        )}
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 400, lineHeight: 1.5, marginBottom: 14, color: LP.text, whiteSpace: 'pre-line' }}>
          <span style={{ color: LP.accentL }}>{heroHeadline}</span>
        </h2>
        <p style={{ fontSize: 13, color: LP.text2, lineHeight: 1.8, maxWidth: 440, margin: '0 auto 24px' }}>
          {heroSubheadline}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ background: LP.accent, color: '#fff', padding: '11px 28px', borderRadius: 5, fontWeight: 500, fontSize: 13, cursor: 'pointer', letterSpacing: .3 }}>
            {ctaText}
          </div>
          {showUrgency && (
            <div style={{ fontSize: 11, color: LP.red, letterSpacing: .5 }}>{urgencyText}</div>
          )}
        </div>
      </div>

      {/* Pain */}
      {showPain && (
        <div style={{ padding: '28px 48px', borderBottom: `1px solid ${LP.border}`, background: LP.bg2 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, marginBottom: 14, color: LP.text }}>
            {firstTarget}の方へ — 次の状況に当てはまりますか？
          </h3>
          {[
            '広告費を増やしても成約数が比例して伸びない',
            'SNSを続けているが、問い合わせにつながらない',
            '値下げしないと売れない状況が続いている',
            '何から改善すればいいか、優先順位がわからない',
          ].map(p => (
            <div key={p} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LP.border}`, fontSize: 12.5, color: LP.text2, alignItems: 'center' }}>
              <span style={{ color: LP.red, flexShrink: 0, fontSize: 11 }}>✕</span>{p}
            </div>
          ))}
        </div>
      )}

      {/* Proof */}
      {showProof && achList.length > 0 && (
        <div style={{ padding: '28px 48px', borderBottom: `1px solid ${LP.border}` }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, marginBottom: 16, color: LP.text }}>
            実績・保証
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(achList.length, 3)}, 1fr)`, gap: 10 }}>
            {achList.slice(0, 3).map((ach, i) => (
              <div key={i} style={{ background: LP.amberBg, border: `1px solid ${LP.border}`, borderRadius: 6, padding: '14px 12px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 500, color: LP.amber, lineHeight: 1.4 }}>{ach}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Anchor */}
      {showAnchor && (
        <div style={{ padding: '14px 48px', background: LP.bg3, borderBottom: `1px solid ${LP.border}`, textAlign: 'center' }}>
          <span style={{ fontSize: 11, color: LP.text3, textDecoration: 'line-through' }}>通常価格: ¥{anchorPrice}</span>
          <span style={{ marginLeft: 12, fontSize: 11, color: LP.accentL, fontWeight: 500 }}>→ 今なら特別価格でご提供</span>
        </div>
      )}

      {/* Price */}
      <div style={{ padding: '32px 48px', textAlign: 'center', background: LP.bg2 }}>
        <div style={{ display: 'inline-block', background: LP.bg, border: `1px solid ${LP.border}`, borderRadius: 8, padding: '22px 44px' }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: LP.text3, textTransform: 'uppercase', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
            プログラム料金
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 400, color: LP.text }}>¥{price}</div>
          <div style={{ fontSize: 11, color: LP.text3, marginTop: 6 }}>{guarantee}</div>
        </div>
      </div>
    </div>
  )
}

/* ── CV スコアパネル ── */
const IMPROVEMENTS = [
  { priority: 'HIGH', label: 'CTAボタンをファーストビュー・中段・最下部の3箇所に配置', impact: 'CV率 +1.2〜1.8pt 見込み' },
  { priority: 'HIGH', label: '顔写真付き・売上数値入りの受講生の声を5件以上掲載する', impact: 'CV率 +1.0〜1.5pt 見込み' },
  { priority: 'MID',  label: 'フォームの入力項目を5→3項目（名前・メール・電話）に絞る', impact: '離脱率 −22% 見込み' },
  { priority: 'MID',  label: '価格提示前にアンカリング表現（通常価格→今の特別価格）を追加', impact: 'CV率 +0.6〜0.9pt 見込み' },
  { priority: 'LOW',  label: '画像をWebP形式に変換してページ読み込みを0.4秒短縮', impact: '直帰率 −4% 見込み' },
]

function CVScorePanel({ generated }: { generated: boolean }) {
  if (!generated) {
    return (
      <div style={{ padding: '52px 0', textAlign: 'center', color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2 }}>
        LP生成後に表示されます
      </div>
    )
  }
  return (
    <div>
      <div className="card" style={{ padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span className="eyebrow">CV予測スコア</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--green)', fontWeight: 500 }}>82 / 100</span>
        </div>
        <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
          <motion.div initial={{ width: 0 }} animate={{ width: '82%' }} transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ height: '100%', background: 'linear-gradient(90deg, var(--green), var(--blue))', borderRadius: 3 }} />
        </div>
      </div>
      <div className="eyebrow" style={{ marginBottom: 12 }}>改善提案（優先度順）</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {IMPROVEMENTS.map((imp, i) => (
          <motion.div key={i} className="card" style={{ padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}
            initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .06 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 6, flexShrink: 0,
              background: imp.priority === 'HIGH' ? 'rgba(200,88,88,.10)' : imp.priority === 'MID' ? 'rgba(168,132,74,.10)' : 'rgba(56,184,126,.10)',
              color: imp.priority === 'HIGH' ? 'var(--red)' : imp.priority === 'MID' ? 'var(--gold-l)' : 'var(--green)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1,
            }}>{imp.priority}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, color: 'var(--text)', lineHeight: 1.5, marginBottom: 5 }}>{imp.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--blue-l)' }}>→ {imp.impact}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── A/B バリアントパネル ── */
function ABVariantsPanel({ generated, name, target }: { generated: boolean; name: string; target: string }) {
  if (!generated) {
    return (
      <div style={{ padding: '52px 0', textAlign: 'center', color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2 }}>
        LP生成後に表示されます
      </div>
    )
  }

  const firstTarget = target.split(/[・,、]/)[0]
  const VARIANTS = [
    { type: 'A', style: '課題解決型（推奨）', color: 'var(--gold-l)', headline: `${firstTarget}が\n売上の壁を突破するための\n再現性ある集客設計`, cvr: '4.2%' },
    { type: 'B', style: '数値訴求型',         color: 'var(--blue-l)', headline: `受講生300名が実証した\n売上改善率280%のメソッドで\n${firstTarget}の成果を変える`, cvr: '3.8%' },
    { type: 'C', style: '共感・ストーリー型', color: 'var(--text3)',  headline: `「なぜ売れないのか」\nその答えを知ったとき\nすべてが動き始めました`, cvr: '3.5%' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div className="eyebrow" style={{ marginBottom: 4 }}>ヘッドライン A/Bバリアント</div>
      {VARIANTS.map((v, i) => (
        <motion.div key={v.type} className="card" style={{ padding: 18 }}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .08 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: v.color, letterSpacing: 2, marginBottom: 10, textTransform: 'uppercase' }}>
            Variant {v.type} — {v.style}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, color: 'var(--text)', lineHeight: 1.5, whiteSpace: 'pre-line', marginBottom: 10 }}>
            {v.headline}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: v.color }}>予測CV率: {v.cvr}</div>
        </motion.div>
      ))}
    </div>
  )
}
