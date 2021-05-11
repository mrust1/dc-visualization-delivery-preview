module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: ['svelte3'],
  ignorePatterns: ['node_modules/', 'public', 'build'],
  extends: ['eslint:recommended', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  rules: {
    quotes: ['error', 'single'],
    'no-empty': [2, { allowEmptyCatch: true }],
  },
};