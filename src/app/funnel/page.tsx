// src/app/funnel/page.tsx
import { PageShell } from '@/components/layout/PageShell'
import { FunnelClient } from './FunnelClient'
export default function FunnelPage() {
  return (
    <PageShell title="ファネル" titleAccent="分析" desc="広告クリックから成約までの各ステップのCV率・ドロップ率を数値で把握します。">
      <FunnelClient />
    </PageShell>
  )
}
