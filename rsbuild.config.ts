import {
  loadEnv,
  defineConfig,
  RsbuildConfig,
  PerformanceConfig
} from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin'
import { pluginHtmlMinifierTerser } from 'rsbuild-plugin-html-minifier-terser'

export default defineConfig(({ envMode }): RsbuildConfig => {
  const { publicVars, parsed } = loadEnv({
    prefixes: ['APP_', 'AS_', 'npm_package_'],
    mode: envMode || process.env.NODE_ENV || 'development'
  })

  const bundleAnalyze: PerformanceConfig['bundleAnalyze'] = {
    analyzerMode: 'server',
    openAnalyzer: true,
    generateStatsFile: true
  }

  const config: RsbuildConfig = {
    dev: {
      lazyCompilation: true,
      progressBar: true
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
      cleanDistPath: process.env.NODE_ENV === 'production',
      copy: [{ from: 'public/static', to: 'static' }],
      inlineStyles: {
        enable: true,
        test: /[\\/]base\.\w+\.css$/
      },
      legalComments: 'none',
      polyfill: process.env.NODE_ENV === 'production' ? 'usage' : 'off',
      sourceMap: {
        js:
          process.env.NODE_ENV === 'production'
            ? // Use a high quality source map format for production
              'source-map'
            : // Use a more performant source map format for development
              'cheap-module-source-map',
        css: false
      }
    },
    html: {
      template: './public/index.html',
      templateParameters: parsed,
      tags: [
        tags => {
          tags.forEach(tag => {
            if (tag.attrs?.rel === 'stylesheet') {
              tag.attrs.media = 'print'
              tag.attrs.onload = "this.media='all'"
            }
          })
        }
      ]
    },
    performance: {
      bundleAnalyze:
        process.env.BUNDLE_ANALYZE === 'true' ? bundleAnalyze : undefined,
      removeConsole: process.env.NODE_ENV === 'production',
      removeMomentLocale: true,
      preload: {
        type: 'all-chunks',
        include: process.env.PRELOAD_SCRIPTS?.split(',').map(
          scriptName => new RegExp(`/[\\/]${scriptName}\.\w+\.js$/`)
        )
      },
      dnsPrefetch: process.env.DNS_PREFETCH?.split(','),
      preconnect: process.env.PRECONNECT?.split(',')
    },
    plugins: [pluginReact(), pluginHtmlMinifierTerser(), pluginSass()],
    tools: {
      rspack: {
        watchOptions: {
          ignored: /node_modules/
        },
        plugins: [
          // Only register the plugin when RSDOCTOR is true, as the plugin will increase the build time.
          process.env.RSDOCTOR &&
            new RsdoctorRspackPlugin({
              // plugin options
            })
        ].filter(Boolean)
      }
    }
  }

  return config
})
