import { create } from 'zustand'
import { DayOff } from '@/types'

interface DayOffList {
  dayOffList: DayOff[]
  setDayOffList: (newList: DayOff[]) => void
}

export const dayOffListStore = create<DayOffList>(set => ({
  dayOffList: [],
  setDayOffList: newList => set({ dayOffList: newList })
}))
