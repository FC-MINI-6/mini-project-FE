import { create } from 'zustand'
import { IUserSearchResponse } from 'types/index'

interface IUserList {
  userList: IUserSearchResponse[]
  setUserList: (newList: IUserSearchResponse[]) => void
}

export const userListStore = create<IUserList>(set => ({
  userList: [],
  setUserList: newList => set({ userList: newList })
}))
