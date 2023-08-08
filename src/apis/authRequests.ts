import { client } from './index'
import {
  IBaseResponse,
  IDataResponse,
  ILoginData,
  ILoginUser,
  ISignUpData,
  IUpdatePasswordData,
  IUpdatePhoneNumberData,
} from 'types/index'

export const loginRequest = async (params: ILoginData): Promise<IDataResponse<ILoginUser>> => {
  const response = await client.post('/login', params)
  return response.data
}

export const signUpRequest = async (params: ISignUpData): Promise<IBaseResponse> => {
  const response = await client.post('/join', params)
  return response.data
}

export const updatePassword = async (params: IUpdatePasswordData): Promise<IBaseResponse> => {
  const response = await client.put('/mypage/updatePassword', params)
  return response.data
}

export const updatePhoneNumber = async (params: IUpdatePhoneNumberData): Promise<IBaseResponse> => {
  const response = await client.put('/mypage/updatePhoneNumber', params)
  return response.data
}
