import { DUMMY_DUTY_REQUEST_LIST } from 'constants/index'
import { DutyRequestItem, DutyHistoryItem } from 'components/index'
import { styled } from 'styled-components'

import { useCallback } from 'react'
import { List, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export const Duty = () => {
  const handleClickAdd = useCallback(() => {}, [])

  return (
    <Container>
      <ButtonBox>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleClickAdd}>
          당직 등록하기
        </Button>
      </ButtonBox>
      <Wapper>
        <h2>
          당직 신청 내역 <span>{DUMMY_DUTY_REQUEST_LIST.length}</span>
        </h2>
        <List
          pagination={{ position: 'bottom', align: 'end', pageSize: 5 }}
          dataSource={DUMMY_DUTY_REQUEST_LIST}
          renderItem={item => <DutyRequestItem item={item} />}
        />
      </Wapper>

      <Wapper>
        <h2>
          나의 당직 내역 <span>{DUMMY_DUTY_REQUEST_LIST.length}</span>
        </h2>
        <List
          pagination={{ position: 'bottom', align: 'end', pageSize: 5 }}
          dataSource={DUMMY_DUTY_REQUEST_LIST}
          renderItem={item => <DutyHistoryItem item={item} />}
        />
      </Wapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: space-between;
  min-height: calc(100% - 62px);
  position: relative;
`

const Wapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-grow: 1;

  &:first-child {
    flex-grow: 0;
  }

  h2 {
    font-size: 24px;
    font-weight: 600;

    span {
      font-size: 18px;
      font-weight: 400;
      margin-left: 8px;
      color: var(--color-green-1);
    }
  }
`
const ButtonBox = styled.div`
  position: absolute;
  right: 0;
`
