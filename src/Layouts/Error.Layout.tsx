import { Stack } from '@mui/material'
import { FunctionComponent } from 'react'
import { Outlet } from 'react-router'

interface IErrorLayoutProps {}

const ErrorLayout: FunctionComponent<IErrorLayoutProps> = _props => {
  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      sx={{ height: 'var(--100vh)' }}
    >
      <Outlet />
    </Stack>
  )
}

export default ErrorLayout
