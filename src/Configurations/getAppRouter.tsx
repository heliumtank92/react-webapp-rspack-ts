import React from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'

import MainLayout from '~/src/Layouts/Main.Layout'

import ErrorBoundary from '../Layouts/ErrorBoundary'
import NotFoundLoader from '../Pages/NotFound/NotFound.Loader'

import APP_ROUTES from '~/src/Constants/APP_ROUTES'

const HomePage = React.lazy(
  () => import(/* webpackChunkName: "Home" */ '~/src/Pages/Home/Home.Page')
)
const NotFoundPage = React.lazy(
  () =>
    import(
      /* webpackChunkName: "NotFound" */ '~/src/Pages/NotFound/NotFound.Page'
    )
)

const routeObj: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: APP_ROUTES.HOME.pathname,
        element: <HomePage />
      }
    ]
  } as RouteObject,
  {
    path: APP_ROUTES.ANY.pathname,
    loader: NotFoundLoader,
    errorElement: <ErrorBoundary />,
    element: <NotFoundPage />
  } as RouteObject
]

const getAppRouter = () =>
  createBrowserRouter(routeObj, {
    future: {
      v7_fetcherPersist: true,
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    }
  })

export default getAppRouter
