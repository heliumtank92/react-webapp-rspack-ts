import { useColorScheme } from '@am92/react-design-system'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getThemeReducer } from '~/src/Redux/Theme/Selectors'

export interface IThemeManagerProps {}

const ThemeManager: React.FC<IThemeManagerProps> = () => {
  const { scheme } = useSelector(getThemeReducer)
  const { colorScheme, setColorScheme } = useColorScheme()

  useEffect(() => {
    if (colorScheme !== scheme) {
      setColorScheme && setColorScheme(scheme)
    }
  }, [colorScheme, scheme])

  return false // Functional component doesn't render anything
}

export default ThemeManager
