import { useCallback, useState } from 'react'
import {
  DayOffSummary,
  DayOffRequestModal,
  DayOffRequestTable,
  DayOffHistorytTable
} from 'components/index'
import { IDayOffRequest } from 'types/index'
import { insertDayOff } from 'apis/index'
import { modalStore } from 'stores/index'

import { styled } from 'styled-components'

import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { resultModalDatas, DUMMY_DAYOFF_REQUEST_LIST } from 'constants/index'

export const DayOff = () => {
  const { openModal } = modalStore()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = (request: IDayOffRequest) => {
    insertDayOff(request)
      .then(
        () => {
          setIsModalOpen(false)
          openModal({
            ...resultModalDatas.DAY_OFF_INSERT_SUCCESS,
            okCallback: () => {
              // TODO : 신청 내역 갱신
              console.log('갱신')
            }
          })
        },
        error => {
          openModal({
            ...resultModalDatas.DAY_OFF_INSERT_FAILUR,
            content: `휴가 등록 신청 중 오류가 발생했습니다.\n관리자에게 문의해주세요.\n${
              error.message ?? ''
            }`
          })
        }
      )
      .finally(() => {
        setIsModalOpen(false)
      })
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
