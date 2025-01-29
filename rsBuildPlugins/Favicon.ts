import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

import type { RsbuildPlugin, RsbuildPluginAPI } from '@rsbuild/core'
import { type FaviconOptions, favicons } from 'favicons'
import { parseDocument } from 'htmlparser2'

export interface IPluginFaviconOptions
  extends Omit<FaviconOptions, 'path' | 'cacheBustingQueryParam'> {}

export const pluginFavicon = (
  source: string | Buffer,
  options?: IPluginFaviconOptions
): RsbuildPlugin => ({
  name: 'plugin-favicon',
  setup: async (api: RsbuildPluginAPI) => {
    const defaultFaviconConfig: IPluginFaviconOptions = {
      appName: undefined, // Your application's name. `string`
      appShortName: undefined, // Your application's short_name. `string`. Optional. If not set, appName will be used
      appDescription: undefined, // Your application's description. `string`
      developerName: undefined, // Your (or your developer's) name. `string`
      developerURL: undefined, // Your (or your developer's) URL. `string`
      dir: 'auto', // Primary text direction for name, short_name, and description
      lang: 'en-US', // Primary language for name and short_name
      background: '#fff', // Background colour for flattened icons. `string`
      theme_color: '#fff', // Theme color user for example in Android's task switcher. `string`
      appleStatusBarStyle: 'black-translucent', // Style for Apple status bar: "black-translucent", "default", "black". `string`
      display: 'standalone', // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
      orientation: 'any', // Default orientation: "any", "natural", "portrait" or "landscape". `string`
      scope: '/', // set of URLs that the browser considers within your app
      start_url: '/?homescreen=1', // Start URL when launching the application from a device. `string`
      preferRelatedApplications: false, // Should the browser prompt the user to install the native companion app. `boolean`
      relatedApplications: undefined, // Information about the native companion apps. This will only be used if `preferRelatedApplications` is `true`. `Array<{ id: string, url: string, platform: string }>`
      version: '1.0', // Your application's version string. `string`
      pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
      loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
      manifestMaskable: false // Maskable source image(s) for manifest.json. "true" to use default source. More information at https://web.dev/maskable-icon/. `boolean`, `string`, `buffer` or array of `string`
    }

    const rsBuildConfig = api.getRsbuildConfig()
    const { output } = rsBuildConfig
    const { distPath } = output || {}
    const { image = '' } = distPath || {}
    const iconPrefix = `${image}/icons/`

    try {
      let favicon = source
      if (!Buffer.isBuffer(favicon)) {
        favicon = fs.readFileSync(path.resolve(process.cwd(), favicon))
      }
      const contentHash = generateContentHash(favicon)

      const faviconConfig: FaviconOptions = {
        ...defaultFaviconConfig,
        ...options,
        path: iconPrefix,
        cacheBustingQueryParam: `v=${contentHash}`
      }
      const response = await favicons(source, faviconConfig)

      api.processAssets(
        { stage: 'additional' },
        ({ assets: _assets, sources, compilation }) => {
          response.images.map(({ name, contents }) => {
            const source = new sources.RawSource(contents)
            compilation.emitAsset(`${iconPrefix}${name}`, source)
          })

          response.files.map(({ name, contents }) => {
            const source = new sources.RawSource(contents)
            compilation.emitAsset(`${iconPrefix}${name}`, source)
          })

          const versionFileContent = JSON.stringify(
            {
              name: options?.appShortName || options?.appName || '',
              description: options?.appDescription || '',
              version: options?.version || '',
              buildAt: new Date().getTime(),
              buildEnv: process.env.NODE_ENV
            },
            null,
            2
          )
          const source = new sources.RawSource(versionFileContent)
          compilation.emitAsset('version.json', source)
        }
      )

      const htmlTags = response.html.map((html: string) => {
        return parseHtmlString(html)
      })

      api.modifyHTMLTags(({ headTags, bodyTags }) => {
        const newHeadTags = headTags.concat(htmlTags)
        return { headTags: newHeadTags, bodyTags }
      })
    } catch (error: any) {
      console.log(error?.message) // Error description e.g. "An unknown error has occurred"
    }
  }
})

type HtmlBasicTag = {
  tag: string
  attrs?: Record<string, string | boolean | null | undefined> | undefined
  children?: string
}

function parseHtmlString(htmlString: string): HtmlBasicTag {
  const document = parseDocument(htmlString)

  // Assume a single top-level tag in the string
  const element = document.children.find(node => node.type === 'tag')

  if (!element || element.type !== 'tag') {
    throw new Error('Invalid HTML string: No top-level tag found.')
  }

  const tag = element.name
  const attrs = element.attribs
    ? Object.fromEntries(
        Object.entries(element.attribs).map(([key, value]) => [
          key,
          value === '' ? true : (value as string | boolean | null | undefined) // Handle boolean attributes
        ])
      )
    : undefined

  return { tag, attrs }
}

function generateContentHash(content: Buffer): string {
  return crypto.createHash('md5').update(content).digest('hex').slice(0, 8)
}
