import { DsImage, DsStack, DsTypography } from '@am92/react-design-system'
import { FC } from 'react'
import HOME_IMAGE from '~/src/Assets/HOME_IMAGE'

const HomePage: FC = () => {
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
