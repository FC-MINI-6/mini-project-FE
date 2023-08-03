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
    return Promise.reject(error.response?.data as IBaseResponse)
  }
)
