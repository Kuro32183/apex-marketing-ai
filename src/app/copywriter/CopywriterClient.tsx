'use client'
// src/app/copywriter/CopywriterClient.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'

const CHANNELS = [
  { id: 'email',  label: '📧 メルマガ',         badge: 'ch-mail',   metrics: ['開封率予測', 'CVR予測'] },
  { id: 'line',   label: '💬 LINE配信',          badge: 'ch-line',   metrics: ['開封率予測', 'CVR予測'] },
  { id: 'meta',   label: '📱 Meta広告',          badge: 'ch-meta',   metrics: ['CTR予測', 'CPL予測'] },
  { id: 'google', label: '🔍 Google検索広告',    badge: 'ch-google', metrics: ['品質スコア予測', 'CTR予測'] },
]

const BADGE_STYLE: Record<string, { bg: string; color: string }> = {
  'ch-mail':   { bg: 'rgba(74,144,217,.15)',  color: 'var(--blue-l)' },
  'ch-line':   { bg: 'rgba(62,207,142,.15)',  color: 'var(--green)' },
  'ch-meta':   { bg: 'rgba(201,168,76,.15)',  color: 'var(--gold-l)' },
  'ch-google': { bg: 'rgba(240,96,96,.15)',   color: '#ff9090' },
}

const SAMPLE_COPIES: Record<string, { subject?: string; body: string; metrics: string[] }> = {
  email: {
    subject: '【売上3倍の根拠】あなたが知らない集客の本質',
    body: `件名：【売上3倍の根拠】あなたが知らない集客の本質

〇〇さん、こんにちは。

広告費を増やしても売上が比例して伸びない理由を端的にお伝えします。

原因は「露出量」ではなく、「なぜこの人から買うのか」という理由が言語化されていないことです。

受講生300名以上を支援した結果、売上が伸びた方に共通していたのは「集客の仕組み」より先に「選ばれる理由」を定義していたことでした。

次回のメールで、その具体的な手順をお伝えします。`,
    metrics: ['開封率予測: 38%', 'CVR予測: 2.8%'],
  },
  line: {
    body: `【今月限り・3名限定】無料個別診断のご案内

〇〇さん、お疲れ様です。

今月、3名限定で「売上改善の個別診断（60分・無料）」を実施します。

診断の内容：
・現状の売上課題の特定
・CV率が低い根本原因の分析
・今すぐ実施できる改善策3点の提示

↓ 今すぐ予約（先着3名で終了）
https://lin.ee/example

※空き枠は残2名です。`,
    metrics: ['開封率予測: 71%', 'CVR予測: 8.4%'],
  },
  meta: {
    body: `【Meta広告 - フィードテキスト】

広告費¥0で月商1,000万を達成した方法があります。

「そんなの無理」と思う方ほど、実は集客の仕組みを誤解しています。

受講生300名・平均売上改善率280%の実績を持つプログラムで、あなたのビジネスに合った集客設計を個別に構築します。

今なら無料の個別相談（残3枠）でロードマップを提示します。

---
【ストーリーズ用テキスト（15秒）】
売上が3倍になった理由は広告費ではありません。「選ばれる理由の言語化」です。無料相談→リンクから`,
    metrics: ['CTR予測: 3.8%', 'CPL予測: ¥2,100'],
  },
  google: {
    body: `【Google RSA - 見出し（15案）】
①売上3倍の集客戦略｜無料相談
②300名実績｜高単価講座マーケ
③6ヶ月全額返金保証付きプログラム
④今月残3枠｜先着限定オファー
⑤広告費に頼らない集客設計
⑥CPL¥2,400以下を実現する方法
⑦成約率12%を達成した導線設計
⑧個別サポート付き実践プログラム
⑨売上伸び悩みを6ヶ月で解決
⑩受講生の94%が目標達成

【説明文（4案）】
①売上に伸び悩む経営者・個人事業主向け。受講生300名・平均売上改善率280%の実績。無料個別相談で現状分析と改善策を提示します。今月残3枠。
②「集客できない」「広告費が回収できない」原因を特定し、6ヶ月で解決します。全額返金保証付き。まず無料相談から。`,
    metrics: ['品質スコア予測: 8/10', 'CTR予測: 12.4%'],
  },
}

export function CopywriterClient() {
  const [generating, setGenerating] = useState<string | null>(null)
  const [copies, setCopies] = useState<Record<string, string>>(
    Object.fromEntries(Object.entries(SAMPLE_COPIES).map(([k, v]) => [k, v.body]))
  )
  const [copiedId, setCopiedId] = useState<string | null>(null)

  async function generateChannel(channelId: string) {
    setGenerating(channelId)
    try {
      const res = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel: channelId }),
      })
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let text = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        text += decoder.decode(value)
        setCopies(prev => ({ ...prev, [channelId]: text }))
      }
    } catch {
      setCopies(prev => ({ ...prev, [channelId]: 'API接続エラー。ANTHROPIC_API_KEYを確認してください。' }))
    } finally {
      setGenerating(null)
    }
  }

  function copyToClipboard(id: string, text: string) {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  return (
    <div className="grid-2">
      {CHANNELS.map((ch, i) => {
        const sample = SAMPLE_COPIES[ch.id]
        const bs = BADGE_STYLE[ch.badge]
        const isGenerating = generating === ch.id

        return (
          <motion.div
            key={ch.id}
            className="card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * .08 }}
            style={{ overflow: 'hidden' }}
          >
            {/* Header */}
            <div style={{ padding: '13px 18px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg3)' }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{ch.label}</span>
              <span style={{ padding: '2px 8px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 1, ...bs }}>{ch.id.toUpperCase()}</span>
            </div>

            {/* Body */}
            <div style={{ padding: '16px 18px', fontSize: ch.id === 'google' ? 11 : 12.5, color: 'var(--text2)', lineHeight: 1.8, whiteSpace: 'pre-wrap', minHeight: 200, fontFamily: ch.id === 'google' ? 'var(--font-mono)' : 'inherit' }}>
              {isGenerating
                ? <span style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 1 }}>生成中...</span>
                : copies[ch.id]}
            </div>

            {/* Footer */}
            <div style={{ padding: '10px 18px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', display: 'flex', gap: 14 }}>
                {sample.metrics.map(m => {
                  const [label, val] = m.split(': ')
                  return <span key={m}>{label}: <span style={{ color: 'var(--green)' }}>{val}</span></span>
                })}
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn btn-ghost" style={{ padding: '4px 10px', fontSize: 10 }}
                  onClick={() => generateChannel(ch.id)} disabled={!!generating}>
                  再生成
                </button>
                <button className="btn btn-ghost" style={{ padding: '4px 10px', fontSize: 10, color: copiedId === ch.id ? 'var(--green)' : undefined }}
                  onClick={() => copyToClipboard(ch.id, copies[ch.id])}>
                  {copiedId === ch.id ? '✓ コピー済' : 'コピー'}
                </button>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
