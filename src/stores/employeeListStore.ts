import { create } from 'zustand'
import { Employee } from 'types/index'

interface EmployeeList {
  employeeList: Employee[]
  setEmployeeList: (newList: Employee[]) => void
}

export const employeeListStore = create<EmployeeList>(set => ({
  employeeList: [],
  setEmployeeList: newList => set({ employeeList: newList })
}))
