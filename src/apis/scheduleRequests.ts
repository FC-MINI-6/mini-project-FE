import { client } from 'apis/index'
import { IBaseResponse, IDataResponse, ICalendarUser } from 'types/index'

export const getCalendarUserList = async (): Promise<IDataResponse<ICalendarUser[]>> => {
  const response = await client.get('/mypage/schedule/userList')
  return response.data
}
