import { IDayOffResponse } from 'types/index'

export interface IDummyDutyRequest {
  id: number
  status: number
  date: string
  reason: string
}

export const DUMMY_DUTY_REQUEST_LIST = [
  {
    id: 1,
    status: 0,
    date: '2023-07-31',
    reason: '나이트 당직'
  },
  {
    id: 2,
    status: 0,
    date: '2023-08-02',
    reason: '나이트 당직'
  },
  {
    id: 3,
    status: 1,
    date: '2023-08-03',
    reason: '나이트 당직'
  },
  {
    id: 4,
    status: 2,
    date: '2023-08-01',
    reason: '나이트 당직'
  },
  {
    id: 5,
    status: 0,
    date: '2023-07-31',
    reason: '나이트 당직'
  },
  {
    id: 6,
    status: 0,
    date: '2023-07-30',
    reason: '나이트 당직'
  }
]

export const DUMMY_DAYOFF_REQUEST_LIST: IDayOffResponse[] = [
  {
    id: 1,
    status: '승인대기',
    type: '연차',
    startDate: '2023-07-31',
    endDate: '2023-07-31',
    reason: '가족 모임'
  },
  {
    id: 2,
    status: '승인대기',
    type: '오후반차',
    startDate: '2023-07-29',
    endDate: '2023-07-31',
    reason: '개인 사정'
  },
  {
    id: 3,
    status: '승인',
    type: '오후반차',
    startDate: '2023-07-31',
    endDate: '2023-07-31',
    reason: '개인 사정'
  },
  {
    id: 4,
    status: '반려',
    type: '오전반차',
    startDate: '2023-08-11',
    endDate: '2023-08-11',
    reason: '개인 사정'
  }
]
