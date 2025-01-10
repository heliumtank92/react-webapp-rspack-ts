import { CssBaseline, ThemeProvider } from '@mui/material'
import { FC } from 'react'

import AppInitializer from '~/src/AppInitializer'
import AppTheme from '~/src/AppTheme'
import { ToastProvider } from '~/src/Components/Toast'

import { THEME_MODE_STORAGE_KEY } from '~/src/Constants/THEME'

import '~/src/App.scss'

export interface IAppProps {
  persisted: boolean
}

const App: FC<IAppProps> = props => {
  const { persisted } = props

  return (
    <ThemeProvider theme={AppTheme} modeStorageKey={THEME_MODE_STORAGE_KEY}>
      <CssBaseline>
        <ToastProvider>{persisted && <AppInitializer />}</ToastProvider>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
