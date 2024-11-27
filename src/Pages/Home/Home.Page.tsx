import { Stack, Typography } from '@mui/material'
import type React from 'react'
import HOME_IMAGE from '~/src/Assets/HOME_IMAGE'

type IHomePageProps = Record<string, never>

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
  console.log('home', HOME_IMAGE)
  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      height='100vh'
      width='100vw'
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
      <Typography variant='h2'>Home Page1</Typography>
    </Stack>
  )
}

export default HomePage
