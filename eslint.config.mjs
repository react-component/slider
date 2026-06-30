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

const recommendedTsRulesConfig = tsEslintPlugin.configs.recommended;
const recommendedTsRulesObject = Array.isArray(recommendedTsRulesConfig)
  ? recommendedTsRulesConfig.reduce(
      (rules, config) => ({ ...rules, ...(config.rules || {}) }),
      {},
    )
  : recommendedTsRulesConfig?.rules || {};
const recommendedTsRules = new Set(Object.keys(recommendedTsRulesObject));

function normalizeConfig(config) {
  const next = { ...config };

  if (next.plugins?.['@typescript-eslint']) {
    next.plugins = { ...next.plugins };
    delete next.plugins['@typescript-eslint'];
  }

  if (next.rules) {
    next.rules = Object.fromEntries(
      Object.entries(next.rules).filter(([ruleName]) => {
        if (!ruleName.startsWith('@typescript-eslint/')) {
          return true;
        }
        return recommendedTsRules.has(ruleName);
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
  {
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
    },
  },
  ...compat.config(require('./.eslintrc.js')).map(normalizeConfig),
  {
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
