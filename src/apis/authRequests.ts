import { client } from 'apis/index'
import { IBaseResponse } from 'types/index'

export const loginRequest = async (): Promise<IBaseResponse> => {
  const response = await client.post('/login', { email: 'admin@admin.com', password: '1234' })
  return response.data
}
