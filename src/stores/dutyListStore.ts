import { create } from 'zustand'

interface Duty {
  id: number
  userId: number
  username: string
  position: string
  date: string
  reason: string
  status: number
}

interface DutyList {
  dutyList: Duty[]
  setDutyList: (newList: Duty[]) => void
}

export const dutyListStore = create<DutyList>(set => ({
  dutyList: [],
  setDutyList: newList => set({ dutyList: newList })
}))
