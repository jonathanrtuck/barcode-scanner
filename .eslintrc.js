module.exports = {
  env: {
    amd: true,
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
    react: {
      version: '16.0',
    },
  },
};
