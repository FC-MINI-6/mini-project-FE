import { create } from 'zustand';

interface IUserState {
  isLoggedIn: boolean; 
  accessToken: string | null; 
  id: string
  name: string;
  email: string;
  position: string;
  joinDate: string;
  phoneNumber: string;
  setUserData: (userData: Partial<IUserState>) => void;
  setAccessToken: (accessToken: string | null) => void; 
  logout: () => void;
}

export const useUserStore = create<IUserState>((set) => ({
  isLoggedIn: false,
  id: '',
  name: '',
  email: '',
  phoneNumber: '',
  position: '',
  joinDate: '',
  accessToken: '',
  setUserData: (userData) => set((state) => ({ ...state, ...userData })),
  setAccessToken: (accessToken) => set((state) => ({ ...state, accessToken })),
  logout: () =>
    set({
      isLoggedIn: false,
      id: '',
      name: '',
      email: '',
      phoneNumber: '',
      position: '',
      joinDate: '',
      accessToken: '',
    }),
}));