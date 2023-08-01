import { create } from 'zustand'

interface IUserSelected {
  selectedId: string
  setSelectedId: (selectedId: string) => void
}

export const userSelectedStore = create<IUserSelected>(set => ({
  selectedId: '',
  setSelectedId: selectedId => set({ selectedId: selectedId })
}))
