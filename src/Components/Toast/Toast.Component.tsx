import type { FC } from 'react'
import { forwardRef } from 'react'
import type { AlertProps } from '@mui/material'
import { Alert } from '@mui/material'
import type { CustomContentProps, SnackbarProviderProps } from 'notistack'
import { SnackbarProvider } from 'notistack'

import type { TOAST_VARIANT_MAP } from './Toast.Types'
import { TOAST_VARIANTS } from './Toast.Types'

export const ToastProvider: FC<SnackbarProviderProps> = props => {
  const { children, Components, ...restProps } = props

  const components = TOAST_VARIANTS.reduce(
    (acc, key) => {
      const variant = key as keyof typeof TOAST_VARIANT_MAP
      acc[variant] = ToastComponent
      return acc
    },
    { default: ToastComponent } as Exclude<
      SnackbarProviderProps['Components'],
      undefined
    >
  )

  return (
    <SnackbarProvider
      {...restProps}
      Components={{ ...components, ...Components }}
    >
      {children}
    </SnackbarProvider>
  )
}

interface IToastComponentProps
  extends Omit<CustomContentProps, keyof AlertProps>,
    AlertProps {}

export const ToastComponent = forwardRef<HTMLDivElement, IToastComponentProps>(
  (props, ref) => {
    const variant = TOAST_VARIANTS.includes(props.variant!)
      ? props.variant
      : 'standard'

    const alertProps: AlertProps = {
      action: props.action,
      children: props.children || props.message,
      classes: props.classes,
      className: props.className,
      closeText: props.closeText,
      color: props.color,
      components: props.components,
      componentsProps: props.componentsProps,
      icon: props.icon,
      iconMapping: props.iconMapping,
      onClose: props.onClose,
      role: props.role,
      severity: props.severity,
      slotProps: props.slotProps,
      slots: props.slots,
      sx: props.sx,
      variant
    }
    return <Alert ref={ref} {...alertProps} />
  }
)

ToastComponent.displayName = 'ToastComponent'
