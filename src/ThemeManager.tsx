import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useColorScheme } from '@am92/react-design-system'

import { getThemeReducer } from '~/src/Redux/Theme/Selectors'

const ThemeManager: React.FC = () => {
  const { scheme } = useSelector(getThemeReducer)
  const { colorScheme, setColorScheme } = useColorScheme()

  useEffect(() => {
    if (colorScheme !== scheme && setColorScheme) {
      setColorScheme(scheme)
    }
  }, [colorScheme, scheme])

  return false // Functional component doesn't render anything
}

export default ThemeManager
