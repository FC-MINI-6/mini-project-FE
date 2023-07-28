import { Route, Routes } from 'react-router-dom'
import { NavLayout } from 'components/index'
import { Home } from 'pages/index'

import GlobalStyle from '@/GlobalStyle'
import { ConfigProvider } from 'antd'
import { config } from '@/GlobalThemeConfig'
import locale from 'antd/lib/locale/ko_KR'
import { Login } from '@/components/login/Login'

export const App = () => {
  // getDesignToken(config)

  return (
    <>
      <GlobalStyle />
      <ConfigProvider theme={config} locale={locale}>
        <Routes>
          <Route element={<NavLayout />}>
            <Route path="/" element={<Home />} />
            {/* 아래 Route Page 추가 */}
          </Route>
          {/* Nav 필요없는 페이지는 아래 바로 Route 추가 */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </ConfigProvider>
    </>
  )
}
