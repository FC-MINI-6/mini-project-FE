// API 호출 시 기본 응답 Interface
// message만 있는 경우
export interface IBaseResponse {
  success: boolean
  message: string | null
}

// data를 받는 경우 제네릭으로 타입 명시
export interface IDataResponse<T> {
  success: boolean
  data: T
}
