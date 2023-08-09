import { client } from 'apis/index'
import { IBaseResponse, IDataResponse, Employee, EmployeeUpdate } from 'types/index'

export const getEmployeeList = async (): Promise<IDataResponse<Employee[]>> => {
  const response = await client.get('/admin/users')
  return response.data
}

export const updateEmployee = async (
  params: EmployeeUpdate,
  userId: number
): Promise<IBaseResponse> => {
  const response = await client.put(`/admin/users/update/${userId}`, params)
  return response.data
}
