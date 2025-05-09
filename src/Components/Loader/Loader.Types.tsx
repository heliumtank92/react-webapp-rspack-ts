import type React from 'react'
import type { BackdropProps, BoxProps } from '@mui/material'

import { SingleDotLoader } from './SingleDotLoader'
import { ThreeDotLoader } from './ThreeDotLoader'

type TVariant = 'threeDot' | 'singleDot'
type TPosition = 'absolute' | 'fixed'

export interface LoaderProps extends BoxProps {
  variant?: TVariant
  position?: TPosition
  backdrop?: boolean
  BackdropProps?: BackdropProps
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
}

export const LOADER_MAP: Record<TVariant, React.ElementType> = {
  singleDot: SingleDotLoader,
  threeDot: ThreeDotLoader
}
