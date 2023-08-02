import { useState } from 'react'
import { Form, Input, Button, Modal } from 'antd'
import { StyledForm, StyledFormItem } from '@/components/mypage/styled'

const MyPage = () => {



  return (
    <>
      <StyledForm>
        <StyledFormItem label="이름" name="name">
          <Input style={{ width:400}}readOnly defaultValue="Hyun Jun" />
        </StyledFormItem>
        <StyledFormItem label="이메일" name="email">
          <Input style={{ width:400}}readOnly defaultValue="qkrguswns@naver.com" />
        </StyledFormItem>
        <StyledFormItem label="직급" name="position">
          <Input style={{ width:400}}readOnly defaultValue="대리" />
        </StyledFormItem>
        <StyledFormItem label="입사일" name="joinDate">
          <Input style={{ width:400}}readOnly defaultValue="2023-08-01" />
        </StyledFormItem>
        <StyledFormItem label="전화번호" name="phoneNumber">
          <Input style={{ width:400}}readOnly defaultValue="010-1234-5678" />
        </StyledFormItem>
        <StyledFormItem>
          <Button type="primary" >
            비밀번호 변경
          </Button>
        </StyledFormItem>
      </StyledForm>


    </>
  )
}

export default MyPage
