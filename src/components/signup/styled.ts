import { Button, Form } from 'antd'
import styled from 'styled-components'

export const SignUpStyleddiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(238, 238, 238);
  background: radial-gradient(circle, rgba(238, 238, 238, 1) 0%, rgba(242, 242, 242, 1) 100%);

  h1 {
    text-align: center;
    margin-top: 40px;
    font-size: 36px;
    font-weight: 700;
    color: var(--color-primary);
  }
`

export const SignUpStyledForm = styled(Form)`
  width: 600px;
  padding: 0 40px 40px 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: var(--color-white);
`

export const SignUpStyledFormItemWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
`

export const SignUpStyledFormItem = styled(Form.Item)`
  flex-grow: 1;
`

export const SignUpStyledButton = styled(Button)`
  width: 100%;
`
export const SignUpStyledLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`
export const SignUpStyledLogo = styled.img`
  width: 80%;
`

export const SignUpStyledHeaderText = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-110%, -600%);
  z-index: 1;
`
export const SignUpStyledSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dddddd;
  margin: 40px 0;
`
