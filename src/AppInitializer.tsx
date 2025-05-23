import type { FC } from 'react'
import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { WEB_HTTP_CONTEXT } from '@am92/web-http'

import Loader from '~/src/Components/Loader'

import {
  getAccessTokenSelector,
  getRefreshTokenSelector
} from '~/src/Redux/Auth/Selectors'
import performHandshake from '~/src/Services/performHandshake'

import { asHttp } from '~/src/Configurations/WebHttp'

import AppRouter from '~/src/AppRouter'

const AppInitializer: FC = () => {
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
      await initAppData()
      setInitiated(true)
    } catch (error) {
      console.log('AppInitializer error', error)
      throw error
    }
  }

  // NOTE: All Application Level Initialization Logic
  const initAppData = async () => {}

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
