import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const recommendedTsRules = new Set(Object.keys(tsEslintPlugin.configs.recommended.rules || {}));
const noopRule = {
  meta: { type: 'problem', docs: {}, schema: [] },
  create: () => ({}),
};

function normalizeConfig(config) {
  const next = { ...config };

  if (next.plugins?.['@typescript-eslint']) {
    next.plugins = {
      ...next.plugins,
      '@typescript-eslint': {
        ...next.plugins['@typescript-eslint'],
        rules: {
          ...next.plugins['@typescript-eslint'].rules,
          'ban-types': noopRule,
        },
      },
    };
  }

  if (next.rules) {
    next.rules = Object.fromEntries(
      Object.entries(next.rules).filter(([ruleName]) => {
        if (!ruleName.startsWith('@typescript-eslint/')) {
          return true;
        }
        return recommendedTsRules.has(ruleName) || ruleName === '@typescript-eslint/ban-types';
      }),
    );
  }

  return next;
}

export default [
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
      '.eslintrc.js',
      'src/index.d.ts',
    ],
  },
  ...compat.config(require('./.eslintrc.js')).map(normalizeConfig),
  {
    rules: {
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
