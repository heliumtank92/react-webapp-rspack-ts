import { FC } from 'react'
import { Stack, Typography } from '@mui/material'

import { Picture } from '~/src/Components/Picture'

import HOME_IMAGE from '~/src/Assets/HOME_IMAGE'

const HomePage: FC = () => {
  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      height='var(--100vh)'
    >
      <Picture srcSet={HOME_IMAGE} aspectRatio={1} />
      <Typography variant='h2'>Home Page</Typography>
    </Stack>
  )
}

export default HomePage
