module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'jest'
  ],
  // add your custom rules here
  rules: {
    'import/prefer-default-export': ['off'],
    'no-console': [
      'error',
      {
        allow: ['info', 'warn', 'error']
      }
    ],
    'no-underscore-dangle': ['off'],
    'class-methods-use-this': ['off'],
    'no-param-reassign': ['off'],
    'no-restricted-syntax': ['off'],
    'no-prototype-builtins': ['off'],
    'guard-for-in': ['off']
  }
}
