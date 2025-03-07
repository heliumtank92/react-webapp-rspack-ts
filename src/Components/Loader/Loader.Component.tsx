import { FC } from 'react'
import { Backdrop } from '@mui/material'
import { Box, type SystemStyleObject, type Theme } from '@mui/system'

import { LOADER_MAP, LoaderProps } from './Loader.Types'

export const Loader: FC<LoaderProps> = props => {
  const {
    variant = 'threeDot',
    color,
    position = 'fixed',
    backdrop = true,
    BackdropProps,
    ...boxProps
  } = props

  const LoaderElement = LOADER_MAP[variant]

  const dotColor =
    (color && `var(--mui-palette-${color}-main)`) ||
    (backdrop && 'var(--mui-palette-common-white)') ||
    'var(--mui-palette-primary-main)'

  return (
    <Backdrop {...BackdropProps} open={true} invisible={!backdrop}>
      <Box
        sx={{
          position,
          color: dotColor,
          maxheight: '120px',
          maxWidth: '120px',
          ...((boxProps.sx as SystemStyleObject<Theme>) || {})
        }}
      >
        <LoaderElement />
      </Box>
    </Backdrop>
  )
}
