// src/lib/store.ts
import { create } from 'zustand'
import type { CourseInput, LPOutput, CopyOutput } from '@/types'

interface AppStore {
  courseInput: CourseInput
  lpOutput: LPOutput | null
  copyOutputs: CopyOutput[]
  isGenerating: boolean
  activeSection: string

  setCourseInput: (v: Partial<CourseInput>) => void
  setLpOutput: (v: LPOutput) => void
  setCopyOutputs: (v: CopyOutput[]) => void
  setIsGenerating: (v: boolean) => void
  setActiveSection: (v: string) => void
}

export const useStore = create<AppStore>((set) => ({
  courseInput: {
    name: '売上10倍を実現するマーケティング完全習得プログラム',
    price: 500000,
    target: '売上に伸び悩む中小企業経営者・個人事業主',
    appeals: ['pain', 'proof'],
    achievements: '受講生累計300名 / 平均売上改善率280% / 1対1サポート / 6ヶ月保証',
    guarantee: '成果が出なければ全額返金',
  },
  lpOutput: null,
  copyOutputs: [],
  isGenerating: false,
  activeSection: 'dashboard',

  setCourseInput: (v) => set((s) => ({ courseInput: { ...s.courseInput, ...v } })),
  setLpOutput: (v) => set({ lpOutput: v }),
  setCopyOutputs: (v) => set({ copyOutputs: v }),
  setIsGenerating: (v) => set({ isGenerating: v }),
  setActiveSection: (v) => set({ activeSection: v }),
}))
