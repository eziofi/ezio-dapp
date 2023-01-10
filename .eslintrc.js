module.exports = {
  env: {
    // node: true,
    // jest: true,
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/prop-types': 'off',
    'react/display-name': 'off',
  },
  settings: {
    //自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  ignorePatterns: ['build', 'node_modules'],
  globals: {
    React: true,
    JSX: true,
  },
};
