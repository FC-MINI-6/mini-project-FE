import axios, { AxiosError } from 'axios'
import { IBaseResponse } from 'types/index'

export const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

client.interceptors.request.use(
  function (config) {
    return config
  },
  function (error: AxiosError) {
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    console.log(error)
    if (error.response?.status === 401 && error.config!.url !== '/login') {
      // 로그아웃 처리
      alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.')
      location.replace('/login')
      return
    }
    return Promise.reject(error.response?.data as IBaseResponse)
  }
)
