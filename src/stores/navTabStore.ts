import { create } from 'zustand'

interface NavTab {
  tabNumber: number
}
interface NavTabState {
  tabNumber: NavTab
  setTabNumber: (tabNumber: NavTab) => void
}

export const navTabStore = create<NavTabState>(set => ({
  tabNumber: null,
  setTabNumber: tabNumber => set({ tabNumber: tabNumber })
}))
