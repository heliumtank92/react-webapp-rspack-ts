import { FC } from 'react'
import { Outlet } from 'react-router'
import { Stack } from '@mui/material'

const ErrorLayout: FC = () => {
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
