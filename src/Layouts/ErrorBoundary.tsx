import React, { useEffect } from 'react'
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError
} from 'react-router-dom'

import Loader from '../Components/Loader'

const ErrorBoundary: React.FC = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      return navigate(error.data)
    }
  })

  return <Loader />
}

export default ErrorBoundary
