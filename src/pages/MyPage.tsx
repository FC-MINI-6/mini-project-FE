import { useState } from 'react'
import { Form, Input, Modal } from 'antd'
import {
  MyPageStyledButton,
  MyPageStyledForm,
  MyPageStyledFormItem,
  MyPageStyledFormItemWrapper,
} from 'components/index'

export const MyPage = () => {
  const [form] = Form.useForm()
  const [showModal, setShowModal] = useState(false)
  const [editablePhoneNumber, setEditablePhoneNumber] = useState('010-1234-1234') //
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
      <MyPageStyledForm form={form}>
        <MyPageStyledFormItem label="이름" name="name">
          <Input style={{ width: 400 }} readOnly defaultValue="Hyun Jun" />
        </MyPageStyledFormItem>
        <MyPageStyledFormItem label="이메일" name="email">
          <Input style={{ width: 400 }} readOnly defaultValue="qkrguswns@naver.com" />
        </MyPageStyledFormItem>
        <MyPageStyledFormItem label="직급" name="position">
          <Input style={{ width: 400 }} readOnly defaultValue="대리" />
        </MyPageStyledFormItem>
        <MyPageStyledFormItem label="입사일" name="joinDate">
          <Input style={{ width: 400 }} readOnly defaultValue="2023-08-01" />
        </MyPageStyledFormItem>
        <MyPageStyledFormItemWrapper>
          {isEditingPhoneNumber ? (
            <MyPageStyledFormItem label="전화번호" name="phoneNumber">
              <Input
                style={{ width: 330 }}
                value={editablePhoneNumber}
                onChange={e => setEditablePhoneNumber(e.target.value)}
              />
            </MyPageStyledFormItem>
          ) : (
            <MyPageStyledFormItem label="전화번호" name="phoneNumber">
              <Input style={{ width: 330 }} readOnly defaultValue={editablePhoneNumber} />
            </MyPageStyledFormItem>
          )}
          {isEditingPhoneNumber ? (
            <MyPageStyledButton onClick={handleCompletePhoneNumber}>완료</MyPageStyledButton>
          ) : (
            <MyPageStyledButton onClick={handleEditPhoneNumber}>수정</MyPageStyledButton>
          )}
        </MyPageStyledFormItemWrapper>
        <MyPageStyledFormItem>
          <MyPageStyledButton type="primary" onClick={handlePasswordChange}>
            비밀번호 변경
          </MyPageStyledButton>
        </MyPageStyledFormItem>
      </MyPageStyledForm>

      <Modal
        visible={showModal}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        title="비밀번호 변경">
        <Form form={form}>
          <MyPageStyledFormItem
            label="기존 비밀번호"
            name="currentPassword"
            rules={[{ required: true, message: '기존 비밀번호를 입력하세요.' }]}>
            <Input.Password />
          </MyPageStyledFormItem>
          <MyPageStyledFormItem
            label="새 비밀번호"
            name="newPassword"
            rules={[{ required: true, message: '새 비밀번호를 입력하세요.' }]}>
            <Input.Password />
          </MyPageStyledFormItem>
          <MyPageStyledFormItem
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
          </MyPageStyledFormItem>
        </Form>
      </Modal>
    </>
  )
}
