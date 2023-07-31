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
