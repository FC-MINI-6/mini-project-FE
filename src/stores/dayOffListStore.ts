import { create } from 'zustand'

interface DayOff {
  id: number
  userId: number
  username: string
  position: string
  startDate: string
  endDate: string
  reason: string
  type: number
  status: number
}

interface DayOffList {
  dayOffList: DayOff[]
  setDayOffList: (newList: DayOff[]) => void
}

export const dayOffListStore = create<DayOffList>(set => ({
  dayOffList: [],
  setDayOffList: newList => set({ dayOffList: newList })
}))
