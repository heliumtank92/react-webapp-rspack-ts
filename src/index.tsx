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

// if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/service-worker.js')
//       .then(registration => {
//         console.log('SW registered: ', registration)
//       })
//       .catch(registrationError => {
//         console.log('SW registration failed: ', registrationError)
//       })
//   })
// }
