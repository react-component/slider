module.exports = {
  extends: ['react-app', 'prettier', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
  parserOptions: {
    project: "./tsconfig.eslint.json"
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
