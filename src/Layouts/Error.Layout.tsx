import { DsStack } from '@am92/react-design-system'
import { FC } from 'react'
import { Outlet } from 'react-router'

const ErrorLayout: FC = () => {
  return (
    <DsStack
      justifyContent='center'
      alignItems='center'
      sx={{ height: 'var(--100vh)' }}
    >
      <Outlet />
    </DsStack>
  )
}

export default ErrorLayout
