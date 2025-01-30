import { RouteObject, createBrowserRouter } from 'react-router-dom'

import APP_ROUTES from '~/src/Constants/APP_ROUTES'
import {
  lazyLoadLoader,
  lazyLoadPage,
  validatePublicRouteLoader
} from '~/src/Helpers/Route.Helpers'

import Loader from '~/src/Components/Loader'
import ErrorBoundary from '~/src/Layouts/ErrorBoundary'

// Layouts
const MainLayout = lazyLoadPage(
  () =>
    import(
      /* webpackChunkName: "MainLayout" */
      '~/src/Layouts/Main.Layout'
    )
)

const ErrorLayout = lazyLoadPage(
  () =>
    import(
      /* webpackChunkName: "ErrorLayout" */
      '~/src/Layouts/Error.Layout'
    )
)

// Pages & Loaders

// Home
const HomeLoader = validatePublicRouteLoader(
  () =>
    import(/* webpackChunkName: "HomeLoader" */ '~/src/Pages/Home/Home.Loader')
)

const HomePage = lazyLoadPage(
  () => import(/* webpackChunkName: "HomePage" */ '~/src/Pages/Home/Home.Page')
)

// About
const AboutLoader = validatePublicRouteLoader(
  () =>
    import(
      /* webpackChunkName: "AboutLoader" */ '~/src/Pages/About/About.Loader'
    )
)

const AboutPage = lazyLoadPage(
  () =>
    import(/* webpackChunkName: "AboutPage" */ '~/src/Pages/About/About.Page')
)

// NotFound
const NotFoundLoader = lazyLoadLoader(
  () =>
    import(
      /* webpackChunkName: "NotFoundLoader" */ '~/src/Pages/NotFound/NotFound.Loader'
    )
)

const NotFoundPage = lazyLoadPage(
  () =>
    import(
      /* webpackChunkName: "NotFoundPage" */ '~/src/Pages/NotFound/NotFound.Page'
    )
)

// SomethingWentWrong
const SomethingWentWrongLoader = lazyLoadLoader(
  () =>
    import(
      /* webpackChunkName: "SomethingWentWrongLoader" */ '~/src/Pages/SomethingWentWrong/SomethingWentWrong.Loader'
    )
)

const SomethingWentWrongPage = lazyLoadPage(
  () =>
    import(
      /* webpackChunkName: "SomethingWentWrongPage" */ '~/src/Pages/SomethingWentWrong/SomethingWentWrong.Page'
    )
)

// UnsupportedBrowsers
const UnsupportedBrowsersLoader = lazyLoadLoader(
  () =>
    import(
      /* webpackChunkName: "UnsupportedBrowsersLoader" */ '~/src/Pages/UnsupportedBrowsers/UnsupportedBrowsers.Loader'
    )
)

const UnsupportedBrowsersPage = lazyLoadPage(
  () =>
    import(
      /* webpackChunkName: "UnsupportedBrowsersPage" */ '~/src/Pages/UnsupportedBrowsers/UnsupportedBrowsers.Page'
    )
)

const routeObj: RouteObject[] = [
  {
    element: MainLayout,
    HydrateFallback: Loader,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: APP_ROUTES.HOME.pathname,
        loader: HomeLoader,
        element: HomePage
      },
      {
        path: APP_ROUTES.ABOUT.pathname,
        loader: AboutLoader,
        element: AboutPage
      }
    ]
  },
  {
    element: ErrorLayout,
    HydrateFallback: Loader,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: APP_ROUTES.ANY.pathname,
        loader: NotFoundLoader,
        element: NotFoundPage
      },
      {
        path: APP_ROUTES.SOMETHING_WENT_WRONG.pathname,
        loader: SomethingWentWrongLoader,
        element: SomethingWentWrongPage
      },
      {
        path: APP_ROUTES.UNSUPPORTED_BROWSERS.pathname,
        loader: UnsupportedBrowsersLoader,
        element: UnsupportedBrowsersPage
      }
    ]
  }
]

const getAppRouter = () => createBrowserRouter(routeObj)

export default getAppRouter
