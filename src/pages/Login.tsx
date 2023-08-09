import { useState } from 'react'
import { Input } from 'antd'
import {
  LoginStyleddiv,
  LoginStyledForm,
  LoginStyledFormItem,
  LoginStyledFormItemWrapper,
  LoginStyledButton
} from 'components/index'
import { Link, useNavigate } from 'react-router-dom'
import { modalStore, useUserStore } from 'stores/index'
import { loginRequest } from '@/apis'
import { ILoginData } from 'types/index'
import { resultModalDatas } from '@/constants'

export const Login = () => {
  const [loginData, setLoginData] = useState<ILoginData>({ email: '', password: '' })
  const [emailError, setEmailError] = useState<string>('')
  const navigate = useNavigate()
  // 로그인한 유저 정보 전역 State
  const { setUserInfo } = useUserStore()
  const { openModal } = modalStore()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setLoginData({
      ...loginData,
      [name]: value
    })
    console.log(loginData)
  }

  const handleSubmit = async () => {
    //이메일 유효성 검사
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    if (!emailRegex.test(loginData.email)) {
      setEmailError('유효한 이메일 주소를 입력하세요.')
      return
    }
    loginRequest(loginData).then(
      res => {
        setUserInfo(res.data)
        navigate('/')
      },
      error => {
        openModal({
          ...resultModalDatas.LOGIN_FAILURE, 
          okCallback: () => {}
        })
        console.log(error)
      }
    )
  }

  return (
    <LoginStyleddiv>
      <LoginStyledForm name="basic" autoComplete="off" onFinish={handleSubmit}>
        <LoginStyledFormItem
          label="이메일"
          name="이메일"
          rules={[{ required: true, message: '이메일을 입력하세요!' }]}
          validateStatus={emailError ? 'error' : ''}
          help={emailError}>
          <Input
            style={{ width: 400 }}
            name="email"
            onChange={handleChange}
            value={loginData.email}
          />
        </LoginStyledFormItem>

        <LoginStyledFormItem
          label="비밀번호"
          name="비밀번호"
          rules={[
            { required: true, message: '비밀번호를 입력하세요!' },
            { min: 4, max: 20, message: '비밀번호는 4~20자리여야 합니다!' }
          ]}>
          <Input.Password
            style={{ width: 400 }}
            name="password"
            onChange={handleChange}
            value={loginData.password}
          />
        </LoginStyledFormItem>

        <LoginStyledFormItemWrapper>
          <LoginStyledFormItem>
            <p>
              <Link to="/signup">회원가입</Link>
            </p>
          </LoginStyledFormItem>
          <LoginStyledButton type="primary" onClick={handleSubmit}>
            로그인
          </LoginStyledButton>
        </LoginStyledFormItemWrapper>
      </LoginStyledForm>
    </LoginStyleddiv>
  )
}
