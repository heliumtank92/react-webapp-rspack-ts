import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'

import AppInitializer from './AppInitializer'
import AppTheme from './AppTheme'

import { THEME_MODE_STORAGE_KEY } from '~/src/Constants/THEME'

import './App.scss'

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
