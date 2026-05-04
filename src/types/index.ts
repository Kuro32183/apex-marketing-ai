// src/types/index.ts

export interface CourseInput {
  name: string
  price: number
  target: string
  appeals: string[]
  achievements: string
  guarantee: string
}

export interface LPSection {
  id: string
  type: 'hero' | 'pain' | 'solution' | 'results' | 'price' | 'faq' | 'cta'
  headline: string
  body: string
  cta?: string
}

export interface LPOutput {
  sections: LPSection[]
  cvScore: number
  improvements: Improvement[]
  variants: HeadlineVariant[]
}

export interface Improvement {
  priority: 'HIGH' | 'MID' | 'LOW'
  label: string
  detail: string
  impact: string
}

export interface HeadlineVariant {
  type: 'pain' | 'number' | 'emotion'
  label: string
  headline: string
  predictedCvr: number
}

export interface CopyOutput {
  channel: 'email' | 'line' | 'meta' | 'google'
  subject?: string
  body: string
  metrics: {
    label: string
    value: string
  }[]
}

export interface AdMetric {
  label: string
  value: string
  delta: string
  trend: 'up' | 'down' | 'flat'
}

export interface AdSuggestion {
  priority: 'HIGH' | 'MID' | 'LOW'
  title: string
  detail: string
  impact: string
}

export interface FunnelStage {
  label: string
  count: number
  rate: string | null
  color: string
}

export type NavItem = {
  id: string
  label: string
  icon: string
  path: string
}
