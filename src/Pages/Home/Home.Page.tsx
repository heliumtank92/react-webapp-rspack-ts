import type { FC } from 'react'
import { Stack, Typography } from '@mui/material'

import HOME_IMAGE from '~/src/Assets/HOME_IMAGE'

const HomePage: FC = () => {
  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      height='var(--100vh)'
    >
      <picture>
        {HOME_IMAGE.map(
          (image, index) =>
            (index !== HOME_IMAGE.length - 1 && (
              <source
                key={`home-${index}`}
                srcSet={image.src}
                type={image.as}
              />
            )) || (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                width={335}
                height={260}
              />
            )
        )}
      </picture>
      <Typography variant='h2'>Home Page</Typography>
    </Stack>
  )
}

export default HomePage
