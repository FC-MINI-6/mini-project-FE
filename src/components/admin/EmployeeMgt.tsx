import React, { useState } from 'react'
import { Input, Table, Modal, Select, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { styled } from 'styled-components'
const { Search } = Input
const { Option } = Select

const onSearch = (value: string) => console.log(value)

interface DataType {
  key: React.Key
  name: string
  email: string
  phone: string
  joinDate: string
  position: string
}

const columns: ColumnsType<DataType> = [
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    // render: text => <a>{text}</a>,
    width: 150
  },
  {
    title: '이메일',
    dataIndex: 'email',
    key: 'email',
    align: 'center',
    width: 200
  },
  {
    title: '연락처',
    dataIndex: 'phone',
    key: 'phone',
    align: 'center'
  },
  {
    title: '입사일',
    dataIndex: 'joinDate',
    key: 'joinDate',
    align: 'center'
  },
  {
    title: '직급',
    dataIndex: 'position',
    key: 'position',
    align: 'center'
  }
]

const data: DataType[] = [
  {
    key: '1',
    name: '김어쩌구',
    email: 'abc@gmail.com',
    phone: '010-2345-6789',
    joinDate: '2022-07-01',
    position: '대리'
  },
  {
    key: '2',
    name: '김저쩌구',
    email: 'aef@gmail.com',
    phone: '010-2345-6789',
    joinDate: '2022-04-01',
    position: '차장'
  }
]

// 전화번호 유효성 검사 함수
const isValidPhoneNumber = (value: string) => {
  console.log(value)
  const phoneNumberPattern = /^\d{3}-\d{4}-\d{4}$/
  return phoneNumberPattern.test(value)
}

export const EmployeeMgt = () => {
  const [selectedRowData, setSelectedRowData] = useState<DataType | null>(null)
  const [updatedRowData, setUpdatedRowData] = useState<DataType | null>(null)
  const handleRowClick = (record: DataType) => {
    setSelectedRowData(record)
  }

  const handleCloseModal = () => {
    setSelectedRowData(null)
  }

  const handleUpdate = () => {
    if (updatedRowData) {
      // 수정된 내용을 원래 데이터에 반영
      setSelectedRowData(updatedRowData)
      setUpdatedRowData(null) // 수정된 데이터를 초기화
    }
  }

  const handlePositionChange = (value: string) => {
    if (selectedRowData) {
      setSelectedRowData({ ...selectedRowData, position: value })
    }
  }
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    // 입력값이 숫자로만 이루어진 문자열이고, xxx-xxxx-xxxx 형식에 맞으면 수정
    if (/^\d*$/.test(value) && isValidPhoneNumber(value)) {
      setUpdatedRowData({ ...selectedRowData, phone: value }) // 변경된 값을 updatedRowData에 반영
    } else {
      setUpdatedRowData(null) // 유효성 검사를 통과하지 않을 경우 updatedRowData를 초기화
    }
  }

  console.log(selectedRowData?.phone)

  return (
    <>
      <Search placeholder="Search" onSearch={onSearch} style={{ width: '50%' }} />
      <Table
        columns={columns}
        dataSource={data}
        onRow={record => ({
          onClick: () => handleRowClick(record)
        })}
      />
      <Modal
        title="사원 세부 정보"
        open={!!selectedRowData}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            취소
          </Button>,
          <Button key="update" type="primary" onClick={handleUpdate}>
            수정완료
          </Button>
        ]}>
        {selectedRowData && (
          <Container>
            <Item>
              <h3>이름</h3>
              <h4>{selectedRowData.name}</h4>
            </Item>
            <Item>
              <h3>직급</h3>
              <Select
                value={selectedRowData.position}
                onChange={handlePositionChange}
                style={{ width: '100%' }}>
                <Option value="대리">대리</Option>
                <Option value="차장">차장</Option>
                <Option value="부장">부장</Option>
              </Select>
            </Item>
            <Item>
              <h3>이메일</h3>
              <h4>{selectedRowData.email}</h4>
            </Item>

            <Item>
              <h3>입사일</h3>
              <h4>{selectedRowData.joinDate}</h4>
            </Item>
            <Item>
              <h3>잔여 휴가(일)</h3>
              <h4>2</h4>
            </Item>
            <Item>
              <h3>연락처</h3>
              <Input
                value={selectedRowData.phone || null}
                onChange={e => handlePhoneChange(e)}
                style={{ width: '100%' }}
                placeholder="xxx-xxxx-xxxx 형식으로 입력해주세요."
                maxLength={13} // xxx-xxxx-xxxx 형식에서 '-' 포함 총 13글자를 입력받도록 제한
              />
            </Item>
            <Item>
              <h3>권한</h3>
              <Select
                value={selectedRowData.authority}
                // onChange={handleAuthorityChange}
                style={{ width: '100%' }}>
                <Option value="일반사용자">일반사용자</Option>
                <Option value="관리자">관리자</Option>
              </Select>
            </Item>
          </Container>
        )}
      </Modal>
    </>
  )
}

const Container = styled.div`
  width: 400px;
  display: grid;
  grid-template-rows: repeat(3, 70px);
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 80px;
  gap: 10px 20px;
  justify-content: space-between;
  align-items: center;
`

const Item = styled.div`
  align-items: center;
  &:nth-child(3) {
    grid-column: span 2;
  }
  h4 {
    padding: 0 10px;
    border: 1px solid #c1c1c1;
    border-radius: 5px;
    height: 35px;
    line-height: 35px;
    // font-size: 20px;
  }
  h3 {
    font-size: 16px;
    font-weight: 400;
  }
`
