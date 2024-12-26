import { RouteObject, createBrowserRouter } from 'react-router-dom'

import APP_ROUTES from '~/src/Constants/APP_ROUTES'
import {
  lazyLoadPage,
  validatePublicRouteLoader
} from '~/src/Helpers/Route.Helpers'

import Loader from '~/src/Components/Loader'
import ErrorBoundary from '~/src/Layouts/ErrorBoundary'

const routeObj: RouteObject[] = [
  {
    element: lazyLoadPage(
      () =>
        import(
          /* webpackChunkName: "MainLayout" */
          '~/src/Layouts/Main.Layout'
        )
    ),
    HydrateFallback: Loader,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: APP_ROUTES.HOME.pathname,
        loader: validatePublicRouteLoader(
          () =>
            import(
              /* webpackChunkName: "HomeLoader" */ '~/src/Pages/Home/Home.Loader'
            )
        ),
        element: lazyLoadPage(
          () =>
            import(
              /* webpackChunkName: "HomePage" */ '~/src/Pages/Home/Home.Page'
            )
        )
      },
      {
        path: APP_ROUTES.ABOUT.pathname,
        loader: validatePublicRouteLoader(
          () =>
            import(
              /* webpackChunkName: "AboutLoader" */ '~/src/Pages/About/About.Loader'
            )
        ),
        element: lazyLoadPage(
          () =>
            import(
              /* webpackChunkName: "AboutPage" */ '~/src/Pages/About/About.Page'
            )
        )
      }
    ]
  },
  {
    element: lazyLoadPage(
      () =>
        import(
          /* webpackChunkName: "ErrorLayout" */
          '~/src/Layouts/Error.Layout'
        )
    ),
    HydrateFallback: Loader,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: APP_ROUTES.ANY.pathname,
        loader: validatePublicRouteLoader(
          () =>
            import(
              /* webpackChunkName: "NotFoundLoader" */ '~/src/Pages/NotFound/NotFound.Loader'
            )
        ),
        element: lazyLoadPage(
          () =>
            import(
              /* webpackChunkName: "NotFoundPage" */ '~/src/Pages/NotFound/NotFound.Page'
            )
        )
      },
      {
        path: APP_ROUTES.SOMETHING_WENT_WRONG.pathname,
        loader: validatePublicRouteLoader(
          () =>
            import(
              /* webpackChunkName: "SomethingWentWrongLoader" */ '~/src/Pages/SomethingWentWrong/SomethingWentWrong.Loader'
            )
        ),
        element: lazyLoadPage(
          () =>
            import(
              /* webpackChunkName: "SomethingWentWrongPage" */ '~/src/Pages/SomethingWentWrong/SomethingWentWrong.Page'
            )
        )
      },
      {
        path: APP_ROUTES.UNSUPPORTED_BROWSERS.pathname,
        loader: validatePublicRouteLoader(
          () =>
            import(
              /* webpackChunkName: "UnsupportedBrowsersLoader" */ '~/src/Pages/UnsupportedBrowsers/UnsupportedBrowsers.Loader'
            )
        ),
        element: lazyLoadPage(
          () =>
            import(
              /* webpackChunkName: "UnsupportedBrowsersPage" */ '~/src/Pages/UnsupportedBrowsers/UnsupportedBrowsers.Page'
            )
        )
      }
    ]
  }
]

const getAppRouter = () => createBrowserRouter(routeObj)

export default getAppRouter
