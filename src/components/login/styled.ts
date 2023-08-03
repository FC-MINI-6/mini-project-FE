import { Button, Checkbox, Form } from 'antd'
import styled from 'styled-components'

export const LoginStyleddiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const LoginStyledForm = styled(Form)`
  width: 600px;
  padding: 40px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`

export const LoginStyledFormItemWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`

export const LoginStyledFormItem = styled(Form.Item)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
`

export const LoginStyledCheckbox = styled(Checkbox)`
  margin-right: 8px;
`

export const LoginStyledButton = styled(Button)`
  margin-left: 8px;
`
