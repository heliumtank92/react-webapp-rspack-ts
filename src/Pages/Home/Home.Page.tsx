import { DsImage, DsStack, DsTypography } from '@am92/react-design-system'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HOME_IMAGE from '~/src/Assets/HOME_IMAGE'
import { setThemeSchemeAction } from '~/src/Redux/Theme/Actions'
import { getThemeReducer } from '~/src/Redux/Theme/Selectors'

const HomePage: FC = () => {
  const dispatch = useDispatch()
  const { scheme } = useSelector(getThemeReducer)

  const _handleSchemeChange = (_name: string, value: boolean) => {
    const newScheme = value ? 'dark' : 'light'
    dispatch(setThemeSchemeAction(newScheme))
  }

  return (
    <DsStack
      justifyContent={'center'}
      alignItems={'center'}
      direction={'column'}
      height={'var(--100vh)'}
      sx={{
        px: 'var(--ds-spacing-warm)'
      }}
    >
      <DsImage
        srcSet={HOME_IMAGE}
        aspectRatio={1}
        style={{ width: '100%', height: 'auto' }}
        WrapperProps={{
          sx: {
            width: { xs: '150px', lg: '200px' },
            height: { xs: '150px', lg: '200px' }
          }
        }}
      />
      <DsTypography variant='displayBoldLarge'>Home Page</DsTypography>
    </DsStack>
  )
}

export default HomePage
