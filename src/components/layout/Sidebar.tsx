'use client'
// src/components/layout/Sidebar.tsx
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const NAV = [
  { group: 'Overview',  items: [
    { path: '/',           icon: '◈', label: 'ダッシュボード' },
    { path: '/spec',       icon: '📋', label: '仕様書' },
  ]},
  { group: 'AI Tools',  items: [
    { path: '/lp-generator', icon: '⬡', label: 'LP 自動生成' },
    { path: '/copywriter',   icon: '✦', label: 'セールスコピー' },
    { path: '/ads',          icon: '◎', label: '広告最適化' },
  ]},
  { group: 'Strategy',  items: [
    { path: '/funnel',   icon: '▽', label: 'ファネル分析' },
    { path: '/roadmap',  icon: '◷', label: '開発ロードマップ' },
  ]},
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside style={{
      background: 'var(--bg2)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{
        padding: '26px 22px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 22,
          fontWeight: 600,
          color: 'var(--gold)',
          letterSpacing: 3,
          display: 'block',
        }}>APEX</span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--text3)',
          letterSpacing: 3,
          textTransform: 'uppercase',
        }}>Marketing AI</span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px' }}>
        {NAV.map((group) => (
          <div key={group.group} style={{ marginBottom: 18 }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              color: 'var(--text3)',
              letterSpacing: 3,
              textTransform: 'uppercase',
              padding: '0 10px',
              marginBottom: 4,
            }}>{group.group}</div>

            {group.items.map((item) => {
              const active = pathname === item.path
              return (
                <Link key={item.path} href={item.path} style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ x: 2 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '9px 12px',
                      borderRadius: 'var(--r)',
                      cursor: 'pointer',
                      fontSize: 13,
                      color: active ? 'var(--gold-l)' : 'var(--text2)',
                      background: active ? 'var(--surface)' : 'transparent',
                      border: active ? '1px solid var(--border2)' : '1px solid transparent',
                      marginBottom: 2,
                      transition: 'background .15s, color .15s',
                    }}
                  >
                    <span style={{ fontSize: 14, width: 18, textAlign: 'center' }}>{item.icon}</span>
                    <span>{item.label}</span>
                    {active && (
                      <motion.div
                        layoutId="activeIndicator"
                        style={{
                          marginLeft: 'auto',
                          width: 5, height: 5,
                          borderRadius: '50%',
                          background: 'var(--gold)',
                        }}
                      />
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Phase badge */}
      <div style={{ padding: 14, borderTop: '1px solid var(--border)' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--gold-d), #5a3e10)',
          border: '1px solid var(--gold-d)',
          borderRadius: 6,
          padding: '10px 14px',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--gold-l)',
          letterSpacing: 1,
        }}>
          PHASE 1 — 設計・仕様策定<br />
          <span style={{ opacity: .6, fontSize: 10 }}>Next: MVP開発 (2週間後)</span>
        </div>
      </div>
    </aside>
  )
}
