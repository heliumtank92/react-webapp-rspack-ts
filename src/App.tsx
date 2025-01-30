import {
  CssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider
} from '@mui/material'

import AppInitializer from '~/src/AppInitializer'
import AppTheme from '~/src/AppTheme'

import { THEME_MODE_STORAGE_KEY } from '~/src/Constants/THEME'

import '~/src/App.scss'
import { FC } from 'react'

export interface IAppProps {
  persisted: boolean
}

const App: FC<IAppProps> = props => {
  const { persisted } = props

  return (
    <CssVarsProvider theme={AppTheme} modeStorageKey={THEME_MODE_STORAGE_KEY}>
      <CssBaseline>{persisted && <AppInitializer />}</CssBaseline>
    </CssVarsProvider>
  )
}

export default App
