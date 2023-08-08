import { client } from 'apis/index'
import { IBaseResponse, IDataResponse, Employee, EmployeeUpdate } from 'types/index'

export const getEmployeeList = async (): Promise<IDataResponse<Employee[]>> => {
  const response = await client.get('/admin/users', {
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoi6rSA66as7J6QIiwiaWQiOjExLCJleHAiOjE2OTE1NTk1OTB9.S6L0fZz8-nHdoVbL-4AGDlNf6rTQlkUZESX-Kl2__q1qKh5KIWDChbFmR4AW_jpLFscptJXDbs0WCfRzErwFAw`
    }
  })
  return response.data
}

export const updateEmployee = async (
  params: EmployeeUpdate,
  userId: number
): Promise<IBaseResponse> => {
  const response = await client.put(`/admin/users/update/${userId}`, params, {
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoi6rSA66as7J6QIiwiaWQiOjExLCJleHAiOjE2OTE1NTk1OTB9.S6L0fZz8-nHdoVbL-4AGDlNf6rTQlkUZESX-Kl2__q1qKh5KIWDChbFmR4AW_jpLFscptJXDbs0WCfRzErwFAw`
    }
  })
  return response.data
}
