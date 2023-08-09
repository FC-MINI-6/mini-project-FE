import { create } from 'zustand'
import { Duty } from 'types/index'

interface DutyList {
  dutyList: Duty[]
  setDutyList: (newList: Duty[]) => void
}

export const dutyListStore = create<DutyList>(set => ({
  dutyList: [],
  setDutyList: newList => set({ dutyList: newList })
}))
