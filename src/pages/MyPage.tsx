import { useState } from 'react'
import { Form, Input, Modal } from 'antd'
import {
  MyPageStyledButton,
  MyPageStyledForm,
  MyPageStyledFormItem,
  MyPageStyledFormItemWrapper,
  MyPageStyledHeaderText,
  MypageStyledSeparator
} from 'components/index'
import { modalStore, useUserStore } from 'stores/index'
import { updatePassword, updatePhoneNumber } from 'apis/index'
import { IUpdatePasswordData, IUpdatePhoneNumberData } from 'types/index'
import { resultModalDatas } from 'constants/index'

export const MyPage = () => {
  const [form] = Form.useForm()
  const [showModal, setShowModal] = useState(false)
  const [editablePhoneNumber, setEditablePhoneNumber] = useState<string>('')
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false)
  const { userInfo, setUserInfo } = useUserStore()
  const { openModal } = modalStore()
  const [editPassword, setEditPassword] = useState<IUpdatePasswordData>({
    userId: '',
    oldPassword: '',
    newPassword: ''
  })

  const handlePasswordChange = () => {
    setShowModal(true)
  }

  const handleModalCancel = () => {
    setShowModal(false)
    // setEditablePhoneNumber(userInfo?.phoneNumber)
  }

  const handleEditPhoneNumber = () => {
    setIsEditingPhoneNumber(true)
  }

  const handleCompletePhoneNumber = async () => {
    const updateData: IUpdatePhoneNumberData = { phoneNumber: editablePhoneNumber }
    console.log(updateData)
    if (userInfo) {
      updatePhoneNumber(updateData).then(
        res => {
          setUserInfo({
            ...userInfo,
            phoneNumber: editablePhoneNumber
          })
          openModal({
            ...resultModalDatas.EDIT_PHONENUMBER_SUCCESS,
            okCallback: () => {}
          })
          console.log(res.message)
        },
        error => {
          openModal({
            ...resultModalDatas.SIGNUP_FAILURE,
            content: resultModalDatas.EDIT_PHONENUMBER_FAILURE.content
          })
          console.log(error)
        }
      )
    }
    setIsEditingPhoneNumber(false)
  }

  const handlEditPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (userInfo) {
      setEditPassword({
        ...editPassword,
        [name]: value,
        userId: userInfo.id
      })
    }
    console.log(editPassword)
  }

  const handleModalOk = async () => {
    console.log(editPassword)
    updatePassword(editPassword).then(
      res => {
        openModal({
          ...resultModalDatas.EDIT_PASSWORD_SUCCESS,
          okCallback: () => {}
        })
        console.log(res.message)
      },
      error => {
        openModal({
          ...resultModalDatas.EDIT_PASSWORD_FAILURE,
          content: resultModalDatas.EDIT_PASSWORD_FAILURE.content
        })
        console.log(error)
      }
    )
    form.validateFields().then(values => {
      console.log('새 비밀번호:', values.newPassword)
      setShowModal(false)
      setEditPassword({
        ...editPassword,
        oldPassword: '',
        newPassword: ''
      })
    })
  }

  const phoneNumberRegex = /^[0-9]{10,11}$/

  return (
    <>
      <MyPageStyledForm form={form}>
        <MyPageStyledHeaderText>내 정보</MyPageStyledHeaderText>
      <MypageStyledSeparator/>
        <MyPageStyledFormItem label="이름" name="name">
          <Input style={{ width: 400 }} readOnly defaultValue={userInfo?.username} />
        </MyPageStyledFormItem>
        <MyPageStyledFormItem label="이메일" name="email">
          <Input style={{ width: 400 }} readOnly defaultValue={userInfo?.email} />
        </MyPageStyledFormItem>
        <MyPageStyledFormItem label="직급" name="position">
          <Input style={{ width: 400 }} readOnly defaultValue={userInfo?.position} />
        </MyPageStyledFormItem>
        <MyPageStyledFormItem label="입사일" name="joinDate">
          <Input style={{ width: 400 }} readOnly defaultValue={userInfo?.joinDate} />
        </MyPageStyledFormItem>
        <MyPageStyledFormItemWrapper>
          {isEditingPhoneNumber ? (
            <MyPageStyledFormItem
              label="전화번호"
              name="phoneNumber"
              rules={[
                { required: true, message: '전화번호를 입력하세요!' },
                {
                  pattern: phoneNumberRegex,
                  message: '전화번호는 숫자만 입력 가능합니다!'
                }
              ]}>
              <Input
                style={{ width: 330 }}
                value={editablePhoneNumber}
                onChange={e => setEditablePhoneNumber(e.target.value)}
              />
            </MyPageStyledFormItem>
          ) : (
            <MyPageStyledFormItem label="전화번호" name="phoneNumber">
              <Input style={{ width: 330 }} readOnly defaultValue={userInfo?.phoneNumber} />
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
            name="oldPassword"
            rules={[{ required: true, message: '기존 비밀번호를 입력하세요.' }]}>
            <Input.Password
              name="oldPassword"
              value={editPassword.oldPassword}
              onChange={handlEditPassword}
            />
          </MyPageStyledFormItem>
          <MyPageStyledFormItem
            label="새 비밀번호"
            name="newPassword"
            rules={[
              { required: true, message: '새 비밀번호를 입력하세요.' },
              { min: 4, max: 20, message: '비밀번호는 4~20자리여야 합니다!' }
            ]}>
            <Input.Password
              name="newPassword"
              value={editPassword.newPassword}
              onChange={handlEditPassword}
            />
          </MyPageStyledFormItem>
          <MyPageStyledFormItem
            label="새 비밀번호 확인"
            name="confirmPassword"
            rules={[
              { required: true, message: '새 비밀번호를 확인하세요.' },
              { min: 4, max: 20, message: '비밀번호는 4~20자리여야 합니다!' },
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
