import { Route, Routes } from 'react-router-dom'
import { Layout } from 'components/index'
import { Home } from 'pages/index'

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/* 아래 Route Page 추가 */}
      </Route>
    </Routes>
  )
}
