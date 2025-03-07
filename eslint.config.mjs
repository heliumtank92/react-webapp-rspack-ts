import pluginJs from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import eslintPluginJsonc from 'eslint-plugin-jsonc'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginReact from 'eslint-plugin-react'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['src/AssetFiles/*']
  },
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  pluginJs.configs.recommended,
  importPlugin.flatConfigs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  ...eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
  eslintPluginPrettierRecommended,
  {
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        typescript: {}
      }
    },
    plugins: {
      tseslint: tseslint.plugin,
      react: pluginReact,
      unusedImports: unusedImports,
      'simple-import-sort': simpleImportSort
    }
  },
  {
    rules: {
      'no-var': 'error',
      'max-depth': 2,
      'no-case-declarations': 'off',
      'no-unreachable-loop': 'error',
      'no-unneeded-ternary': 'error',
      'tseslint/no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true }
      ],
      'tseslint/no-explicit-any': 'warn',
      'tseslint/ban-ts-comment': 'off',
      'no-unused-vars': 'off',
      'unusedImports/no-unused-imports': 'error',
      'import/no-duplicates': 'error',
      'import/first': 'error',
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'with-single-extends'
        }
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' }
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            [
              '^react',
              '^react-redux',
              '^@reduxjs/toolkit',
              '^react-router-dom',
              '^(crypto|events|fs)((\\/.*)|$)',
              '^node:',
              '^@?\\w'
            ],
            [
              '(\\.(\\.)?|~\\/src)\\/(l|L)ayouts?(\\.|\\/)?',
              '(\\.(\\.)?|~\\/src)\\/Hocs?(\\.|\\/)?'
            ],
            ['(\\.(\\.)?|~\\/src)\\/(c|C)omponents?(\\.|\\/)?'],
            ['^[\\.\\.\\/]', '^[\\.\\/]'],
            [
              '(\\.(\\.)?|~\\/src)\\/(r|R)edux?(\\.|\\/)?',
              '(\\.(\\.)?|~\\/src)\\/(s|S)ervice?(\\.|\\/)?'
            ],
            [
              '(\\.(\\.)?|~\\/src)\\/(c|C)onstants?(\\.|\\/)?',
              '(\\.(\\.)?|~\\/src)\\/(c|C)onfigurations?(\\.|\\/)?',
              '(\\.(\\.)?|~\\/src)\\/(u|U)tils?(\\.|\\/)?'
            ]
          ]
        }
      ],
      'react/prop-types': 'off'
    }
  }
]
