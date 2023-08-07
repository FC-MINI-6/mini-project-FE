import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  DayOffSummary,
  DayOffRequestModal,
  DayOffRequestTable,
  DayOffHistorytTable
} from 'components/index'
import { IDayOffRequest, IDayOffResponse } from 'types/index'
import { insertDayOff, fetchDayOffList } from 'apis/index'
import { modalStore } from 'stores/index'
import { resultModalDatas } from 'constants/index'
import {
  getFilteredDayOffRequestList,
  getFilteredDayOffHistoryList,
  calcNumOfUsedDayOff,
  calcNumOfRequest
} from 'utils/index'

import { styled } from 'styled-components'

import { Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export const DayOff = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { openModal } = modalStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dayOffList, setDayOffList] = useState<IDayOffResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const requestList = useMemo(() => getFilteredDayOffRequestList(dayOffList), [dayOffList])
  const historyList = useMemo(() => getFilteredDayOffHistoryList(dayOffList), [dayOffList])
  const [numOfDayOff, setNumOfDayOff] = useState<number>(0)
  const numOfUsedDays = useMemo(() => calcNumOfUsedDayOff(historyList), [historyList])
  const numOfAvailableDays = useMemo(
    () => numOfDayOff - numOfUsedDays,
    [numOfDayOff, numOfUsedDays]
  )
  const numOfAvailableRequestDays = useMemo(
    () => numOfDayOff - calcNumOfRequest(requestList) - numOfUsedDays,
    [numOfDayOff, requestList, numOfUsedDays]
  )

  const getDayOffList = useCallback(async () => {
    setIsLoading(true)
    fetchDayOffList()
      .then(
        res => {
          setNumOfDayOff(res.num)
          setDayOffList(res.dayOffList)
        },
        () => {
          openModal(resultModalDatas.DAY_OFF_FETCH_FAILURE)
        }
      )
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 400)
      })
  }, [])

  useEffect(() => {
    getDayOffList()
  }, [])

  const handleOk = (request: IDayOffRequest) => {
    insertDayOff(request)
      .then(
        () => {
          setIsModalOpen(false)
          openModal({
            ...resultModalDatas.DAY_OFF_INSERT_SUCCESS,
            okCallback: () => {
              getDayOffList()
            }
          })
        },
        error => {
          openModal({
            ...resultModalDatas.DAY_OFF_INSERT_FAILURE,
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

  const handleDeleteCompleted = useCallback(() => {
    getDayOffList()
    messageApi.open({
      type: 'success',
      content: '휴가 신청 취소를 완료했습니다.'
    })
  }, [])

  return (
    <Container>
      {contextHolder}
      <ButtonBox>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleClickAdd}>
          휴가 등록하기
        </Button>
      </ButtonBox>
      <Wapper>
        <h2>나의 휴가</h2>
        <DayOffSummary available={numOfAvailableDays} used={numOfUsedDays} />
      </Wapper>

      <Wapper>
        <h2>
          휴가 신청 내역 <span>{requestList.length}</span>
        </h2>
        <DayOffRequestTable
          requestList={requestList}
          isLoading={isLoading}
          deleteCallback={handleDeleteCompleted}
        />
      </Wapper>

      <Wapper>
        <h2>
          휴가 사용 내역 <span>{historyList.length}</span>
        </h2>
        <DayOffHistorytTable historyList={historyList} isLoading={isLoading} />
      </Wapper>
      <DayOffRequestModal
        availableDays={numOfAvailableRequestDays}
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
