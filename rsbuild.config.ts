import { GenerateSW } from '@aaroon/workbox-rspack-plugin'
import { type RsbuildConfig, defineConfig, loadEnv } from '@rsbuild/core'
import { pluginBasicSsl } from '@rsbuild/plugin-basic-ssl'
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill'
import { pluginReact } from '@rsbuild/plugin-react'
// import { pluginImageCompress } from '@rsbuild/plugin-image-compress'
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin'
import { pluginHtmlMinifierTerser } from 'rsbuild-plugin-html-minifier-terser'

import manifestConfig from './manifest.config'
import { pluginFavicon } from './rsBuildPlugins/Favicon'
import { pluginRenameAssetsAndReferences } from './rsBuildPlugins/pluginRenameAssetsAndReferences'

export default defineConfig(({ env, command, envMode, meta }) => {
  const isProduction = envMode === 'production'
  const { publicVars, parsed } = loadEnv({
    prefixes: ['APP_', 'AS_', 'npm_package_'],
    mode: envMode || process.env.NODE_ENV || 'development'
  })

  const rsBuildPlugins: RsbuildConfig['plugins'] = [
    pluginReact(),
    pluginNodePolyfill()
  ]

  if (isProduction) {
    rsBuildPlugins.push(
      pluginHtmlMinifierTerser(),
      pluginFavicon('./public/favicon.svg', manifestConfig),
      // Issues with the image imageminimizer webpack plugin
      // pluginImageCompress(),
      pluginRenameAssetsAndReferences()
    )

    if (process.env.HTTPS === 'true') {
      rsBuildPlugins.push(pluginBasicSsl())
    }
  }

  const config: RsbuildConfig = {
    dev: {
      lazyCompilation: true,
      progressBar: true
    },
    server: {
      headers: {
        'cache-control': 'max-age=31536000, s-maxage=31536000'
      }
    },
    source: {
      define: publicVars,
      entry: {
        index: {
          import: './src/index.tsx',
          runtime: 'index.runtime'
        }
      }
    },
    output: {
      cleanDistPath: isProduction,
      legalComments: 'none',
      polyfill: isProduction ? 'usage' : 'off',
      sourceMap: {
        js: isProduction
          ? // Use a high quality source map format for production
            'source-map'
          : // Use a more performant source map format for development
            'cheap-module-source-map',
        css: false
      }
    },

    plugins: rsBuildPlugins,
    html: {
      template: './public/index.html',
      templateParameters: parsed,
      title: manifestConfig.appShortName || manifestConfig.appName,
      meta: {
        description: manifestConfig.appDescription || '',
        'og:title': manifestConfig.appShortName || manifestConfig.appName || '',
        'og:description': manifestConfig.appDescription || '',
        'og:type': 'website',
        'og:url': parsed.APP_URL,
        'og:image': `${parsed.APP_URL}/favicon.svg`,
        'twitter:card': 'summary',
        'twitter:title':
          manifestConfig.appShortName || manifestConfig.appName || '',
        'twitter:description': manifestConfig.appDescription || '',
        'twitter:url': parsed.APP_URL,
        'twitter:image': `${parsed.APP_URL}/favicon.svg`
      },
      tags: [
        tags => {
          for (const tag of tags) {
            if (tag.attrs?.rel === 'stylesheet') {
              tag.attrs.media = 'print'
              tag.attrs.onload = "this.media='all'"
            }
          }
        }
      ]
    },
    performance: {
      removeConsole: isProduction,
      removeMomentLocale: true,
      preload:
        (process.env.PRELOAD_SCRIPTS && {
          type: 'all-assets',
          include: process.env.PRELOAD_SCRIPTS?.split(',').map(
            scriptName => new RegExp(`/[\\/]${scriptName}\.\w+\.js$/`)
          )
        }) ||
        undefined,
      dnsPrefetch: process.env.DNS_PREFETCH?.split(','),
      preconnect: process.env.PRECONNECT?.split(',')
    },
    tools: {
      rspack(config, { appendPlugins }) {
        // Only register the plugin when RSDOCTOR is true, as the plugin will increase the build time.
        if (process.env.RSDOCTOR) {
          appendPlugins(
            new RsdoctorRspackPlugin({
              supports: {
                generateTileGraph: true
              }
            })
          )
        }

        if (isProduction) {
          appendPlugins(new GenerateSW({ swDest: './sw.js' }))
        }
      }
    }
  }

  return config
})
