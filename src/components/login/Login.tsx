import { useState } from 'react'
import { Input} from 'antd'
import {
  Styleddiv,
  StyledForm,
  StyledFormItemWrapper,
  StyledFormItem,
  StyledCheckbox,
  StyledButton
} from './styled'

export const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setLoginData({
      ...loginData,
      [name]: value
    })
  }

  
  return (
    <Styleddiv>
      <StyledForm
        name="basic"
        labelCol={{ span: 4 }}
        initialValues={{ remember: true }}
        autoComplete="off">
        <StyledFormItem
          label="이메일"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input name="email" onChange={handleChange} value={loginData.email} />
        </StyledFormItem>

        <StyledFormItem
          label="비밀번호"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password name="password" onChange={handleChange} value={loginData.password} />
        </StyledFormItem>

        <StyledFormItemWrapper>
          <StyledFormItem name="remember" valuePropName="checked">
            <StyledCheckbox>Remember me</StyledCheckbox>
          </StyledFormItem>
          <StyledButton type="primary" htmlType="submit">
            Submit
          </StyledButton>
        </StyledFormItemWrapper>
      </StyledForm>
    </Styleddiv>
  )
}
