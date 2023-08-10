import { Button, Form } from 'antd'
import styled from 'styled-components'

export const LoginStyleddiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(238, 238, 238);
  background: radial-gradient(circle, rgba(238, 238, 238, 1) 0%, rgba(242, 242, 242, 1) 100%);
`

export const LoginWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  justify-items: center;
  align-items: center;
  min-width: 800px;
  min-height: 500px;
  border-radius: 10px;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`

export const LoginStyledForm = styled(Form)`
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  height: 100%;
  background-color: var(--color-white);
`

export const LoginStyledFormItem = styled(Form.Item)`
  width: 100%;
`

export const LoginStyledButton = styled(Button)`
  width: 100%;
`
