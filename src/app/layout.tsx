// src/app/layout.tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Mono, Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})
const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
})
const noto = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto',
})

export const metadata: Metadata = {
  title: 'APEX Marketing AI',
  description: '高単価講座 集客最大化 AIシステム',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${cormorant.variable} ${dmMono.variable} ${noto.variable}`}>
      <body>
        <div className="layout">
          <Sidebar />
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  )
}
