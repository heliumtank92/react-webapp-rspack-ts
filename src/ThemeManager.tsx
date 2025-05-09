import type React from 'react'
import { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { useColorScheme } from '@am92/react-design-system'

import { getThemeReducer } from '~/src/Redux/Theme/Selectors'

const ThemeManager: React.FC = () => {
  const { scheme } = useSelector(getThemeReducer)
  const { colorScheme, setColorScheme } = useColorScheme()

  // To ensure the color scheme is set correctly on the first render & solve flicker if two tab with different color schemes are open.
  useLayoutEffect(() => {
    if (colorScheme !== scheme && setColorScheme) {
      setColorScheme(scheme)
    }
  }, [colorScheme, scheme])

  return false // Functional component doesn't render anything
}

export default ThemeManager
