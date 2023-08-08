import React, { useState, useEffect } from 'react'
import { Input, Table, Modal, Select, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { styled } from 'styled-components'
import { getEmployeeList, updateEmployee } from 'apis/index'
import { employeeListStore } from 'stores/index'
import { Employee, EmployeeUpdate } from 'types/index'
const { Search } = Input
const { Option } = Select

const getPositionLabel = position => {
  switch (position) {
    case 0:
      return '사원'
    case 1:
      return '주임'
    case 2:
      return '대리'
    case 3:
      return '과장'
    case 4:
      return '차장'
    case 5:
      return '부장'
    default:
      return ''
  }
}

const columns: ColumnsType<Employee> = [
  {
    title: '이름',
    dataIndex: 'username',
    key: 'username',
    align: 'center',
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
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
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
    align: 'center',
    render: position => getPositionLabel(position)
  }
]

export const EmployeeMgt = () => {
  const { employeeList, setEmployeeList } = employeeListStore()
  const [selectedRowData, setSelectedRowData] = useState<Employee | null>(null)
  const [updatedRowData, setUpdatedRowData] = useState<EmployeeUpdate | null>(null)

  const onSearch = (value: string) => {
    const filteredEmployeeList = employeeList.filter(
      employee => employee.username.includes(value) || employee.email.includes(value)
    )
    setEmployeeList(filteredEmployeeList)
  }

  const resetEmployeeList = () => {
    getUserList()
  }

  const getUserList = () => {
    getEmployeeList().then(
      res => {
        const employeesWithKeys = res.data.map(employee => ({
          ...employee,
          key: employee.userId
        }))
        setEmployeeList(employeesWithKeys)
      },
      error => {
        console.log(error.message)
      }
    )
  }

  useEffect(() => {
    getUserList()
  }, [])

  const handleRowClick = (record: Employee) => {
    setSelectedRowData(record)
    setUpdatedRowData({
      position: record.position,
      phoneNumber: record.phoneNumber,
      roles: record.roles
    })
  }
  const handleCloseModal = () => {
    setSelectedRowData(null)
  }

  const handleUpdate = () => {
    updateEmployee(updatedRowData, selectedRowData.userId).then(getUserList)
    setUpdatedRowData(null)
    handleCloseModal()
  }
  const handlePositionChange = (value: string) => {
    if (selectedRowData) {
      setSelectedRowData({ ...selectedRowData, position: parseInt(value) })
      setUpdatedRowData({ ...updatedRowData, position: value })
    }
  }
  const handleRoleChange = (value: string) => {
    if (selectedRowData) {
      setSelectedRowData({ ...selectedRowData, roles: parseInt(value) })
      setUpdatedRowData({ ...updatedRowData, roles: value })
    }
  }
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const numericValue = value.replace(/\D/g, '')
    const truncatedValue = numericValue.slice(0, 11)
    const isValid = /^\d{0,11}$/.test(truncatedValue)

    if (isValid) {
      setSelectedRowData({ ...selectedRowData, phoneNumber: truncatedValue })
      setUpdatedRowData({ ...updatedRowData, phoneNumber: truncatedValue })
    } else {
      setUpdatedRowData(null)
    }
  }

  return (
    <>
      <Search
        placeholder="Search"
        onSearch={onSearch}
        onChange={resetEmployeeList}
        style={{ width: '50%' }}
      />
      <Table
        columns={columns}
        dataSource={employeeList}
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
              <h4>{selectedRowData.username}</h4>
            </Item>
            <Item>
              <h3>직급</h3>
              <Select
                value={getPositionLabel(selectedRowData?.position)}
                onChange={handlePositionChange}
                style={{ width: '100%' }}>
                <Option value="0">사원</Option>
                <Option value="1">주임</Option>
                <Option value="2">대리</Option>
                <Option value="3">과장</Option>
                <Option value="4">차장</Option>
                <Option value="5">부장</Option>
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
              <h3>연락처</h3>
              <Input
                value={selectedRowData.phoneNumber || ''}
                onChange={handlePhoneChange}
                style={{ width: '100%' }}
                placeholder="'-'를 제외한 숫자만 입력해주세요."
                maxLength={11}
              />
            </Item>
            <Item>
              <h3>권한</h3>
              <Select
                value={selectedRowData.roles === 0 ? '일반' : '관리자'}
                onChange={handleRoleChange}
                style={{ width: '100%' }}>
                <Option value="0">일반</Option>
                <Option value="1">관리자</Option>
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
