import { create } from 'zustand'
import { ICalendarUser } from 'types/index'

interface IUserList {
  userList: ICalendarUser[]
  setUserList: (newList: ICalendarUser[]) => void
}

export const userListStore = create<IUserList>(set => ({
  userList: [],
  setUserList: newList => set({ userList: newList })
}))
