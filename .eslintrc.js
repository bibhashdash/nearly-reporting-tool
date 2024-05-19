module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['babel.config.js', 'reset-project.js'],
  plugins: ['@stylistic', '@typescript-eslint', 'unused-imports'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    sourceType: 'module',
  },
  rules: {
    'object-shorthand': ['error'],
    'no-undef': 'off',
    'no-duplicate-imports': ['error'],
    'no-control-regex': ['off'],
    'no-unused-vars': ['off'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'prefer-const': ['warn'],
    '@stylistic/indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
        'ignoredNodes': [
          'JSXElement *',
          'JSXElement'
        ]
      }
    ],
    '@stylistic/jsx-curly-spacing': [
      'error',
      {
        'when': 'always',
        'children': {
          'when': 'always'
        }
      }
    ],
    '@stylistic/jsx-self-closing-comp': ['error', {
      'component': true,
    }],
    '@stylistic/jsx-tag-spacing': [
      'error',
      {
        'beforeSelfClosing': 'always'
      }
    ],
    '@stylistic/key-spacing': ['error'],
    '@stylistic/keyword-spacing': ['error'],
    '@stylistic/no-multi-spaces': ['error'],
    '@stylistic/no-multiple-empty-lines': [
      'error',
      {
        'max': 1
      }
    ],
    '@stylistic/object-curly-spacing': [
      'error',
      'always'
    ],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/space-before-blocks': ['error'],
    '@stylistic/space-infix-ops': ['error'],
    '@stylistic/spaced-comment': ['error'],
    '@stylistic/template-curly-spacing': ['error', 'always'],
    '@typescript-eslint/prefer-optional-chain': 'error',
    'unused-imports/no-unused-imports': ['error']
  }
}