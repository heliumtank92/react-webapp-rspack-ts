import { GenerateSW } from '@aaroon/workbox-rspack-plugin'
import { type RsbuildConfig, defineConfig, loadEnv } from '@rsbuild/core'
import { pluginAssetsRetry } from '@rsbuild/plugin-assets-retry'
import { pluginBasicSsl } from '@rsbuild/plugin-basic-ssl'
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin'
import { pluginEjs } from 'rsbuild-plugin-ejs'
import { pluginHtmlMinifierTerser } from 'rsbuild-plugin-html-minifier-terser'

import manifestConfig from './manifest.config'
import { pluginFavicon } from './rsBuildPlugins/Favicon'
import { pluginRenameAssetsAndReferences } from './rsBuildPlugins/pluginRenameAssetsAndReferences'

import { codeInspectorPlugin } from 'code-inspector-plugin'

export default defineConfig(({ envMode, env }) => {
  const isProduction = env === 'production'
  const pwaEnabled = process.env.APP_PWA_ENABLE === 'true'

  const { publicVars, parsed, filePaths } = loadEnv({
    prefixes: ['APP_', 'AS_', 'npm_package_'],
    mode: envMode || process.env.NODE_ENV || 'development'
  })

  if (!filePaths.length) {
    console.warn(`
===========================================================
⚠️  Environment Configuration Warning
===========================================================

No environment configuration files were found matching the following names:
  1. .env
  2. .env.local
  3. .env.${envMode}
  4. .env.${envMode}.local (Preferred)

Please ensure you are running the script with the correct --env-mode.
Please Node: if you are running script for the first time, you may need to create a .env.production.local file from env.development file.
===========================================================
`)
    process.exit(1)
  }

  const rsBuildPlugins: RsbuildConfig['plugins'] = [
    pluginReact(),
    pluginNodePolyfill(),
    pluginEjs(),
    pluginSass()
  ]

  if (isProduction) {
    rsBuildPlugins.push(
      pluginAssetsRetry(),
      pluginHtmlMinifierTerser(),
      pluginFavicon('./public/favicon.svg', manifestConfig),
      pluginRenameAssetsAndReferences()
    )
  }

  if (process.env.HTTPS === 'true') {
    rsBuildPlugins.push(pluginBasicSsl())
  }

  // Split and filter blank values
  const dnsPrefetch = process.env.DNS_PREFETCH?.split(',').filter(n => n)
  const preConnect = process.env.PRE_CONNECT?.split(',').filter(n => n)

  const config: RsbuildConfig = {
    dev: {
      lazyCompilation: true,
      progressBar: true
    },
    server: {
      headers: isProduction
        ? {
            'cache-control': 'max-age=31536000, s-maxage=31536000'
          }
        : {},
      publicDir: {
        copyOnBuild: false
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
      },
      copy: [
        {
          from: './public',
          to: './',
          globOptions: {
            ignore: ['**/favicon.svg', '**/index.ejs']
          }
        }
      ]
    },

    plugins: rsBuildPlugins,
    html: {
      template: './public/index.ejs',
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
      ],
      inject: false
    },
    performance: {
      removeConsole: isProduction,
      removeMomentLocale: isProduction,
      preload:
        (process.env.PRELOAD && {
          type: 'all-assets',
          include: process.env.PRELOAD?.split(',').map(fileName => {
            const [name, ext] = fileName.split('.')
            return new RegExp(`^.*?\/${name}.*.${ext}$`)
          })
        }) ||
        undefined,
      dnsPrefetch: (dnsPrefetch?.length && dnsPrefetch) || undefined,
      preconnect: (preConnect?.length && preConnect) || undefined
    },
    tools: {
      rspack(_config, { appendPlugins }) {
        // Only register the plugin when RSDOCTOR is true, as the plugin will increase the build time.
        if (isProduction && process.env.RSDOCTOR) {
          appendPlugins(
            new RsdoctorRspackPlugin({
              supports: {
                generateTileGraph: true
              }
            })
          )
        }

        // TODO: Optional
        if (isProduction && pwaEnabled) {
          appendPlugins(
            new GenerateSW({
              swDest: './sw.js',
              cleanupOutdatedCaches: true,
              inlineWorkboxRuntime: true,
              exclude: [/\.html$/]
            })
          )
        }

        if (!isProduction) {
          appendPlugins(codeInspectorPlugin({ bundler: 'rspack' }))
        }
      }
    }
  }

  return config
})
