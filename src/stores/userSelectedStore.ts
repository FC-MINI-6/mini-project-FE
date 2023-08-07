import { create } from 'zustand'

interface IUserSelected {
  selectedId: number | null
  setSelectedId: (selectedId: number | null) => void
}

export const userSelectedStore = create<IUserSelected>(set => ({
  selectedId: null,
  setSelectedId: selectedId => set({ selectedId: selectedId })
}))
