import { NavigateOptions, To } from 'react-router-dom'

export type AppRouteItem = {
  pathname: To
  options?: NavigateOptions
}

const APP_ROUTES = {
  HOME: {
    pathname: '/'
  } as AppRouteItem,

  ANY: {
    pathname: '*'
  } as AppRouteItem,

  DEFAULT_UNAUTH_FALLBACK: {
    pathname: '/'
  } as AppRouteItem,

  DEFAULT_AUTH_FALLBACK: {
    pathname: '/'
  } as AppRouteItem
}

export default APP_ROUTES
