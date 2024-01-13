/* eslint-disable linebreak-style */

module.exports = {
  'env': {
    'node': true,
    'es2021': true,
    'browser': true
  },
  'extends': ['eslint:recommended', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
  'plugins': ['react'],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'module',
        'ecmaFeatures': {
          'jsx': true
        }
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'rules': {
    'react/prop-types': 'off',
    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};