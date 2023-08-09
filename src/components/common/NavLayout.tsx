import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { AppNav } from 'components/index'
import { useUserStore } from 'stores/index'
const { Sider, Content, Footer } = Layout

export const NavLayout = () => {
  const { userInfo } = useUserStore()

  return (
    <>
      {userInfo ? (
        <Layout hasSider style={{ minWidth: 1024 }}>
          <Sider
            width={250}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
              color: '#fff',
              zIndex: 100
            }}>
            {/* Menu 컴포넌트 */}
            <AppNav />
          </Sider>
          <Layout
            className="site-layout"
            style={{
              marginLeft: 250,
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              height: '100%'
            }}>
            <Content style={{ flexGrow: 1, flexShrink: 0, padding: 40 }}>
              <Outlet />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              ©2023 Created by FastCampus Mini Project Team6
            </Footer>
          </Layout>
        </Layout>
      ) : null}
    </>
  )
}
