import type { UserConfig } from '@commitlint/types'

const configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Header
    'type-empty': [2, 'never'],
    // Allowed type enums
    // 'type-enum': [2,'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert']],
    'scope-empty': [2, 'never'],
    'scope-enum': [
      0,
      'always',
      [
        'env',
        'redux',
        'packages',
        'breaking-change',
        'error',
        'commit-lint',
        'config'
      ]
    ], // define allowed scopes as per your project
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'always', 'sentence-case'], // sentence case summary
    'header-full-stop': [2, 'never', '.'], // no full stop at the end of header

    // Body
    'body-empty': [2, 'never'],
    'body-leading-blank': [2, 'always'],

    // Footer
    'footer-empty': [2, 'never'],
    'footer-leading-blank': [2, 'always'],
    // Trailer token must exist
    'trailer-exists': [2, 'always', 'References']
    // 'references-empty': [2, 'never'], // references values (Fixes, Closes, Resolves)
  },
  parserPreset: {
    parserOpts: {
      noteKeywords: ['References'] // parser preset to help Commitlint recognize custom trailers
    }
  }
}

export default configuration
