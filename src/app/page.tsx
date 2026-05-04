// src/app/page.tsx
import { PageShell } from '@/components/layout/PageShell'
import { DashboardClient } from './DashboardClient'

export default function DashboardPage() {
  return (
    <PageShell
      title="高単価講座"
      titleAccent="集客最大化システム"
      desc="LP自動生成・セールスコピー・広告最適化を一気通貫で管理します。"
    >
      <DashboardClient />
    </PageShell>
  )
}
