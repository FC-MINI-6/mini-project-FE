import { DutyRequestTable, DutyHistoryTable, DutyRequestModal } from 'components/index'
import { IDutyRequest, IDutyResponse } from 'types/index'
import { fetchDutyList, insertDuty } from 'apis/index'
import { modalStore } from 'stores/index'
import { resultModalDatas } from 'constants/index'
import { filteredDutyHistoryList, filteredDutyRequestList } from 'utils/index'

import { styled } from 'styled-components'

import { useCallback, useMemo, useState, useEffect } from 'react'
import { Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export const Duty = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { openModal } = modalStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dutyList, setDutyList] = useState<IDutyResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const requestList = useMemo(() => filteredDutyRequestList(dutyList), [dutyList])
  const historyList = useMemo(() => filteredDutyHistoryList(dutyList), [dutyList])

  const getDutyList = useCallback(() => {
    setIsLoading(true)
    fetchDutyList()
      .then(
        res => {
          setDutyList(res.data)
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
  }, [openModal])

  useEffect(() => {
    getDutyList()
  }, [getDutyList])

  const handleOk = (request: IDutyRequest) => {
    insertDuty(request)
      .then(
        () => {
          setIsModalOpen(false)
          openModal({
            ...resultModalDatas.DUTY_INSERT_SUCCESS,
            okCallback: () => {
              getDutyList()
            }
          })
        },
        error => {
          openModal({
            ...resultModalDatas.DUTY_INSERT_FAILURE,
            content: `${resultModalDatas.DUTY_INSERT_FAILURE.content}${error.message ?? ''}`
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
    getDutyList()
    messageApi.open({
      type: 'success',
      content: '당직 신청 취소를 완료했습니다.'
    })
  }, [getDutyList, messageApi])

  return (
    <Container>
      {contextHolder}
      <ButtonBox>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleClickAdd}>
          당직 등록하기
        </Button>
      </ButtonBox>
      <Wapper>
        <h2>
          당직 신청 내역 <span>{requestList.length}</span>
        </h2>
        <DutyRequestTable
          requestList={requestList}
          isLoading={isLoading}
          deleteCallback={handleDeleteCompleted}
        />
      </Wapper>

      <Wapper>
        <h2>
          나의 당직 내역 <span>{historyList.length}</span>
        </h2>
        <DutyHistoryTable historyList={historyList} isLoading={isLoading} />
      </Wapper>

      <DutyRequestModal
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
