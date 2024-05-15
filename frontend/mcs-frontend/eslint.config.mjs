import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2021, ...globals.jest, ...globals.node }
    },
    rules: {
      'react/react-in-jsx-scope': 'off'
    }
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
  ...compat.extends('plugin:prettier/recommended')
];
