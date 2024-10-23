import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: typescriptParser, // Specify the TypeScript parser
      parserOptions: {
        ecmaVersion: 2020, // Use ECMAScript 2020 features
        sourceType: 'module', // Allow using ES module imports
      },
    },
    rules: {
      'no-undef': 'error',
      'no-duplicate-imports': 'error',
      'no-unused-vars': 'warn',
      'no-console': ['warn', { allow: ['error'] }],
    },
  },
  {
    ignores: ['dist/**'],
  },
  {
    plugins: {
      '@typescript-eslint': typescriptPlugin, // Add TypeScript plugin as an object
      prettier: pluginPrettier, // Add Prettier plugin as an object
    },
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  prettierConfig,
];
