// src/app/api/generate-copy/route.ts
import Anthropic from '@anthropic-ai/sdk'

export const runtime = 'edge'

const PROMPTS: Record<string, string> = {
  email: `高単価講座（50万円）の認知獲得メルマガVol.1を生成してください。
条件：
- 件名は具体的な数値か問いかけで始める
- 本文は400〜600文字
- 「豊かな人生」「夢の実現」などの曖昧な表現は使わない
- 課題の原因を具体的に指摘し、次回への期待を作る
- 受講生の具体的な実績（数値）を1つ入れる`,

  line: `高単価講座（50万円）のLINE配信文（限定オファー）を生成してください。
条件：
- 200文字以内
- 限定性（残枠数）と緊急性を明示
- 診断・相談の内容を箇条書きで3点
- URLプレースホルダーを入れる
- 絵文字は最小限`,

  meta: `高単価講座（50万円）のMeta広告テキストをフィード用とストーリーズ用の2パターン生成してください。
条件：
- 曖昧な表現禁止、数値と実績のみで訴求
- フィード用：150〜200文字、問いかけ→実績→CTA
- ストーリーズ用：50文字以内、即行動を促す`,

  google: `高単価講座（50万円）のGoogle RSA広告を生成してください。
条件：
- 見出し15案（各30文字以内）
- 説明文4案（各90文字以内）
- 各見出しに数値・実績・限定性のいずれかを含める
- 「様々な」「充実した」などの形容詞は使わない`,
}

export async function POST(req: Request) {
  const { channel } = await req.json()
  const prompt = PROMPTS[channel] ?? PROMPTS.email

  const client = new Anthropic()
  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1200,
    messages: [{ role: 'user', content: prompt }],
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          controller.enqueue(encoder.encode(chunk.delta.text))
        }
      }
      controller.close()
    },
  })

  return new Response(readable, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
