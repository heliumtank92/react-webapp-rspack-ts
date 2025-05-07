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
          async () => {
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
                const originalSource = asset.source // Get the original source object
                const fileContent = compilation.assets[fileName]
                  .source()
                  .toString()

                const replacementSource =
                  new compiler.webpack.sources.ReplaceSource(originalSource) // Passing the original source to replaceSource

                // Update references to the renamed assets in the content
                for (const { oldName, newName } of renamedAssets) {
                  const regex = new RegExp(oldName, 'g')
                  let match
                  while ((match = regex.exec(fileContent)) !== null) {
                    const startIndex = match.index
                    // The end index for ReplaceSource.replace is exclusive for the *original* string length
                    const endIndex = startIndex + oldName.length

                    // Perform the replacement
                    replacementSource.replace(startIndex, endIndex - 1, newName) // endIndex is inclusive index of last char replaced
                    console.log(
                      `Replacing "${oldName}" with "${newName}" in ${fileName} at index ${startIndex}`
                    )
                  }
                  // fileContent = fileContent.replace(regex, newName)
                }

                // Update the file content in the compilation
                // This is not required as we create a new source object (RawSource) that only contains the modified string. Crucially, RawSource has no knowledge of the original source code or the existing sourcemap associated with the asset you started with.
                // const fileContentSource =
                //   new compiler.webpack.sources.RawSource(fileContent)
                compilation.updateAsset(fileName, replacementSource)
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
