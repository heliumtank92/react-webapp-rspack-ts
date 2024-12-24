import { FunctionComponent } from 'react'
import { Outlet } from 'react-router'

interface IMainLayoutProps {}

const MainLayout: FunctionComponent<IMainLayoutProps> = _props => {
  return <Outlet />
}

export default MainLayout
