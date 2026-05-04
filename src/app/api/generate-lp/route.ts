// src/app/api/generate-lp/route.ts
import Anthropic from '@anthropic-ai/sdk'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { name, price, target, achievements, appeals } = await req.json()

  const client = new Anthropic()

  const prompt = `
あなたは高単価オンライン講座（30万〜100万円）の集客に特化したコピーライターです。
以下の情報をもとに、LPのヒーローセクション用のコピーを生成してください。

【講座名】${name}
【価格】¥${Number(price).toLocaleString()}
【ターゲット】${target}
【実績・保証】${achievements}
【訴求軸】${appeals.join('、')}

出力形式（必ずこの形式で出力してください）：

## ヘッドライン
（メインのキャッチコピー・2〜3行）

## サブヘッドライン
（ヘッドラインを補足する1〜2文・具体的な数値を含める）

## CTA文言
（ボタンに入れる行動喚起の文章・15文字以内）

## 緊急性
（限定性・締め切りを訴求する1文）

## 注意事項
- 曖昧な表現（「豊かな人生」「夢の実現」など）は使わない
- 数値・実績・保証を具体的に記述する
- ターゲットが抱える具体的な課題に直接言及する
`

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
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

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
