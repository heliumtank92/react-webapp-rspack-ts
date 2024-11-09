// import './polyfill'
// import '~/public/serviceWorkerRegistration'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'

import AppStore, { PersistedAppStore } from '~/src/Configurations/AppStore'

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <Provider store={AppStore}>
      <PersistGate persistor={PersistedAppStore} onBeforeLift={() => undefined}>
        {(persisted: boolean) => <App persisted={persisted} />}
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
