import React, { useCallback, useEffect, useState } from 'react'
import { IDayOffRequest } from 'types/index'
import { calcNumOfDayOff } from 'utils/index'
import { modalStore } from 'stores/index'
import { resultModalDatas } from 'constants/index'

import { Modal, Radio, DatePicker, Input } from 'antd'
import type { RadioChangeEvent } from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const { RangePicker } = DatePicker
const { TextArea } = Input

type TDayOffRequestModalProps = {
  availableDays: number
  isModalOpen: boolean
  onClickOk: (request: IDayOffRequest) => void
  onClickCancel: () => void
}
type RangeValue = [Dayjs | null, Dayjs | null] | null

export const DayOffRequestModal = React.memo(
  ({ availableDays, isModalOpen, onClickOk, onClickCancel }: TDayOffRequestModalProps) => {
    const { openModal } = modalStore()
    const [type, setType] = useState<number>(0)
    const [dates, setDates] = useState<RangeValue>(null)
    const [reason, setReason] = useState<string>('')
    const [isSingle, setIsSingle] = useState<boolean>(false)
    const [isValid, setIsValid] = useState<boolean>(false)

    useEffect(() => {
      setIsValid(dates !== null && reason !== '')
    }, [type, dates, reason])

    const disabledDate: RangePickerProps['disabledDate'] = current => {
      return (
        current < dayjs().endOf('day').add(-1, 'day') ||
        dayjs(current).day() === 0 ||
        dayjs(current).day() === 6
      )
    }

    const clearState = () => {
      setType(0)
      setDates(null)
      setReason('')
      setIsSingle(false)
      setIsValid(false)
    }

    const onChangeType = (e: RadioChangeEvent) => {
      setDates(null)
      setType(e.target.value)
      setIsSingle(e.target.value !== 0)
    }

    const handleClickOk = useCallback(() => {
      if (dates && dates[0] !== null) {
        const startDate = dates[0].format('YYYY-MM-DD')
        const endDate = type === 0 ? dates[1]!.format('YYYY-MM-DD') : dates[0].format('YYYY-MM-DD')

        if (availableDays - calcNumOfDayOff(startDate, endDate) > 0) {
          const request: IDayOffRequest = {
            type: type,
            startDate: startDate,
            endDate: endDate,
            reason: reason
          }

          onClickOk(request)
          clearState()
        } else {
          openModal({
            ...resultModalDatas.DAY_OFF_DAYS_VALIDATION,
            content: `${resultModalDatas.DAY_OFF_DAYS_VALIDATION.content}${availableDays}일`,
            okCallback: () => {
              setDates(null)
            }
          })
        }
      }
    }, [onClickOk, dates, type, reason, availableDays])

    const handleClickCancel = useCallback(() => {
      onClickCancel()
      clearState()
    }, [onClickCancel])

    return (
      <>
        <Modal
          centered={true}
          title="🏖️ 휴가 등록"
          open={isModalOpen}
          onOk={handleClickOk}
          onCancel={handleClickCancel}
          okText="등록하기"
          cancelText="닫기"
          okButtonProps={{ disabled: !isValid }}>
          <Radio.Group
            size="middle"
            buttonStyle="solid"
            onChange={onChangeType}
            value={type}
            style={{ display: 'flex', marginTop: 20 }}>
            <Radio.Button style={{ flexGrow: 1, textAlign: 'center', flexBasis: 0 }} value={0}>
              연차
            </Radio.Button>
            <Radio.Button style={{ flexGrow: 1, textAlign: 'center', flexBasis: 0 }} value={1}>
              오전 반차
            </Radio.Button>
            <Radio.Button style={{ flexGrow: 1, textAlign: 'center', flexBasis: 0 }} value={2}>
              오후 반차
            </Radio.Button>
          </Radio.Group>

          <RangePicker
            style={{ width: '100%', marginTop: 20 }}
            value={dates}
            disabledDate={disabledDate}
            onChange={val => {
              setDates(val)
            }}
            disabled={[false, isSingle]}
            allowEmpty={[false, isSingle]}
            allowClear={true}
            inputReadOnly={true}
          />

          <TextArea
            value={reason}
            onChange={e => setReason(e.target.value)}
            rows={4}
            placeholder="휴가 사유를 작성해주세요."
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
