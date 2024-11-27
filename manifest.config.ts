import type { IPluginFaviconOptions } from './rsBuildPlugins/Favicon'

const version = process.env.npm_package_version

const manifestConfig: IPluginFaviconOptions = {
  appName: 'RsBuild Application', // Your application's name. `string`
  appShortName: 'RsBuild App', // Your application's short_name. `string`. Optional. If not set, appName will be used
  appDescription: 'RsBuild App Boilerplate', // Your application's description. `string`
  developerName: 'Ankit Gandhi', // Your (or your developer's) name. `string`
  developerURL: undefined, // Your (or your developer's) URL. `string`
  dir: 'auto', // Primary text direction for name, short_name, and description
  lang: 'en-US', // Primary language for name and short_name
  background: 'transparent', // Background colour for flattened icons. `string`
  theme_color: '#000', // Theme color user for example in Android's task switcher. `string`
  appleStatusBarStyle: 'black-translucent', // Style for Apple status bar: "black-translucent", "default", "black". `string`
  display: 'standalone', // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
  orientation: 'any', // Default orientation: "any", "natural", "portrait" or "landscape". `string`
  scope: '/', // set of URLs that the browser considers within your app
  start_url: '/?homescreen=1', // Start URL when launching the application from a device. `string`
  preferRelatedApplications: false, // Should the browser prompt the user to install the native companion app. `boolean`
  relatedApplications: undefined, // Information about the native companion apps. This will only be used if `preferRelatedApplications` is `true`. `Array<{ id: string, url: string, platform: string }>`
  version, // Your application's version string. `string`
  pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
  loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
  manifestMaskable: false // Maskable source image(s) for manifest.json. "true" to use default source. More information at https://web.dev/maskable-icon/. `boolean`, `string`, `buffer` or array of `string`
}

export default manifestConfig
