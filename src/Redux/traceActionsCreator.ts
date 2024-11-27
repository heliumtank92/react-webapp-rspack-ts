import type { WebHttpError } from '@am92/web-http'
import { createAction } from '@reduxjs/toolkit'

import type { TraceActions } from './serviceActionCreator'

export default function traceActionsCreator<Response = unknown>(
  serviceName: string
) {
  const loading = createAction(`${serviceName}/LOADING`)
  const success = createAction<Response, string>(`${serviceName}/SUCCESS`)
  const error = createAction<WebHttpError, string>(`${serviceName}/ERROR`)

  const traceActions: TraceActions<Response> = { loading, success, error }
  return traceActions
}
