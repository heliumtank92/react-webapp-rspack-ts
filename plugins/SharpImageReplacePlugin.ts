import { Compiler, Compilation } from '@rspack/core'
import sharp from 'sharp'

// Define the interface for the plugin options
interface SharpImageReplacePluginOptions {
  jpegQuality?: number
  pngCompressionLevel?: number
  webpQuality?: number
  avifQuality?: number
  replaceWithWebp?: boolean
  replaceWithAvif?: boolean
}

// Plugin Class
class SharpImageReplacePlugin {
  private options: SharpImageReplacePluginOptions

  constructor(options: SharpImageReplacePluginOptions = {}) {
    // Set default options and merge with user-provided options
    this.options = {
      jpegQuality: options.jpegQuality ?? 75,
      pngCompressionLevel: options.pngCompressionLevel ?? 9,
      webpQuality: options.webpQuality ?? 75,
      avifQuality: options.avifQuality ?? 50,
      replaceWithWebp: options.replaceWithWebp ?? false,
      replaceWithAvif: options.replaceWithAvif ?? false
    }
  }

  apply(compiler: Compiler): void {
    compiler.hooks.emit.tapAsync(
      'SharpImageReplacePlugin',
      async (compilation: Compilation, callback: (err?: Error) => void) => {
        const processedImages: string[] = []

        // Iterate over each asset in the compilation
        for (const assetName in compilation.assets) {
          // Check for WebP or AVIF replacement based on options or query parameters
          const replaceWithWebp =
            this.options.replaceWithWebp || assetName.includes('?as=webp')
          const replaceWithAvif =
            this.options.replaceWithAvif || assetName.includes('?as=avif')

          // Remove query parameters from the asset name
          const baseAssetName = assetName.split('?')[0]

          // Process only image formats (png, jpg, jpeg, gif)
          if (/\.(png|jpe?g|gif)$/i.test(baseAssetName)) {
            const asset = compilation.assets[assetName]
            const originalSource = asset.source() as Buffer

            try {
              let optimizedBuffer: Buffer = new Buffer(0)
              let newAssetName = baseAssetName

              // Replace with WebP if specified
              if (replaceWithWebp) {
                optimizedBuffer = await sharp(originalSource)
                  .webp({ quality: this.options.webpQuality })
                  .toBuffer()
                newAssetName = baseAssetName.replace(
                  /\.(png|jpe?g|gif)$/i,
                  '.webp'
                )
              }
              // Replace with AVIF if specified
              else if (replaceWithAvif) {
                optimizedBuffer = await sharp(originalSource)
                  .avif({ quality: this.options.avifQuality })
                  .toBuffer()
                newAssetName = baseAssetName.replace(
                  /\.(png|jpe?g|gif)$/i,
                  '.avif'
                )
              }
              // Otherwise, optimize based on the original format
              else {
                if (/\.jpe?g$/i.test(baseAssetName)) {
                  optimizedBuffer = await sharp(originalSource)
                    .jpeg({ quality: this.options.jpegQuality })
                    .toBuffer()
                } else if (/\.png$/i.test(baseAssetName)) {
                  optimizedBuffer = await sharp(originalSource)
                    .png({ compressionLevel: this.options.pngCompressionLevel })
                    .toBuffer()
                } else if (/\.gif$/i.test(baseAssetName)) {
                  optimizedBuffer = await sharp(originalSource).gif().toBuffer()
                }
              }

              // Delete the original asset and replace it with the optimized buffer
              compilation.emitAsset(
                newAssetName,
                new compiler.webpack.sources.RawSource(optimizedBuffer)
              )
              delete compilation.assets[assetName]
              // compilation.assets[newAssetName] = {
              //   source: () => optimizedBuffer,
              //   size: () => optimizedBuffer.length
              // }

              processedImages.push(newAssetName)
            } catch (err) {
              console.error(`Error processing image ${baseAssetName}:`, err)
            }
          }
        }

        console.log(
          `Processed and replaced images: ${processedImages.join(', ')}`
        )
        callback()
      }
    )

    // Log completion
    compiler.hooks.done.tap('SharpImageReplacePlugin', () => {
      console.log('SharpImageReplacePlugin: Image replacement complete!')
    })
  }
}

export default SharpImageReplacePlugin
