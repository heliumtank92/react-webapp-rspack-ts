import { configureStore } from '@reduxjs/toolkit'
import { FC } from 'react'
import { Provider } from 'react-redux'

import reducers from '~/src/Redux/Reducers'

export const AppStore = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production'
})

const { dispatch: appDispatch, getState: getAppStore } = AppStore

export type TAppStore = ReturnType<typeof getAppStore>
export type TAppDispatch = typeof appDispatch
export { appDispatch, getAppStore }

export const AppStoreProvider: FC<{
  AppComponent: FC<{ persisted: boolean }>
}> = ({ AppComponent }) => (
  <Provider store={AppStore}>
    <AppComponent persisted />
  </Provider>
)
