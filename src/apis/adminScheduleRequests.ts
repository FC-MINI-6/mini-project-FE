import { client } from 'apis/index'
import { IBaseResponse, IDataResponse, DayOff, Duty, StatusChange } from 'types/index'

export const getDayOffList = async (): Promise<IDataResponse<DayOff[]>> => {
  const response = await client.get('/admin/status', {
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoi6rSA66as7J6QIiwiaWQiOjExLCJleHAiOjE2OTE1NTk1OTB9.S6L0fZz8-nHdoVbL-4AGDlNf6rTQlkUZESX-Kl2__q1qKh5KIWDChbFmR4AW_jpLFscptJXDbs0WCfRzErwFAw`
    }
  })
  return response.data.data.dayOffList
}

export const approveOrRejectDayOff = async (
  params: StatusChange,
  dayOffId: number
): Promise<IBaseResponse> => {
  const response = await client.put(
    `/admin/status/dayoff/${dayOffId}`,
    { status: params },
    {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoi6rSA66as7J6QIiwiaWQiOjExLCJleHAiOjE2OTE1NTk1OTB9.S6L0fZz8-nHdoVbL-4AGDlNf6rTQlkUZESX-Kl2__q1qKh5KIWDChbFmR4AW_jpLFscptJXDbs0WCfRzErwFAw`
      }
    }
  )
  return response
}

export const getDutyList = async (): Promise<IDataResponse<Duty[]>> => {
  const response = await client.get('/admin/status', {
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoi6rSA66as7J6QIiwiaWQiOjExLCJleHAiOjE2OTE1NTk1OTB9.S6L0fZz8-nHdoVbL-4AGDlNf6rTQlkUZESX-Kl2__q1qKh5KIWDChbFmR4AW_jpLFscptJXDbs0WCfRzErwFAw`
    }
  })
  return response.data.data.dutyList
}

export const approveOrRejectDuty = async (
  params: StatusChange,
  dutyId: number
): Promise<IBaseResponse> => {
  const response = await client.put(
    `/admin/status/duty/${dutyId}`,
    { status: params },
    {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoi6rSA66as7J6QIiwiaWQiOjExLCJleHAiOjE2OTE1NTk1OTB9.S6L0fZz8-nHdoVbL-4AGDlNf6rTQlkUZESX-Kl2__q1qKh5KIWDChbFmR4AW_jpLFscptJXDbs0WCfRzErwFAw`
      }
    }
  )
  return response
}
