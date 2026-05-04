// src/app/api/generate-lp/route.ts
import Anthropic from '@anthropic-ai/sdk'

export const runtime = 'edge'

const REFERENCE_EXAMPLES = [
  {
    industry: 'ビジネスコーチング',
    name: '月商5倍実現コーチングプログラム',
    headline: '月商30万の個人事業主が6ヶ月で月商500万を達成した、再現性のある事業成長メソッド',
    subheadline: '受講生42名・月商5倍達成率78%・全額返金保証付き。無料個別診断で現状の課題を特定します。',
    cta: '無料個別診断を予約する',
    urgency: '今月の受付は残4名。月末で締め切ります。',
  },
  {
    industry: 'ダイエット・フィットネス',
    name: '代謝改善ダイエットプログラム',
    headline: '食事制限なし・ジム不要で3ヶ月-12kgを実現した、リバウンドしない代謝改善メソッド',
    subheadline: '受講生230名・平均-8.4kg・リバウンド率わずか3%。体質に合わせた個別プランで確実に痩せます。',
    cta: '無料体質診断を受ける',
    urgency: '次回スタートは来月1日。受付は残5名です。',
  },
  {
    industry: 'SNS・Webマーケティング',
    name: 'Instagram集客完全習得プログラム',
    headline: 'フォロワー0から3ヶ月で月商50万を達成した、広告費不要のInstagram集客の全手順',
    subheadline: '受講生95名・月商50万達成率67%・個別フィードバック付き。3ヶ月で再現性ある集客システムを構築。',
    cta: '無料戦略相談を予約する',
    urgency: '今月の個別相談は残2枠です。',
  },
  {
    industry: 'IT・プログラミング',
    name: 'Webエンジニア転職プログラム',
    headline: '文系・未経験から6ヶ月でWebエンジニアに転職。年収+120万円を実現した完全カリキュラム',
    subheadline: '受講生340名・転職成功率91%・平均年収UP+120万円。現役エンジニアによる1対1メンタリング付き。',
    cta: '無料キャリア相談を予約する',
    urgency: '来月コース開始。説明会の受付は今週末まで。',
  },
  {
    industry: '不動産・資産運用',
    name: '不動産投資実践プログラム',
    headline: '自己資金200万円から36ヶ月で年間家賃収入300万円を実現した、再現性のある投資ロードマップ',
    subheadline: '参加者520名・平均表面利回り8.4%・現役大家によるメンタリング。物件選定から融資まで完全サポート。',
    cta: '無料投資相談を申し込む',
    urgency: '次回セミナーの残席は8名です。',
  },
  {
    industry: '語学・英語',
    name: 'TOEIC900点突破プログラム',
    headline: '3ヶ月でTOEIC200点UPを実現した、ビジネス英語集中メソッド。昇進・海外赴任を現実にします。',
    subheadline: '受講生180名・平均スコアUP+210点・合格率88%。現在のスコアに合わせた個別カリキュラム。',
    cta: '無料レベル診断を受ける',
    urgency: '今月の受付は残3名。来月開始コースの予約受付中。',
  },
]

export async function POST(req: Request) {
  const body = await req.json()
  const { industry, name, price, target, achievements, appeals } = body

  // ランダムにリファレンス企業を選択（サーバー側で毎回変わる）
  const ref = REFERENCE_EXAMPLES[Math.floor(Math.random() * REFERENCE_EXAMPLES.length)]

  const client = new Anthropic()

  const prompt = `
あなたは高単価サービス（30万〜100万円）のLP制作に特化したトップコピーライターです。
以下のサービス情報と参考事例をもとに、LPのヒーローセクション用コピーを生成してください。

【生成対象サービス情報】
- 業種カテゴリ：${industry}
- サービス・講座名：${name}
- 価格：¥${Number(price).toLocaleString()}
- ターゲット顧客：${target}
- 実績・保証：${achievements}
- 訴求の優先軸：${appeals.join('、')}

【参考にする成功事例（${ref.industry}）】
- サービス名：${ref.name}
- 実績ヘッドライン：${ref.headline}
- サブコピー：${ref.subheadline}
- CTA：${ref.cta}
- 緊急性表現：${ref.urgency}

上記の参考事例のコピーライティング手法（構造・訴求の組み立て方）を参考にしつつ、
生成対象サービスの情報・業種・ターゲットに完全に最適化したコピーを生成してください。

【出力形式（この形式を厳守してください）】

## ヘッドライン
（メインキャッチコピー・2〜3行。ターゲットの課題や変化を具体的に表現する）

## サブヘッドライン
（ヘッドラインを補足する1〜2文。実績・数値・保証を盛り込む）

## CTA文言
（ボタンテキスト・15文字以内・行動を明確に促す）

## 緊急性
（限定性・締め切りを伝える1文・具体的な数字を使う）

【制作ルール】
- 「豊かな人生」「夢の実現」などの抽象表現は使わない
- ターゲットが日常的に感じている具体的な課題に直接言及する
- 数値・実績・保証を可能な限り具体的に記述する
- 参考事例と同じ業種のコピーを生成しない（業種を変えて最適化すること）
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
