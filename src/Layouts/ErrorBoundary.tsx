import { FC, useEffect } from 'react'
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError
} from 'react-router-dom'

import Loader from '~/src/Components/Loader'

const ErrorBoundary: FC = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      navigate(error.data)
    }
  })

  return <Loader />
}

export default ErrorBoundary
