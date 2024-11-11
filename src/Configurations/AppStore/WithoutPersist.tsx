import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import reducers from '~/src/Redux/Reducers'

export const AppStore = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production'
})

export type TAppStore = ReturnType<typeof AppStore.getState>

export type TAppDispatch = typeof AppStore.dispatch

export const AppStoreProvider: React.FC<{
  AppComponent: React.FunctionComponent<{ persisted: boolean }>
}> = ({ AppComponent }) => (
  <Provider store={AppStore}>
    <AppComponent persisted />
  </Provider>
)
