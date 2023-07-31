import { Route, Routes } from 'react-router-dom'
import { NavLayout } from 'components/index'
import { DayOff, Duty, HomeCalendar } from 'pages/index'

import GlobalStyle from '@/GlobalStyle'
import { ConfigProvider } from 'antd'
import { config } from '@/GlobalThemeConfig'
import locale from 'antd/lib/locale/ko_KR'
import { SignUp } from '@/components/signup'
import { Login } from '@/components/login/Login'

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <ConfigProvider theme={config} locale={locale}>
        <Routes>
          <Route element={<NavLayout />}>
            {/* 아래 Route Page 추가 */}
            <Route path="/" element={<HomeCalendar />} />
            <Route path="/day_off" element={<DayOff />} />
            <Route path="/duty" element={<Duty />} />
          </Route>
          {/* Nav 필요없는 페이지는 아래 바로 Route 추가 */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ConfigProvider>
    </>
  )
}
