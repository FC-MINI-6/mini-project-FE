import { useEffect, useMemo, useState, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { NotificationPopup } from 'components/index'
import { modalStore, useUserStore } from 'stores/index'

import { notificationRef } from '@/firebase'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { INotificationData } from 'types/index'
import { styled } from 'styled-components'
import { Image, Menu, Button, Popover, Badge, Empty } from 'antd'
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
import { resultModalDatas } from '@/constants'

const items: MenuProps['items'] = [
  {
    label: <Link to={'/'}>홈</Link>,
    key: '/',
    icon: <HomeOutlined />
  },
  {
    label: <Link to={'/mypage'}>내 정보</Link>,
    key: '/mypage',
    icon: <UserOutlined />
  },
  {
    label: <Link to={'/day_off'}>휴가</Link>,
    key: '/day_off',
    icon: <CoffeeOutlined />
  },
  {
    label: <Link to={'/duty'}>당직</Link>,
    key: '/duty',
    icon: <LaptopOutlined />
  },
  {
    label: <Link to={'/admin_schedule'}>휴가/당직 관리</Link>,
    key: '/admin_schedule',
    icon: <ProfileOutlined />
  },
  {
    label: <Link to={'/admin_employee'}>사원관리</Link>,
    key: '/admin_employee',
    icon: <IdcardOutlined />
  }
]

export const AppNav = () => {
  const { userInfo, logout } = useUserStore()
  const { openModal } = modalStore()
  const [newNotifications, setNewNotifications] = useState<INotificationData[]>([])
  const newNotificationCount = useMemo(() => newNotifications.length, [newNotifications])
  const path = useLocation().pathname
  const navigate = useNavigate()
  // 실시간 알림 변경사항 구독
  useEffect(() => {
    if (userInfo) {
      onSnapshot(collection(notificationRef, `${userInfo.id}`, 'notiList'), snapshot => {
        const updateNotifications = snapshot.docs
          .map(doc => {
            return { ...(doc.data() as INotificationData), id: doc.id }
          })
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .filter(noti => !noti.read)
        setNewNotifications(updateNotifications)
      })
    }
  }, [userInfo])

  const fetchNoti = useCallback(async () => {
    if (userInfo) {
      try {
        await getDocs(collection(notificationRef, `${userInfo.id}`, 'notiList'))
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
  }, [userInfo])

  const handleLogout = () => {
    openModal({
      ...resultModalDatas.LOGOUT_CONFIRM,
      okCallback: () => {
        logout()
        navigate('/login', { replace: true })
      }
    })
  }

  useEffect(() => {
    fetchNoti()
  }, [fetchNoti])

  return (
    <Container>
      <Link to={'/'}>
        <Logo />
      </Link>
      <Profile>
        <Image
          alt="profileImage"
          width={40}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          style={{ borderRadius: '70%' }}
          preview={false}
        />
        <span className="user">
          <p>{userInfo?.username ?? '게스트'} 님</p>
          <p>
            {userInfo && userInfo.position}
            {userInfo?.roles === '관리자' ? `/${userInfo!.roles}` : ''}
          </p>
        </span>
        <Popover
          placement="rightTop"
          title={'알림'}
          content={
            newNotifications.length !== 0 ? (
              <NotificationPopup datas={newNotifications} />
            ) : (
              <Empty description={'알림이 없습니다.'} />
            )
          }
          trigger="click">
          <Badge count={newNotificationCount} size="small" offset={[-2, 4]}>
            <BellOutlined style={{ fontSize: 24, color: '#fff' }} />
          </Badge>
        </Popover>
      </Profile>
      <Menu
        defaultSelectedKeys={['/']}
        theme="dark"
        items={userInfo?.roles === '관리자' ? items : items.slice(0, 4)}
        selectedKeys={[path]}
      />
      <Button
        onClick={handleLogout}
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
  gap: 20px;

  span.user {
    flex-grow: 1;
  }
`
