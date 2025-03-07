import { CSSProperties, ImgHTMLAttributes, SourceHTMLAttributes } from 'react'
import { BoxProps, SkeletonProps } from '@mui/material'

export interface PictureSrcSetProps
  extends Omit<
    SourceHTMLAttributes<HTMLSourceElement | HTMLImageElement>,
    'srcSet' | 'ref'
  > {
  src: string
  alt: string
}

export interface PictureProps
  extends Omit<ImgHTMLAttributes<HTMLPictureElement>, 'srcSet'> {
  srcSet?: PictureSrcSetProps[]
  aspectRatio?: number
  WrapperProps?: BoxProps
  LoaderProps?: SkeletonProps
}

export interface PictureState {
  stage: 'LOADING' | 'LOADED' | 'ERROR'
}

export const PictureDefaultState: PictureState = {
  stage: 'LOADING'
}

export const INNER_COMPONENT_STYLE: CSSProperties = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  left: '50%',
  top: '50%'
}
