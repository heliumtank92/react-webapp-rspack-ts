import { Box, Fade, Skeleton } from '@mui/material'
import { FC, useCallback, useState } from 'react'
import { INNER_COMPONENT_STYLE, PictureProps } from './Picture.Types'

const PictureDefaultState = { stage: 'LOADING' }

export const Picture: FC<PictureProps> = props => {
  const [state, setState] = useState(PictureDefaultState)

  const handleSetLoadedStage = useCallback(
    () => setState({ stage: 'LOADED' }),
    []
  )
  const handleSetErrorStage = useCallback(
    () => setState({ stage: 'ERROR' }),
    []
  )

  const hasSource = useCallback(() => {
    const { srcSet = [] } = props
    return srcSet && srcSet.length > 0
  }, [props.srcSet])

  const renderLoadingComponent = useCallback(() => {
    const { stage } = state
    const { aspectRatio, LoaderProps } = props
    const hasSrc = hasSource()
    const isLoading = hasSrc && stage === 'LOADING'

    if (!isLoading) {
      return null
    }

    return (
      <Skeleton
        variant='rectangular'
        width='100%'
        height='100%'
        {...LoaderProps}
        sx={{
          ...(aspectRatio ? INNER_COMPONENT_STYLE : {}),
          ...LoaderProps?.sx
        }}
      />
    )
  }, [state, props, hasSource])

  const renderPictureComponent = useCallback(() => {
    const { srcSet, aspectRatio, ...PictureProps } = props
    const hasSrc = hasSource()

    if (!hasSrc) {
      return <></>
    }

    return (
      <picture onLoad={handleSetLoadedStage} onError={handleSetErrorStage}>
        {srcSet?.map((src, index) => {
          const { src: imageSrc, style, ...restProps } = src
          const isLast = index === srcSet.length - 1

          if (isLast) {
            return (
              <img
                key={index}
                src={imageSrc}
                {...restProps}
                {...PictureProps}
                style={{
                  ...(aspectRatio ? INNER_COMPONENT_STYLE : {}),
                  display: 'block',
                  maxWidth: '100%',
                  ...PictureProps?.style
                }}
              />
            )
          }

          return <source key={index} srcSet={imageSrc} {...restProps} />
        })}
      </picture>
    )
  }, [props, hasSource, handleSetLoadedStage, handleSetErrorStage])

  const { srcSet, aspectRatio, WrapperProps } = props
  const { stage } = state
  const hasSrc = srcSet && srcSet.length > 0
  const isError = !hasSrc || stage === 'ERROR'
  const isLoading = !isError && stage === 'LOADING'

  return (
    <Box
      {...WrapperProps}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        ...((aspectRatio && {
          aspectRatio: `${aspectRatio} auto`,
          overflow: 'hidden',
          width: '100%',
          height: 'auto',
          maxWidth: '100%',
          [`@supports not (aspect-ratio: ${aspectRatio})`]: {
            paddingTop: `calc((1 / ${aspectRatio}) * 100%)`,
            height: 0
          }
        }) ||
          {}),
        ...WrapperProps?.sx
      }}
    >
      {renderLoadingComponent()}
      <Fade in={!isLoading && !isError}>{renderPictureComponent()}</Fade>
    </Box>
  )
}
