import { useState } from 'react'
import { Input } from 'antd'
import {
  LoginStyleddiv,
  LoginStyledForm,
  LoginStyledFormItem,
  LoginStyledFormItemWrapper,
  LoginStyledCheckbox,
  LoginStyledButton
} from 'components/index'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface LoginData {
  email: string
  password: string
}

export const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' })
  const [emailError, setEmailError] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setLoginData({
      ...loginData,
      [name]: value
    })
    console.log(event.target)
  }

  const handleSubmit = async () => {
    //이메일 유효성 검사
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    if (!emailRegex.test(loginData.email)) {
      setEmailError('유효한 이메일 주소를 입력하세요.')
      return
    }
    try {
      const response = await axios.post(api, loginData)
      console.log('API 호출 성공!')
      console.log(response.data)
    } catch (error) {
      console.error('API 호출 실패!')
      console.error(error)
    }
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
          <LoginStyledFormItem name="remember" valuePropName="checked">
            <LoginStyledCheckbox>Remember me</LoginStyledCheckbox>
          </LoginStyledFormItem>
          <LoginStyledFormItem>
            <p>
              <Link to="/signup">회원가입</Link>
            </p>
          </LoginStyledFormItem>
          <LoginStyledButton type="primary" htmlType="submit">
            로그인
          </LoginStyledButton>
        </LoginStyledFormItemWrapper>
      </LoginStyledForm>
    </LoginStyleddiv>
  )
}
