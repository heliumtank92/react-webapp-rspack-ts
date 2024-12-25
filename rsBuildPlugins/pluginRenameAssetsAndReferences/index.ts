import type { RsbuildPlugin, RsbuildPluginAPI } from '@rsbuild/core'
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin'
import RenameAssetsAndReferencesRsPackPlugin from './RenameAssetsAndReferencesRsPackPlugin'

export const pluginRenameAssetsAndReferences = (): RsbuildPlugin => ({
  name: 'plugin-rename-assets-and-references',
  setup: async (api: RsbuildPluginAPI) => {
    api.modifyRspackConfig(config => {
      config.module = config.module || {}
      config.module.rules = config.module.rules || []
      config.module.rules.push({
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/resource',
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              generator: [
                {
                  // You can apply generator using `?as=webp`, you can use any name and provide more options
                  preset: 'avif',
                  implementation: ImageMinimizerPlugin.sharpGenerate,
                  options: {
                    encodeOptions: {
                      avif: {
                        lossless: true
                      }
                    }
                  }
                },
                {
                  // You can apply generator using `?as=webp`, you can use any name and provide more options
                  preset: 'webp',
                  implementation: ImageMinimizerPlugin.sharpGenerate,
                  options: {
                    encodeOptions: {
                      webp: {
                        lossless: true
                      }
                    }
                  }
                }
              ],
              minimizer: {
                implementation: ImageMinimizerPlugin.sharpMinify,
                options: {
                  encodeOptions: {
                    jpeg: {
                      quality: 85, // Balances quality and file size for web use.
                      progressive: true, // Enables progressive JPEG for faster web loading.
                      chromaSubsampling: '4:4:4', // Ensures better color quality by avoiding color subsampling.
                      optimizeCoding: true, // Optimizes Huffman coding for smaller file sizes.
                      mozjpeg: true // Uses the MozJPEG encoder for superior compression efficiency.
                    },
                    png: {
                      compressionLevel: 9, // Maximum compression level for smaller file size.
                      quality: 100, // Ensures the highest quality output.
                      adaptiveFiltering: true, // Improves the quality of gradients in the image.
                      palette: true, // Reduces file size by optimizing colors while preserving appearance.
                      progressive: true // Enables progressive rendering for faster loading in browsers.
                    },
                    webp: {
                      quality: 85, // High visual quality with good compression.
                      lossless: true, // Use lossy compression for smaller file size (set to true for lossless WebP).
                      alphaQuality: 100, // Maintains maximum quality for transparency.
                      effort: 6 // Balances encoding speed and compression efficiency (1 is fastest, 6 is default, 9 is slowest).
                    },
                    avif: {
                      quality: 85, // High visual quality with good compression.
                      lossless: true, // Use lossy compression for smaller file sizes (set to true for lossless AVIF).
                      effort: 6, // Balances encoding speed and compression efficiency (1 is fastest, 9 is slowest).
                      chromaSubsampling: '4:4:4' // Ensures better color fidelity, especially for text and fine details.
                    }
                  }
                }
              }
            }
          }
        ]
      })
      config.plugins = config.plugins || []
      config.plugins.push(new RenameAssetsAndReferencesRsPackPlugin())
      return config
    })
  }
})
