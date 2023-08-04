import { create } from 'zustand'

interface UserState {
  name: string
  email: string
  position: string
  joinDate: string
  phoneNumber: string
  setUserData: (userData: Partial<UserState>) => void
}

export const useUserStore = create<UserState>(set => ({
  name: '',
  email: '',
  position: '',
  joinDate: '',
  phoneNumber: '',
  setUserData: userData => set(state => ({ ...state, ...userData }))
}))
