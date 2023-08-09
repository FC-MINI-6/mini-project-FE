import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { ILoginUser } from 'types/index'

interface IUserState {
  userInfo: ILoginUser | null
  setUserInfo: (userInfo: ILoginUser) => void
  logout: () => void
}

export const useUserStore = create(
  persist<IUserState>(
    set => ({
      userInfo: null,
      setUserInfo: (userInfo: ILoginUser) => set({ userInfo: userInfo }),
      logout: () => set({ userInfo: null })
    }),
    {
      name: 'userInfo-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
