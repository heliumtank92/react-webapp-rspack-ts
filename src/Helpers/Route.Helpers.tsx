import { ComponentType, Suspense, lazy } from 'react'
import { LoaderFunction, LoaderFunctionArgs, redirect } from 'react-router'
import { AppStore } from '~/src/Configurations/AppStore'
import APP_ROUTES from '~/src/Constants/APP_ROUTES'
import { getIsLoggedInSelector } from '~/src/Redux/Auth/Selectors'

export const lazyLoadPage = (
  importer: () => Promise<{ default: ComponentType }>,
  Fallback?: ComponentType
) => {
  const Page = lazy(importer)
  const lazyPage = Fallback ? (
    <Suspense fallback={<Fallback />}>
      <Page />
    </Suspense>
  ) : (
    <Page />
  )

  return lazyPage
}

export const validatePrivateRouteLoader =
  (importer?: Promise<{ loader: LoaderFunction }>) =>
  async (args: LoaderFunctionArgs) => {
    const state = AppStore.getState()
    const isLoggedIn = getIsLoggedInSelector(state)

    if (!isLoggedIn) {
      return redirect(APP_ROUTES.DEFAULT_UNAUTH_FALLBACK.pathname)
    }

    if (importer) {
      const { loader } = await importer
      return loader(args)
    }
  }

export const validatePublicRouteLoader =
  (importer?: () => Promise<{ loader: LoaderFunction }>) =>
  async (args: LoaderFunctionArgs) => {
    const state = AppStore.getState()
    const isLoggedIn = getIsLoggedInSelector(state)

    if (isLoggedIn) {
      return redirect(APP_ROUTES.DEFAULT_AUTH_FALLBACK.pathname)
    }

    lazyLoadLoader(importer)

    if (importer) {
      const { loader } = await importer()
      return loader(args)
    }
  }

export const lazyLoadLoader =
  (importer?: () => Promise<{ loader: LoaderFunction }>) =>
  async (args: LoaderFunctionArgs) => {
    if (importer) {
      const { loader } = await importer()
      return loader(args)
    }
  }
