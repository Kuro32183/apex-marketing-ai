// src/app/copywriter/page.tsx
import { PageShell } from '@/components/layout/PageShell'
import { CopywriterClient } from './CopywriterClient'

export default function CopywriterPage() {
  return (
    <PageShell
      title="セールスコピー"
      titleAccent="自動生成"
      desc="メルマガ・LINE・Meta広告・Google広告のコピーをAIが生成します。数値と具体性を重視した訴求文を出力します。"
    >
      <CopywriterClient />
    </PageShell>
  )
}
