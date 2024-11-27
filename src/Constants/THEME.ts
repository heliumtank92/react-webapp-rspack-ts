import manifestConfig from '~/manifest.config'

export const THEME_MODE_STORAGE_KEY: string = `${(
  manifestConfig.appName || ''
).replaceAll(' ', '-')}-mode`
