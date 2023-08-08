import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { NotificationPopup } from 'components/index'
import { notificationRef } from '@/firebase'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { INotificationData } from 'types/index'
import { styled } from 'styled-components'
import { Image, Menu, Button, Popover, Badge } from 'antd'
import type { MenuProps } from 'antd'
import { navTabStore } from 'stores/index'
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
  url: React.ReactNode,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    url
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('홈', '1', '', <HomeOutlined />),
  getItem('내 정보', '2', 'mypage', <UserOutlined />),
  getItem('휴가', '3', 'day_off', <CoffeeOutlined />),
  getItem('당직', '4', 'duty', <LaptopOutlined />),
  getItem('휴가/당직 관리', '5', 'admin/schedule', <ProfileOutlined />),
  getItem('사원 관리', '6', 'admin/employee', <IdcardOutlined />)
]

export const AppNav = () => {
  const [newNotifications, setNewNotifications] = useState<INotificationData[]>([])
  const newNotificationCount = useMemo(() => newNotifications.length, [newNotifications])
  const { tabNumber, setTabNumber } = navTabStore()

  // 실시간 알림 변경사항 구독
  useEffect(() => {
    onSnapshot(collection(notificationRef, 'userid1', 'notiList'), snapshot => {
      const updateNotifications = snapshot.docs
        .map(doc => {
          return { ...(doc.data() as INotificationData), id: doc.id }
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .filter(noti => !noti.read)
      setNewNotifications(updateNotifications)
    })
  }, [])

  const fetchNoti = async () => {
    try {
      // TODO : userId1 > 실제 사용자 ID 값으로 대체
      await getDocs(collection(notificationRef, 'userid1', 'notiList'))
        .then(res => {
          return res.docs
            .map(doc => {
              return { ...(doc.data() as INotificationData), id: doc.id }
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .filter(noti => !noti.read)
        })
        .then(newNotifications => {
          setNewNotifications(newNotifications)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleTabNumber = key => {
    setTabNumber(Number(key))
  }
  console.log(tabNumber)
  useEffect(() => {
    fetchNoti()
  }, [])

  return (
    <Container>
      <Logo />
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
        <Popover
          placement="rightTop"
          title={'알림'}
          content={<NotificationPopup datas={newNotifications} />}
          trigger="click">
          <Badge count={newNotificationCount} size="small" offset={[-2, 4]}>
            <BellOutlined style={{ fontSize: 24, color: '#fff' }} />
          </Badge>
        </Popover>
      </Profile>
      <Menu defaultSelectedKeys={tabNumber || ['1']} theme="dark">
        {items.map(item => (
          <Menu.Item key={item.key} icon={item.icon} onClick={() => handleTabNumber(item.key)}>
            <Link to={`/${item.url}`}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
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
  padding: 20px;
  height: 90%;
  overflow: hidden;
  position: relative;
`

const Logo = styled.div`
  height: 70px;
  background-image: url('/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
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
