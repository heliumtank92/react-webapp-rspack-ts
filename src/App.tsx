import {
  Experimental_CssVarsProvider as CssVarsProvider,
  DsCssBaseline,
  getTheme
} from '@am92/react-design-system'

import AppInitializer from '~/src/AppInitializer'

import { THEME_MODE_STORAGE_KEY } from '~/src/Constants/THEME'

import '~/src/App.scss'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { getThemeReducer } from './Redux/Theme/Selectors'
import ThemeManager from './ThemeManager'

export interface IAppProps {
  persisted: boolean
}

const App: FC<IAppProps> = props => {
  const { persisted } = props

  const { fontFamily, palette } = useSelector(getThemeReducer)
  const AppTheme = getTheme(palette, fontFamily)

  return (
    <CssVarsProvider theme={AppTheme} modeStorageKey={THEME_MODE_STORAGE_KEY}>
      <DsCssBaseline>
        <ThemeManager />
        {persisted && <AppInitializer />}
      </DsCssBaseline>
    </CssVarsProvider>
  )
}

export default App
