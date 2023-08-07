import { useState, useEffect } from 'react'
import { DatePicker, Input, Select, Space } from 'antd'
import axios from 'axios'
import { Dayjs } from 'dayjs'

import {
  SignUpStyledFormItem,
  SignUpStyledFormItemWrapper,
  SignUpStyledForm,
  SignUpStyleddiv,
  SignUpStyledButton
} from 'components/index'

interface SignUpData {
  name: string
  position: string
  email: string
  joinDate: string
  password: string
  phoneNumber: string
}

export const SignUp = () => {
  const [signUpData, setSignUpData] = useState<SignUpData>({
    name: '',
    position: '',
    email: '',
    joinDate: '',
    password: '',
    phoneNumber: ''
  })
  useEffect(() => {
    console.log(signUpData)
  }, [signUpData])

  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<string>('')
  const [date, setDate] = useState<Dayjs | null>(null); 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setSignUpData({
      ...signUpData,
      [name]: value
    })
  }

  const handleDatePickerChange = (date: Dayjs | null, dateString: string) => {
    setDate(date); // date 변수 업데이트
    setSignUpData(prevData => ({
      ...prevData,
      joinDate: date ? dateString : '' // 선택된 날짜 문자열을 signUpData의 joinDate에 저장
    }));
  };

  const handlePositionChange = (value: string) => {
    setSignUpData({
      ...signUpData,
      position: value
    })
  }

  const handlePasswordConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setPasswordConfirm(value)
  }

  const handleSubmit = async () => {
    //전체 유효성검사
    if (!signUpData.email || !signUpData.joinDate || !signUpData.name || !signUpData.password || !signUpData.phoneNumber || !signUpData.position) {
      return
    }
    //이메일 유효성검사
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    if (!emailRegex.test(signUpData.email)) {
      setEmailError('유효한 이메일 주소를 입력하세요.')
      return
    }
    //비밀번호확인 유효성검사
    if (signUpData.password === passwordConfirm) {
      try {
        const response = await axios.post(api, signUpData)
        console.log('API 호출 성공!')
        console.log(response.data)
      } catch (error) {
        console.error('API 호출 실패!')
        console.error(error)
      }
    } else {
      console.log('비밀번호 확인 실패!')
      setPasswordMismatch(true)
    }
  }

  //핸드폰번호 유효성 검사.
  const phoneNumberRegex = /^[0-9]{10,11}$/

  return (
    <SignUpStyleddiv>
      <SignUpStyledForm name="basic" autoComplete="off" onFinish={handleSubmit}>
        <SignUpStyledFormItemWrapper>
          <SignUpStyledFormItem
            label="이름"
            name="이름"
            rules={[{ required: true, message: '이름을 입력하세요!' }]}>
            <Input
              style={{ width: 250 }}
              name="name"
              onChange={handleChange}
              value={signUpData.name}
            />
          </SignUpStyledFormItem>

          <Space wrap>
            <SignUpStyledFormItem
              name="직급"
              rules={[{ required: true, message: '직급을 입력하세요!' }]}>
              <Select
                style={{ width: 150 }}
                placeholder="직급 선택"
                onChange={handlePositionChange}
                options={[
                  { value: '사원', label: '사원' },
                  { value: '주임', label: '주임' },
                  { value: '대리', label: '대리' },
                  { value: '과장', label: '과장' },
                  { value: '차장', label: '차장' }
                ]}
              />
            </SignUpStyledFormItem>
          </Space>
        </SignUpStyledFormItemWrapper>

        <SignUpStyledFormItemWrapper>
          <SignUpStyledFormItem
            label="이메일"
            name="이메일"
            rules={[{ required: true, message: '이메일을 입력하세요!' }]}
            validateStatus={emailError ? 'error' : ''}
            help={emailError}>
            <Input
              style={{ width: 250 }}
              name="email"
              onChange={handleChange}
              value={signUpData.email}
            />
          </SignUpStyledFormItem>
          <SignUpStyledFormItem
            name="입사일"
            rules={[{ required: true, message: '입사일을 입력하세요!' }]}>
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="입사일 선택"
              style={{ width: 150 }}
              value={date}
              onChange={handleDatePickerChange} 
            />
          </SignUpStyledFormItem>
        </SignUpStyledFormItemWrapper>

        <SignUpStyledFormItem
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
            value={signUpData.password}
          />
        </SignUpStyledFormItem>

        <SignUpStyledFormItem
          label="비밀번호 확인"
          name="비밀번호 확인"
          rules={[
            { required: true, message: '비밀번호를 입력하세요!' },
            { min: 4, max: 20, message: '비밀번호는 4~20자리여야 합니다!' }
          ]}
          validateStatus={passwordMismatch ? 'error' : ''}
          help={passwordMismatch ? '비밀번호가 일치하지 않습니다.' : ''}>
          <Input.Password
            style={{ width: 400 }}
            name="passwordConfirm"
            onChange={handlePasswordConfirmChange}
            value={passwordConfirm}
          />
        </SignUpStyledFormItem>

        <SignUpStyledFormItem
          label="전화번호"
          name="전화번호"
          rules={[
            { required: true, message: '전화번호를 입력하세요!' },
            {
              pattern: phoneNumberRegex,
              message: '전화번호는 숫자만 입력 가능합니다!'
            }
          ]}>
          <Input
            style={{ width: 350 }}
            name="phonNumber"
            onChange={handleChange}
            value={signUpData.phoneNumber}
            defaultValue=""
          />
        </SignUpStyledFormItem>

        <SignUpStyledFormItemWrapper>
          <SignUpStyledButton type="primary" htmlType="submit">
            가입하기
          </SignUpStyledButton>
        </SignUpStyledFormItemWrapper>
      </SignUpStyledForm>
    </SignUpStyleddiv>
  )
}
