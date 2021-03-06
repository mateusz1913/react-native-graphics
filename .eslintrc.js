module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: [ 'node_modules/', 'lib/' ],
  plugins: [ 'react', 'react-hooks', 'react-native', '@typescript-eslint', 'import' ],
  rules: {
    '@typescript-eslint/consistent-type-imports': [ 'error', { prefer: 'type-imports' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': [ 'error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-var-requires': 'off',
    'array-bracket-spacing': [ 'error', 'always', { objectsInArrays: false, arraysInArrays: false }],
    'arrow-parens': [ 'error', 'always' ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'import/order': [
      'error',
      {
        groups: [ 'builtin', 'external', 'internal', 'parent', 'sibling', 'index' ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        tabWidth: 2,
      },
    ],
    'no-extra-parens': [ 'error', 'all' ],
    'no-underscore-dangle': 'error',
    'no-unused-vars': 'off',
    'object-curly-spacing': [ 'error', 'always', { arraysInObjects: false, objectsInObjects: false }],
    'quote-props': [ 'error', 'as-needed' ],
    quotes: [ 'error', 'single' ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'const', next: '*' },
      { blankLine: 'any', prev: 'const', next: 'const' },
      { blankLine: 'always', prev: 'function', next: '*' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
    ],
    'react-hooks/exhaustive-deps': 'warn',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react-native/no-inline-styles': 'warn',
    semi: [ 'error', 'always' ],
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: [ 'none', 'all', 'multiple', 'single' ],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};