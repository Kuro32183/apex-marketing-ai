'use client'
// src/components/layout/PageShell.tsx
import { motion } from 'framer-motion'

interface Props {
  title: string
  titleAccent?: string
  desc?: string
  actions?: React.ReactNode
  children: React.ReactNode
}

export function PageShell({ title, titleAccent, desc, actions, children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="page"
    >
      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 28,
        paddingBottom: 22,
        borderBottom: '1px solid var(--border)',
      }}>
        <div>
          <h1 className="section-title">
            {title}{titleAccent && <> <em>{titleAccent}</em></>}
          </h1>
          {desc && <p className="section-desc">{desc}</p>}
        </div>
        {actions && <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>{actions}</div>}
      </div>

      {children}
    </motion.div>
  )
}
