import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { AppNav } from 'components/index'
const { Sider, Content, Footer } = Layout

export const NavLayout = () => {
  return (
    <>
      <Layout hasSider>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            color: '#fff'
          }}>
          {/* Menu 컴포넌트 */}
          <AppNav />
        </Sider>
        <Layout
          className="site-layout"
          style={{ marginLeft: 200, display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <Content style={{ flexGrow: 1 }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ©2023 Created by FastCampus Mini Project Team6
          </Footer>
        </Layout>
      </Layout>
    </>
  )
}
