export const dayOffTypes = {
  AVAILABLE: {
    type: 'AVAILABLE',
    title: '남은 연차',
    color: 'var(--color-green-1)',
    operator: '+'
  },
  EXTINCTION: {
    type: 'EXTINCTION',
    title: '소멸 연차',
    color: 'var(--color-red-1)',
    operator: '-'
  },
  USED: {
    type: 'USED',
    title: '사용',
    color: 'var(--color-purple-1)',
    operator: '-'
  }
}

export type TDayOffTypes = {
  type: string
  title: string
  color: string
  operator: string
}
