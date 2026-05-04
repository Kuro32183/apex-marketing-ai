// src/app/api/analyze-ads/route.ts
import Anthropic from '@anthropic-ai/sdk'

export const runtime = 'edge'

export async function POST() {
  const client = new Anthropic()

  const data = {
    spend: 384000,
    revenue: 3150000,
    roas: 820,
    cpl: 2480,
    ctr: 3.5,
    cvr: 11.8,
    lpToFormRate: 20,
    industryAvgLpToForm: 35,
  }

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 800,
    messages: [{
      role: 'user',
      content: `以下の広告パフォーマンスデータを分析し、最も重要な改善ポイントを3点、具体的なアクション付きで出力してください。

データ:
- 広告費: ¥${data.spend.toLocaleString()}
- 売上: ¥${data.revenue.toLocaleString()}
- ROAS: ${data.roas}%
- CPL: ¥${data.cpl}
- CTR: ${data.ctr}%
- 成約率: ${data.cvr}%
- LP→フォーム到達率: ${data.lpToFormRate}%（業界平均: ${data.industryAvgLpToForm}%）

条件:
- 曖昧な表現禁止
- 各改善点に「何を」「どう変える」「期待値」を明記
- 優先度の高い順に出力`,
    }],
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
