// src/app/lp-generator/page.tsx
import { PageShell } from '@/components/layout/PageShell'
import { LPGeneratorClient } from './LPGeneratorClient'

export default function LPGeneratorPage() {
  return (
    <PageShell
      title="LP"
      titleAccent="自動生成"
      desc="講座情報を入力するとAIがCV最適化されたランディングページの構成・コピーを生成します。"
    >
      <LPGeneratorClient />
    </PageShell>
  )
}
