import type { MenuProps } from 'antd'

export const DUTY_MENU_ITEMS: MenuProps['items'] = [
  {
    label: '당직 취소하기',
    key: '1'
  }
]

export const DAYOFF_MENU_ITEMS: MenuProps['items'] = [
  {
    label: '휴가 취소하기',
    key: '1'
  }
]

export const CALENDER_MENU_ALL = {
  id: -1,
  username: '전체',
  position: ''
}
