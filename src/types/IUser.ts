//로그인 요청
export interface ILoginData {
  email: string
  password: string
}

//로그인 응답
export interface ILoginUser {
  id: string
  username: string
  email: string
  position: string
  joinDate: string
  phoneNumber: string
  roles: string
  accessToken: string
}

//회원가입 요청
export interface ISignUpData {
  username: string
  position: string
  email: string
  joinDate: string
  password: string
  phoneNumber: string
}

//비밀번호 변경 요청
export interface IUpdatePasswordData {
  userId: string
  oldPassword: string
  newPassword: string
}

//핸드폰번호 변경 요청
export interface IUpdatePhoneNumberData {
  phoneNumber: string
}
