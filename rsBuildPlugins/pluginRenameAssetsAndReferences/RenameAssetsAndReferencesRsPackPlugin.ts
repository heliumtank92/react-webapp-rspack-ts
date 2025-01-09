import url from 'node:url'
import type { Compilation, Compiler, WebpackPluginInstance } from '@rspack/core'

const EXTENSIONS = ['webp', 'avif']

class RenameAssetsAndReferencesRsPackPlugin implements WebpackPluginInstance {
  // The apply method hooks into Rspack's compiler lifecycle
  apply(compiler: Compiler): void {
    compiler.hooks.compilation.tap(
      'RenameAssetsAndReferencesRsPackPlugin',
      (compilation: Compilation) => {
        compilation.hooks.processAssets.tap(
          {
            name: 'RenameAssetsAndReferencesRsPackPlugin'
          },
          async _assets => {
            const assets = compilation.getAssets()
            // Step 1: Rename the assets
            const renamedAssets: Array<{ oldName: string; newName: string }> =
              []

            // compilation.updateAsset
            for (const asset of assets) {
              const assetName = asset.name
              const assetSourceName = asset.info.sourceFilename

              if (assetSourceName) {
                const { query } = url.parse(assetSourceName, true)

                const newExtension = (query.as as string) || ''
                if (EXTENSIONS.includes(newExtension)) {
                  const newAssetName = assetName.replace(
                    /\.(png|jpe?g|gif)$/i,
                    `.${newExtension}`
                  )
                  renamedAssets.push({
                    oldName: assetName,
                    newName: newAssetName
                  })
                }
              }
            }

            // Step 2: Update references in JavaScript or CSS files
            // const assetReferences = Object.keys(renamedAssets)

            for (const asset of assets) {
              const fileName = asset.name
              // Check if this asset is a JavaScript or CSS file that might contain references
              if (fileName.endsWith('.js') || fileName.endsWith('.css')) {
                let fileContent = compilation.assets[fileName]
                  .source()
                  .toString()

                // Update references to the renamed assets in the content
                for (const { oldName, newName } of renamedAssets) {
                  const regex = new RegExp(oldName, 'g')
                  fileContent = fileContent.replace(regex, newName)
                }

                // Update the file content in the compilation
                const fileContentSource =
                  new compiler.webpack.sources.RawSource(fileContent)
                compilation.updateAsset(fileName, fileContentSource)
              }
            }

            // Add renamed assets back to the compilation
            for (const { oldName, newName } of renamedAssets) {
              compilation.renameAsset(oldName, newName)
            }
          }
        )
      }
    )
  }
}

export default RenameAssetsAndReferencesRsPackPlugin
