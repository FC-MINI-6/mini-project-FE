import React, { useCallback, useState } from 'react'

import { Modal, Radio, DatePicker } from 'antd'
import type { RadioChangeEvent } from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const { RangePicker } = DatePicker

type TDayOffRequestModalProps = {
  isModalOpen: boolean
  onClickOk: () => void
  onClickCancel: () => void
}
type RangeValue = [Dayjs | null, Dayjs | null] | null

export const DayOffRequestModal = React.memo(
  ({ isModalOpen, onClickOk, onClickCancel }: TDayOffRequestModalProps) => {
    const [type, setType] = useState<number>(0)
    const [dates, setDates] = useState<RangeValue>(null)
    const [isSingle, setIsSingle] = useState<boolean>(false)

    const disabledDate: RangePickerProps['disabledDate'] = current => {
      // Can not select days before today and today
      return current < dayjs().endOf('day')
    }

    const onChangeType = (e: RadioChangeEvent) => {
      console.log('radio checked', e.target.value)
      setDates(null)
      setType(e.target.value)
      setIsSingle(e.target.value !== 0)
    }

    const handleClickOk = useCallback(() => {
      onClickOk()
    }, [])

    const handleClickCancel = useCallback(() => {
      onClickCancel()
    }, [])

    return (
      <>
        <Modal
          centered={true}
          title="🏖️ 연차 등록"
          open={isModalOpen}
          onOk={handleClickOk}
          onCancel={handleClickCancel}
          okText="등록하기"
          cancelText="닫기">
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
        </Modal>
      </>
    )
  }
)
