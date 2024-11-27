import { getIsLoggedInSelector } from '~/src/Redux/Auth/Selectors'

import { AppStore } from '~/src/Configurations/AppStore'
import APP_ROUTES from '~/src/Constants/APP_ROUTES'

export default function NotFoundLoader() {
  const state = AppStore.getState()
  const isLoggedIn = getIsLoggedInSelector(state)

  if (!isLoggedIn) {
    throw new Response(APP_ROUTES.DEFAULT_UNAUTH_FALLBACK.pathname as string, {
      status: 404
    })
  }

  if (isLoggedIn) {
    throw new Response(APP_ROUTES.DEFAULT_AUTH_FALLBACK.pathname as string, {
      status: 404
    })
  }

  return {}
}
