import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

import { RsbuildPlugin, RsbuildPluginAPI } from '@rsbuild/core'
import sharp from 'sharp'

type FileConfig = {
  fileName: string
  buffer: Buffer
  size: number
  format: 'png' | 'ico'
}

export type PluginFaviconOptions = {
  svgPath?: string
  pngSizes?: number[]
  icoSizes?: number[]
}

const DEFAULT_OPTIONS: PluginFaviconOptions = {
  svgPath: 'public/favicon.svg',
  pngSizes: [192, 512],
  icoSizes: [32]
}

export const pluginFavicon = (
  appName: string,
  options: PluginFaviconOptions = {}
): RsbuildPlugin => ({
  name: 'plugin-favicon',
  setup: async (api: RsbuildPluginAPI) => {
    // Get Rsbuild Config
    const rsbiuldConfig = api.getRsbuildConfig()

    // Bypass Plugin if mode is not production
    if (rsbiuldConfig.mode !== 'production') {
      return
    }

    // Extract Paths from Rsbuild Config
    const paths = rsbiuldConfig.output?.distPath || {}
    const distPath = `./${paths.root}`
    const imagePath = `${distPath}/${paths.image}`

    // Build Plugin Options
    const opts = { ...DEFAULT_OPTIONS, ...options }
    const pngSizes = opts.pngSizes || []
    const icoSizes = opts.icoSizes || []

    // Get SVG Buffer
    const svgBuffer = getSvgBuffer(opts.svgPath || '')
    const svgFileName = `favicon.${generateContentHash(svgBuffer)}.svg`

    // Build File Configs for Icons to be generated
    const fileConfigs = await getFileConfigs(svgBuffer, pngSizes, icoSizes)

    // Emit Favicon Files
    api.onBeforeEnvironmentCompile(() => {
      fs.writeFileSync(`${distPath}/${svgFileName}`, svgBuffer)

      for (const fileConfig of fileConfigs) {
        const { buffer, fileName } = fileConfig
        fs.writeFileSync(`${imagePath}/${fileName}`, buffer)
      }
    })

    // Update Rsbuild Config
    api.modifyRsbuildConfig(async config => {
      config.html = config.html || {}
      config.html.favicon = `${distPath}/${svgFileName}`
      config.html.appIcon = {
        name: appName,
        icons: fileConfigs.map(fileConfig => {
          return {
            src: `${imagePath}/${fileConfig.fileName}`,
            size: fileConfig.size
          }
        })
      }

      return config
    })
  }
})

function getSvgBuffer(svgPath: string): Buffer {
  const favicon = path.resolve(process.cwd(), svgPath)
  const svgBuffer = fs.readFileSync(favicon)
  return svgBuffer
}

async function getFileConfigs(
  svgBuffer: Buffer,
  pngSizes: number[],
  icoSizes: number[]
): Promise<FileConfig[]> {
  const promises: Array<Promise<FileConfig>> = []

  // Generate PNG Files by Defined Sizes
  for (const size of pngSizes) {
    const promise = getFileData(svgBuffer, size, 'png')
    promises.push(promise)
  }

  // Generate ICO Files by Defined Sizes
  for (const size of icoSizes) {
    const promise = getFileData(svgBuffer, size, 'ico')
    promises.push(promise)
  }

  const promiseResults = await Promise.allSettled(promises)
  const fileConfigs: FileConfig[] = []

  promiseResults.forEach(promiseResult => {
    if (promiseResult.status === 'fulfilled') {
      fileConfigs.push(promiseResult.value)
    } else {
      console.error(promiseResult.reason)
    }
  })

  return fileConfigs
}

async function getFileData(
  svgBuffer: Buffer,
  size: number,
  format: 'ico' | 'png'
): Promise<FileConfig> {
  try {
    let sharpObj = sharp(svgBuffer).resize(size, size)
    if (format === 'png') {
      sharpObj = sharpObj.png()
    }
    const buffer = await sharpObj.toBuffer()
    const hash = generateContentHash(buffer)
    const fileName = `icon-${size}.${hash}.${format}`
    return { buffer, fileName, size, format }
  } catch (error) {
    throw new Error(
      `[pluginFavicon] Error generating '${format}' file for size '${size}x${size}': ${error}`
    )
  }
}

function generateContentHash(content: Buffer): string {
  return crypto.createHash('md5').update(content).digest('hex').slice(0, 8)
}
