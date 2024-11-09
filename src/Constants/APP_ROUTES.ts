import { NavigateOptions, To } from 'react-router-dom'

type AppRouteItem = {
  pathname: To
  options?: NavigateOptions
}

const APP_ROUTES = {
  HOME: {
    pathname: ''
  } as AppRouteItem,

  ANY: {
    pathname: '*'
  } as AppRouteItem
}

export default APP_ROUTES
