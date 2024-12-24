import { LoaderFunctionArgs } from 'react-router'

export async function loader(_loaderArgs: LoaderFunctionArgs) {
  return { message: 'Hello, world!' }
}
