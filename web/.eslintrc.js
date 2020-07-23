module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'prettier/react', // Rules for React
    // 'plugin:react-hooks/recommended', // Rules for React Hooks
  ],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018, // Using ESLint 6.8.0
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  rules: {
    'prettier/prettier': 'error',
    semi: ['error', 'always'], // Enforce semicolons
    camelcase: 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'react/jsx-one-expression-per-line': 'off',
    'global-require': 'off',
    'react-native/no-raw-text': 'off',
    'no-underscore-dangle': 'off',
    // 'react-hooks/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': 'warn',
    // 'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'import/prefer-default-export': 'off',
    'no-console': ['warn', { allow: ['tron'] }],
  },
};
