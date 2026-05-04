// src/app/ads/page.tsx
import { PageShell } from '@/components/layout/PageShell'
import { AdsClient } from './AdsClient'

export default function AdsPage() {
  return (
    <PageShell
      title="広告"
      titleAccent="最適化"
      desc="Meta / Google 広告のパフォーマンスをAIが解析し、ROAS最大化のための改善提案を優先度順に出力します。"
    >
      <AdsClient />
    </PageShell>
  )
}
