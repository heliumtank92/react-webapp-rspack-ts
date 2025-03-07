import '~/src/App.scss'

import type { FC } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { THEME_MODE_STORAGE_KEY } from '~/src/Constants/THEME'

import AppInitializer from '~/src/AppInitializer'
import AppTheme from '~/src/AppTheme'

export interface IAppProps {
  persisted: boolean
}

const App: FC<IAppProps> = props => {
  const { persisted } = props

  return (
    <ThemeProvider theme={AppTheme} modeStorageKey={THEME_MODE_STORAGE_KEY}>
      <CssBaseline>{persisted && <AppInitializer />}</CssBaseline>
    </ThemeProvider>
  )
}

export default App
