import { useEffect, useState } from 'react'
import { notificationRef } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { INotificationData } from 'types/index'
import { styled } from 'styled-components'
import { Image, Menu, Button } from 'antd'
import type { MenuProps } from 'antd'
import {
  BellOutlined,
  HomeOutlined,
  UserOutlined,
  LaptopOutlined,
  IdcardOutlined,
  ProfileOutlined,
  CoffeeOutlined,
  ExportOutlined
} from '@ant-design/icons'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('홈', '1', <HomeOutlined />),
  getItem('내 정보', '2', <UserOutlined />),
  getItem('휴가', '3', <CoffeeOutlined />),
  getItem('당직', '4', <LaptopOutlined />),
  getItem('휴가/당직 관리', '5', <ProfileOutlined />),
  getItem('사원 관리', '6', <IdcardOutlined />)
]

export const AppNav = () => {
  const [notifications, setNotifications] = useState<INotificationData[]>([])
  const [newNotifications, setNewNotifications] = useState<INotificationData[]>([])
  const fetchNoti = async () => {
    try {
      // TODO : userId1 > 실제 사용자 ID 값으로 대체
      await getDocs(collection(notificationRef, 'userid1', 'notiList'))
        .then(res => {
          return res.docs.map(doc => doc.data() as INotificationData)
        })
        .then(allNotis => {
          setNotifications(allNotis)
          setNewNotifications(allNotis.filter(noti => !noti.read))
          console.log(allNotis)
          console.log(allNotis.filter(noti => !noti.read))
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchNoti()
  }, [])

  return (
    <Container>
      <Logo>LOGO</Logo>
      <Profile>
        <Image
          alt="profileImage"
          width={40}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          style={{ borderRadius: '70%' }}
          preview={false}
        />
        <span>
          <p>홍길동님</p>
          <p>직급/관리자</p>
        </span>
        <BellOutlined />
      </Profile>
      <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} theme="dark" items={items} />
      <Button
        icon={<ExportOutlined />}
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          color: 'white',
          position: 'absolute',
          bottom: 0
        }}>
        로그아웃
      </Button>
    </Container>
  )
}

const Container = styled.div`
  margin: 20px;
  height: 90%;
  overflow: hidden;
  position: relative;
`

const Logo = styled.div`
  height: 45px;
  background-color: white;
  color: black;
`
const Profile = styled.div`
  margin: 15px 0;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
`
