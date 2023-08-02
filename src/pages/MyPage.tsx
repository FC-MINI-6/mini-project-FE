import { useState } from 'react'
import { Form, Input, Button, Modal } from 'antd'
import { StyledButton, StyledForm, StyledFormItem, StyledFormItemWrapper } from '@/components/mypage/styled'

const MyPage = () => {
  const [form] = Form.useForm()
  const [showModal, setShowModal] = useState(false)
  const [editablePhoneNumber, setEditablePhoneNumber] = useState('010-1234-1234')//
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false)

  const handlePasswordChange = () => {
    setShowModal(true)
  }

  const handleModalCancel = () => {
    setShowModal(false)
  }

  const handleEditPhoneNumber = () => {
    setIsEditingPhoneNumber(true)
  }

  const handleCompletePhoneNumber = () => {
    //전화번호 변경 처리 로직
    setIsEditingPhoneNumber(false)
  }

  const handleModalOk = () => {
    // 비밀번호 변경 처리 로직
    form.validateFields().then(values => {
      console.log('새 비밀번호:', values.newPassword)
      setShowModal(false)
    })
  }

  return (
    <>
      <StyledForm form={form}>
        <StyledFormItem label="이름" name="name">
          <Input style={{ width:400 }} readOnly defaultValue="Hyun Jun" />
        </StyledFormItem>
        <StyledFormItem label="이메일" name="email">
          <Input style={{ width:400 }} readOnly defaultValue="qkrguswns@naver.com" />
        </StyledFormItem>
        <StyledFormItem label="직급" name="position">
          <Input style={{ width:400 }} readOnly defaultValue="대리" />
        </StyledFormItem>
        <StyledFormItem label="입사일" name="joinDate">
          <Input style={{ width:400 }} readOnly defaultValue="2023-08-01" />
        </StyledFormItem>
        <StyledFormItemWrapper>
          {isEditingPhoneNumber ? (
            <StyledFormItem label="전화번호" name="phoneNumber">
              <Input
                style={{ width: 330 }}
                value={editablePhoneNumber}
                onChange={(e) => setEditablePhoneNumber(e.target.value)}
              />
            </StyledFormItem>
          ) : (
            <StyledFormItem label="전화번호" name="phoneNumber">
              <Input style={{ width: 330 }} readOnly defaultValue={editablePhoneNumber} />
            </StyledFormItem>
          )}
          {isEditingPhoneNumber ? (
            <StyledButton onClick={handleCompletePhoneNumber}>완료</StyledButton>
          ) : (
            <StyledButton onClick={handleEditPhoneNumber}>수정</StyledButton>
          )}
        </StyledFormItemWrapper>
        <StyledFormItem>
          <Button type="primary" onClick={handlePasswordChange}>
            비밀번호 변경
          </Button>
        </StyledFormItem>
      </StyledForm>

      <Modal
        visible={showModal}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        title="비밀번호 변경">
        <Form form={form}>
          <StyledFormItem
            label="기존 비밀번호"
            name="currentPassword"
            rules={[{ required: true, message: '기존 비밀번호를 입력하세요.' }]}>
            <Input.Password />
          </StyledFormItem>
          <StyledFormItem
            label="새 비밀번호"
            name="newPassword"
            rules={[{ required: true, message: '새 비밀번호를 입력하세요.' }]}>
            <Input.Password />
          </StyledFormItem>
          <StyledFormItem
            label="새 비밀번호 확인"
            name="confirmPassword"
            rules={[
              { required: true, message: '새 비밀번호를 확인하세요.' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('새 비밀번호와 일치하지 않습니다.')
                }
              })
            ]}>
            <Input.Password />
          </StyledFormItem>
        </Form>
      </Modal>
    </>
  )
}

export default MyPage
