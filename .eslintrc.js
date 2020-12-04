module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  plugins: ['prettier', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'nextjs',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 1,
    'react/jsx-curly-newline': 0,
    // TODO: Remove these after fixing
    'jsx-a11y/no-static-element-interactions': 1,
    'jsx-a11y/click-events-have-key-events': 1,
    'jsx-a11y/alt-text': 1,
    'no-restricted-syntax': 0,
    'no-use-before-define': ['error', { functions: false, classes: false }],
  },
};
