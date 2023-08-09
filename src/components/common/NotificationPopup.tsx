import React from 'react'
import { INotificationData } from 'types/index'
import { useUserStore } from 'stores/index'
import { notificationRef } from '@/firebase'
import { doc, updateDoc } from 'firebase/firestore'

import { List } from 'antd'
import Item from 'antd/es/list/Item'
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'

type NotificationPopupProps = {
  datas: INotificationData[]
}
export const NotificationPopup = React.memo(({ datas }: NotificationPopupProps) => {
  const { userInfo } = useUserStore()
  const navigate = useNavigate()

  const handleClickNotification = async (data: INotificationData) => {
    if (data.id && userInfo) {
      const notiRef = doc(notificationRef, `${userInfo.id}`, 'notiList', `${data.id}`)
      await updateDoc(notiRef, { read: true }).then(() => {
        if (data.type === '당직') {
          navigate('/duty')
          return
        }
        navigate('/day_off')
      })
    }
  }

  return (
    <List>
      {datas.map(noti => {
        return (
          <NotiItem onClick={() => handleClickNotification(noti)}>
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
  cursor: pointer;
`

const NotiContent = styled.div`
  display: flex;
  width: 100%;
  font-size: 16px;
`

const NotiDate = styled.div`
  align-self: end;
  color: #999;
  font-size: 12px;
`
