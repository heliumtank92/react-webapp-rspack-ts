import { configureStore } from '@reduxjs/toolkit'
import localforage from 'localforage'
import { Provider } from 'react-redux'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import App from '~/src/App'

import reducers, { persistedReducers, TReducers } from '~/src/Redux/Reducers'

const persistConfig = {
  key: process.env.APP_TITLE || 'APP_TITLE',
  version: 1,
  storage: localforage,
  whitelist: persistedReducers
}

export const AppStore = configureStore({
  reducer: persistReducer<TReducers>(persistConfig, reducers),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
})

const PersistedAppStore = persistStore(AppStore)

export type TAppStore = ReturnType<typeof AppStore.getState>

export type TAppDispatch = typeof AppStore.dispatch

export const AppStoreProvider: React.FC<{
  AppComponent: React.FunctionComponent<{ persisted: boolean }>
}> = ({ AppComponent }) => (
  <Provider store={AppStore}>
    <PersistGate persistor={PersistedAppStore} onBeforeLift={() => undefined}>
      {(persisted: boolean) => <AppComponent persisted={persisted} />}
    </PersistGate>
  </Provider>
)
