import React, { useCallback, useEffect, useState } from 'react'
import { IDutyRequest } from 'types/index'

import { Modal, DatePicker, Input } from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const { TextArea } = Input

type TDayOffRequestModalProps = {
  isModalOpen: boolean
  onClickOk: (request: IDutyRequest) => void
  onClickCancel: () => void
}

export const DutyRequestModal = React.memo(
  ({ isModalOpen, onClickOk, onClickCancel }: TDayOffRequestModalProps) => {
    const [date, setDate] = useState<Dayjs | null>(null)
    const [reason, setReason] = useState<string>('')
    const [isValid, setIsValid] = useState<boolean>(false)

    useEffect(() => {
      setIsValid(date !== null && reason !== '')
    }, [date, reason])

    const disabledDate: RangePickerProps['disabledDate'] = current => {
      return (
        current < dayjs().endOf('day').add(-1, 'day') ||
        dayjs(current).day() === 0 ||
        dayjs(current).day() === 6
      )
    }

    const clearState = () => {
      setDate(null)
      setReason('')
      setIsValid(false)
    }

    const handleClickOk = useCallback(() => {
      const request: IDutyRequest = {
        date: date!.format('YYYY-MM-DD'),
        reason: reason
      }
      onClickOk(request)
      clearState()
    }, [onClickOk, date, reason])

    const handleClickCancel = useCallback(() => {
      onClickCancel()
      clearState()
    }, [onClickCancel])

    return (
      <>
        <Modal
          centered={true}
          title="⏰ 당직 등록"
          open={isModalOpen}
          onOk={handleClickOk}
          onCancel={handleClickCancel}
          okText="등록하기"
          cancelText="닫기"
          okButtonProps={{ disabled: !isValid }}>
          <DatePicker
            style={{ width: '100%', marginTop: 20 }}
            value={date}
            disabledDate={disabledDate}
            onChange={val => {
              setDate(val)
            }}
            allowClear={true}
            inputReadOnly={true}
          />

          <TextArea
            value={reason}
            onChange={e => setReason(e.target.value)}
            rows={4}
            placeholder="당직 신청 사유를 작성해주세요."
            maxLength={30}
            autoSize={false}
            allowClear={true}
            showCount={true}
            style={{ marginTop: 20, marginBottom: 20, resize: 'none' }}
          />
        </Modal>
      </>
    )
  }
)
