import { FC, forwardRef } from 'react'
import { Alert, AlertProps } from '@mui/material'
import {
  CustomContentProps,
  SnackbarProvider,
  SnackbarProviderProps
} from 'notistack'

import { TOAST_VARIANT_MAP, TOAST_VARIANTS } from './Toast.Types'

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
