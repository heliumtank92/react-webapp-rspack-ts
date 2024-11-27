import type React from 'react'
import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import Loader from './Components/Loader'
import getAppRouter from './Configurations/getAppRouter'

let router: ReturnType<typeof getAppRouter> | undefined

const AppRouter: React.FC = () => {
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
