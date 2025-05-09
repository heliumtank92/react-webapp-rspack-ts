import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import jsonc from 'eslint-plugin-jsonc'
import prettier from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,cjs,mjs,ts,tsx,jsx,json,jsonc,json5}'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.vscode/**',
      '**/.cache/**',
      '**/coverage/**',
      '**/storybook-static/**',
      '**/package-lock.json',
      '**/yarn.lock',
      '**/pnpm-lock.yaml',
      '**/.DS_Store',
      'src/AssetFiles/*' // Keeping your existing ignore
    ]
  },

  // Base JS config - applies to all JS/TS(X) files
  js.configs.recommended,

  // React specific rules and settings
  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser // Ensure browser globals are available for React
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: { version: 'detect' }
    },
    plugins: {
      react
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      'react/prop-types': 'off' // As in your original config
    }
  },

  // TypeScript specific rules and settings
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        // Add browser globals here as well for TSX files
        ...globals.browser
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' }
      ]
    }
  },

  // Import sorting and unused imports - applies to all JS/TS(X) files
  {
    settings: {
      'import/resolver': {
        typescript: {}
      }
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      import: importPlugin
    },
    rules: {
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
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'import/no-duplicates': 'error',
      'import/first': 'error'
    }
  },

  // Prettier - should be last to avoid conflicts
  prettier,

  // JSON/JSONC specific rules
  {
    files: ['**/*.json', '**/*.jsonc', '**/*.json5'],
    plugins: { jsonc },
    languageOptions: {
      parser: jsonc.parser
    },
    rules: {
      ...jsonc.configs['flat/recommended-with-jsonc'].rules
    }
  },

  // Global browser and service worker environments (ensure this is present)
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
        process: 'readonly' // Add process as a global
      }
    }
  },

  // General project rules - applied to all JS/TS(X) files
  {
    rules: {
      'no-var': 'error',
      'max-depth': 2,
      'no-case-declarations': 'off',
      'no-unreachable-loop': 'error',
      'no-unneeded-ternary': 'error',
      'no-unused-vars': 'off' // Handled by unused-imports and @typescript-eslint
    }
  }
]
