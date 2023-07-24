import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
      <div>Header</div>
      <Outlet />
      <div>Footer</div>
    </>
  )
}
