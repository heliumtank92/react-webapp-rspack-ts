import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import getAppRouter from './Configurations/getAppRouter'
import Loader from './Components/Loader'

let router: ReturnType<typeof getAppRouter> | undefined

export interface IAppRouterProps {}

const AppRouter: React.FC<IAppRouterProps> = () => {
  if (!router) {
    router = getAppRouter()
  }

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
export default AppRouter
