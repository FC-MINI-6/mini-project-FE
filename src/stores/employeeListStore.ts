import { create } from 'zustand'

interface Employee {
  userId?: number
  userName: string
  userEmail: string
  userPhone: string
  userJoinedDate: string
  userPosition: string
}

interface EmployeeList {
  employeeList: Employee[]
  setEmployeeList: (newList: Employee[]) => void
}

export const employeeListStore = create<EmployeeList>(set => ({
  employeeList: [],
  setEmployeeList: newList => set({ employeeList: newList })
}))
