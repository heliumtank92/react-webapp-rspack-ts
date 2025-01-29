export const APP_TITLE = process.env.APP_TITLE || ''
export const AS_API_DOMAIN = process.env.AS_API_DOMAIN || ''
export const AS_API_KEY = process.env.AS_API_KEY || ''
export const AS_ENABLE_CRYPTOGRAPHY =
  process.env.AS_ENABLE_CRYPTOGRAPHY === 'true'
export const AS_API_TIMEOUT = Number.parseInt(
  process.env.AS_API_TIMEOUT || '',
  10
)
