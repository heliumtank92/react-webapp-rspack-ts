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
              ]
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
