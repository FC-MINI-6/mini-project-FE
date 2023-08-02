import { useCallback, useState } from 'react'
import {
  DayOffSummary,
  DayOffRequestModal,
  DayOffRequestTable,
  DayOffHistorytTable
} from 'components/index'
import { styled } from 'styled-components'

import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { DUMMY_DAYOFF_REQUEST_LIST } from '@/constants'

export const DayOff = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleClickAdd = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  return (
    <Container>
      <ButtonBox>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleClickAdd}>
          휴가 등록하기
        </Button>
      </ButtonBox>
      <Wapper>
        <h2>나의 휴가</h2>
        <DayOffSummary />
      </Wapper>

      <Wapper>
        <h2>
          휴가 신청 내역 <span>{DUMMY_DAYOFF_REQUEST_LIST.length}</span>
        </h2>
        <DayOffRequestTable requestList={DUMMY_DAYOFF_REQUEST_LIST} />
      </Wapper>

      <Wapper>
        <h2>
          휴가 사용 내역 <span>{DUMMY_DAYOFF_REQUEST_LIST.length}</span>
        </h2>
        <DayOffHistorytTable historyList={DUMMY_DAYOFF_REQUEST_LIST} />
      </Wapper>
      <DayOffRequestModal
        isModalOpen={isModalOpen}
        onClickOk={handleOk}
        onClickCancel={handleCancel}
      />
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
