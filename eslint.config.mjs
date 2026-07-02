import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
  },
  {
    ignores: [
      'node_modules/',
      'coverage/',
      'es/',
      'lib/',
      'dist/',
      'docs-dist/',
      '.dumi/',
      '.doc/',
      '.vercel/',
      'src/index.d.ts',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      prettier,
    ],
    plugins: {
      'react-hooks': reactHooks,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-async-promise-executor': 'off',
      'no-empty-pattern': 'off',
      'no-irregular-whitespace': 'off',
      'no-prototype-builtins': 'off',
      'no-useless-escape': 'off',
      'no-extra-boolean-cast': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'react/no-find-dom-node': 'off',
      'react/display-name': 'off',
      'react/no-unknown-property': 'off',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [...tseslint.configs.recommended],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unnecessary-type-constraint': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['tests/**/*.{js,jsx,ts,tsx}', '**/*.{test,spec}.{js,jsx,ts,tsx}'],
    extends: [jest.configs['flat/recommended']],
    rules: {
      'jest/no-disabled-tests': 'off',
      'jest/no-done-callback': 'off',
      'jest/no-identical-title': 'off',
      'jest/expect-expect': 'off',
      'jest/no-alias-methods': 'off',
      'jest/no-conditional-expect': 'off',
      'jest/no-export': 'off',
      'jest/no-standalone-expect': 'off',
      'jest/valid-expect': 'off',
      'jest/valid-title': 'off',
    },
  },
]);
