import { CssBaseline, ThemeProvider } from '@mui/material'
import type React from 'react'

import AppInitializer from '~/src/AppInitializer'
import AppTheme from '~/src/AppTheme'

import { THEME_MODE_STORAGE_KEY } from '~/src/Constants/THEME'

import '~/src/App.scss'

export interface IAppProps {
  persisted: boolean
}

const App: React.FC<IAppProps> = props => {
  const { persisted } = props

  return (
    <ThemeProvider theme={AppTheme} modeStorageKey={THEME_MODE_STORAGE_KEY}>
      <CssBaseline>{persisted && <AppInitializer />}</CssBaseline>
    </ThemeProvider>
  )
}

export default App
