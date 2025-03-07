import type { AlertProps } from '@mui/material'

export type TTostVariant = Exclude<AlertProps['variant'], undefined>
export type TTostVariantMap<V = true> = Record<TTostVariant, V>

export const TOAST_VARIANT_MAP: TTostVariantMap = {
  filled: true,
  outlined: true,
  standard: true
}
export const TOAST_VARIANTS = Object.keys(TOAST_VARIANT_MAP) as TTostVariant[]

declare module 'notistack' {
  interface OptionsObject extends AlertProps {}

  interface VariantOverrides extends TTostVariantMap {
    default: false
    info: false
    error: false
    warning: false
    success: false
  }
}
