import { Button, Form } from 'antd'
import styled from 'styled-components'

export const MyPageStyleddiv = styled.div`
  display: flex;
`

export const MyPageStyledForm = styled(Form)`
  width: 600px;
  padding: 40px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
`

export const MyPageStyledFormItemWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const MyPageStyledFormItem = styled(Form.Item)`
  display: flex;
  margin-bottom: 48px;
  justify-content: flex-end;
`

export const MyPageStyledButton = styled(Button)`
  margin-left: 8px;
`
export const MyPageStyledHeaderText = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
`
export const MypageStyledSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dddddd;
  margin: 40px 0;
`
