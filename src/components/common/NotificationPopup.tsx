import { INotificationData } from '@/types'
import { List } from 'antd'
import Item from 'antd/es/list/Item'
import React from 'react'
import { styled } from 'styled-components'
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
type NotificationPopupProps = {
  datas: INotificationData[]
}
export const NotificationPopup = React.memo(({ datas }: NotificationPopupProps) => {
  return (
    <List>
      {datas.map(noti => {
        return (
          <NotiItem>
            <NotiContent>
              {noti.status === 'APPROVE' ? (
                <CheckCircleOutlined style={{ color: '#0cf336', marginRight: 10 }} />
              ) : (
                <ExclamationCircleOutlined style={{ color: '#f82424', marginRight: 10 }} />
              )}
              {noti.message}
            </NotiContent>
            <NotiDate>{noti.date}</NotiDate>
          </NotiItem>
        )
      })}
    </List>
  )
})

const NotiItem = styled(Item)`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`

const NotiContent = styled.div`
  display: flex;
  font-size: 16px;
`

const NotiDate = styled.div`
  align-self: end;
  color: #999;
  font-size: 12px;
`
