import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import { AppStoreProvider } from './Configurations/AppStore'

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <AppStoreProvider AppComponent={App} />
  </React.StrictMode>
)
