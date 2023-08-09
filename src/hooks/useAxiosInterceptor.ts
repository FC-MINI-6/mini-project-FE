import { useEffect } from 'react'
import { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { client } from 'apis/index'
import { useUserStore } from 'stores/index'
import { IBaseResponse } from 'types/index'

export const useAxiosInterceptor = () => {
  const { userInfo, logout } = useUserStore()
  const accessToken = userInfo?.accessToken

  const apiErrorInterceptor = (error: AxiosError) => {
    return Promise.reject(error.response?.data as IBaseResponse)
  }

  const authConfig = (config: InternalAxiosRequestConfig<unknown>) => {
    if (config.headers && accessToken) {
      // AccessToken이 정상적으로 저장되어 있으면 headers에 Authorization에 값을 추가해준다.
      config.headers.Authorization = accessToken
    }
    // authorization을 추가한 config 반환
    return config
  }

  const responseErrorInterceptor = (error: AxiosError) => {
    if (accessToken) {
      if (error.response?.status === 401 && error.config!.url !== '/login') {
        // 로그아웃 처리
        alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.')
        location.replace('/login')
        logout()
        return
      }
    }

    return Promise.reject(error.response?.data as IBaseResponse)
  }

  // 요청 Interceptor
  const requestInterceptor = client.interceptors.request.use(authConfig, apiErrorInterceptor)

  // 응답 Interceptor
  const responseInterceptor = client.interceptors.response.use(
    response => response,
    responseErrorInterceptor
  )

  useEffect(() => {
    return () => {
      // interceptor 해제
      client.interceptors.request.eject(requestInterceptor)
      client.interceptors.response.eject(responseInterceptor)
    }
  }, [responseInterceptor, requestInterceptor])
}
