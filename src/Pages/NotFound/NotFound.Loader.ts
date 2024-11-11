import { getIsLoggedInSelector } from '~/src/Redux/Auth/Selectors'

import APP_ROUTES from '~/src/Constants/APP_ROUTES'
import { AppStore } from '~/src/Configurations/AppStore'

export default function NotFoundLoader() {
  const state = AppStore.getState()
  const isLoggedIn = getIsLoggedInSelector(state)

  if (!isLoggedIn) {
    throw new Response(APP_ROUTES.DEFAULT_UNAUTH_FALLBACK.pathname as string, {
      status: 404
    })
  } else {
    throw new Response(APP_ROUTES.DEFAULT_AUTH_FALLBACK.pathname as string, {
      status: 404
    })
  }

  return {}
}
