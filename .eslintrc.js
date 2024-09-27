'use strict';

module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  plugins: ['@typescript-eslint', 'eslint-comments', 'jest', 'prettier'],
  ignorePatterns: [
    '.circleci',
    '.esbuild',
    '.eslintrc.js',
    '.husky',
    '.serverless',
    '.vscode',
    '**/build/',
    '**/coverage/',
    '**/dist/',
    'babel.config.cjs',
    'cicd_scripts',
    'cypress.config.ts',
    'jest.config.js',
    'node_modules',
    'prettier.config.js',
    'vite.config.mts',
    'webpack.config.tss',
  ],
  rules: {
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'import/order': ['error', { 'newlines-between': 'always' }],
    // Use function hoisting to improve code readability
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
    // Allow most functions to rely on type inference. If the function is exported, then `@typescript-eslint/explicit-module-boundary-types` will ensure it's typed.
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn', // TODO: remove
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    // It's not accurate in the monorepo style
    // 'import/no-extraneous-dependencies': 'off',
    'no-console': 'off',
    'no-continue': 'off',
    'no-restricted-syntax': ['error', 'ForInStatement', 'WithStatement'],
    'no-await-in-loop': 'off',
    'padding-line-between-statements': ['warn', { blankLine: 'always', prev: '*', next: 'return' }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'snake_case', 'PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.js'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
