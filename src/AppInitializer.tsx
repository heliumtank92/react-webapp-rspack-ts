import React, { Suspense } from 'react'

import Loader from './Components/Loader'

import AppRouter from './AppRouter'
import performHandshake from './Services/performHandshake'
import { WEB_HTTP_CONTEXT } from '@am92/web-http'
import { asHttp } from './Configurations/WebHttp'
import { useSelector } from 'react-redux'
import {
  getAccessTokenSelector,
  getRefreshTokenSelector
} from './Redux/Auth/Selectors'

export interface IAppInitializerProps {}

const AppInitializer: React.FC<IAppInitializerProps> = () => {
  const accessToken = useSelector(getAccessTokenSelector)
  const refreshToken = useSelector(getRefreshTokenSelector)
  const [initiated, setInitiated] = React.useState(false)

  const initiateApp = async () => {
    if (accessToken) {
      asHttp.context.set(WEB_HTTP_CONTEXT.ACCESS_TOKEN, accessToken)
    }

    if (refreshToken) {
      asHttp.context.set(WEB_HTTP_CONTEXT.REFRESH_TOKEN, refreshToken)
    }

    try {
      await performHandshake()
      await initeAppData()
      setInitiated(true)
    } catch (error) {
      console.log('AppInitializer error', error)
      throw error
    }
  }

  // NOTE: All Application Level Initialization Logic
  const initeAppData = async () => {}

  React.useEffect(() => {
    initiateApp()
  })

  if (!initiated) {
    return <Loader />
  }

  return (
    <Suspense fallback={<Loader />}>
      <AppRouter />
    </Suspense>
  )
}

export default AppInitializer
