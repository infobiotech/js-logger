/*
 *
 */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    requireConfigFile: false,
  },
  parser: '@babel/eslint-parser',
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'eslint:recommended',
    "plugin:prettier/recommended",
  ],
  plugins: [
    'prettier',
  ],
  rules: {
    'prettier/prettier': 0,
    'no-console': 0,
    'import/prefer-default-export': 0,
    'no-unreachable': 1,
    'no-unused-vars': 1,
    'no-extra-parens': [1, 'all'],
    'no-confusing-arrow': 0,
    'no-nested-ternary': 0,
    'max-len': [1, { code: 180 }],
    'no-underscore-dangle': 0,
    'no-restricted-syntax': 0,
    'no-multiple-empty-lines': [
      1,
      {
        max: 0,
        maxBOF: 0,
        maxEOF: 0,
      },
    ],
    'lines-between-class-members': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    curly: 1,
    'newline-per-chained-call': [
      1,
      {
        ignoreChainWithDepth: 1,
      },
    ],
    'prefer-promise-reject-errors': [0, { allowEmptyReject: true }],
    'comma-dangle': [
      1,
      {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'only-multiline', // 'never',
      },
    ],
  },
  ignorePatterns: ['build','coverage','private'],
};
