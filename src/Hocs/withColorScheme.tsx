import { type SupportedColorScheme, useColorScheme } from '@mui/material'
import type React from 'react'
import type { Subtract } from 'utility-types'

/**
 * Basic Interface to extend in components wrapping the below HOC.
 *
 * @export
 * @interface IWithColorSchemeProps
 */
export interface IWithColorSchemeProps {
  colorScheme?: SupportedColorScheme
  setColorScheme?: (mode: SupportedColorScheme) => void
}

/**
 * HOC to provide current mode & toggle mode feature
 *
 * @template P
 * @param Child
 * @returns
 */
export default function withColorScheme<P extends IWithColorSchemeProps>(
  Child: React.ComponentType<P>
) {
  return function withColorSchemeWrapper(
    props: Subtract<P, IWithColorSchemeProps>
  ) {
    const { colorScheme, setColorScheme } = useColorScheme()

    return (
      <Child
        {...(props as P)}
        colorScheme={colorScheme}
        setColorScheme={setColorScheme}
      />
    )
  }
}
