module.exports = {
  'env': {
    'browser': true,
    'commonjs': false,
    'es6': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 6
  },
  'rules': {
    'comma-spacing': [
      'error',
      {
        'before': false,
        'after': true
      }
    ],
    'implicit-arrow-linebreak': [
      'error',
      'beside'
    ],
    'eqeqeq': [
      'error',
      'smart'
    ],
    'func-style': [
      'warn',
      'expression'
    ],
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        'max': 2,
        'maxEOF': 1
      }
    ],
    'no-var': [
      'error'
    ],
    'prefer-arrow-callback': [
      'warn'
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