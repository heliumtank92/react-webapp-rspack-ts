import type React from 'react'
import {
  type Location,
  type NavigateFunction,
  type NavigateOptions,
  type Params,
  type SetURLSearchParams,
  type To,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom'
import type { Subtract } from 'utility-types'
import type { AppRouteItem } from '../Constants/APP_ROUTES'

/**
 * Basic Interface to extend in components wrapping the below HOC.
 *
 * @export
 * @interface IWithRouterProps
 */
export interface IWithRouterProps {
  searchParams: URLSearchParams
  setSearchParams: SetURLSearchParams
  navigate: NavigateFunction
  location: Location
  params: Readonly<Params<string>>
  navigateTo: (route: To, options?: NavigateOptions) => void
  navigateToRoute: (appRoute: AppRouteItem) => void
}

/**
 * HOC to provide routing features
 *
 * @template P
 * @param Child
 * @returns
 */
export default function withRouter<P extends IWithRouterProps>(
  Child: React.ComponentType<P>
) {
  return function withRouterWrapper(
    props: Subtract<P, IWithRouterProps>
  ): React.JSX.Element {
    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const params = useParams()
    const navigateTo = (route: To, options?: NavigateOptions) =>
      navigate(route, options)
    const navigateToRoute = (appRoute: AppRouteItem) =>
      navigate(appRoute.pathname, appRoute.options)

    return (
      <Child
        {...(props as P)}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        navigate={navigate}
        location={location}
        params={params}
        navigateTo={navigateTo}
        navigateToRoute={navigateToRoute}
      />
    )
  }
}
