import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import tsEslint from '@typescript-eslint/eslint-plugin'; // Use @typescript-eslint/eslint-plugin
import tsParser from '@typescript-eslint/parser'; // Use @typescript-eslint/parser
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';

// Mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser, // Specifies the ESLint parser for TypeScript
      parserOptions: {
        ecmaVersion: 2020, // Adjust according to your requirements
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // React 17+ rule, no need to import React in scope
      'react/prop-types': 'off', // Disable prop-types rule (if using TypeScript)
      'react/jsx-uses-react': 'off', // Not needed with React 17+
      'react/jsx-uses-vars': 'error', // Ensure JSX variables are used
      'react-hooks/rules-of-hooks': 'error', // Rules of hooks
      'react-hooks/exhaustive-deps': 'warn', // Dependencies of hooks
      'react/no-unknown-property': [
        'error',
        {
          ignore: [
            'geometry',
            'position',
            'rotation',
            'scale',
            'args',
            'side',
            'dispose',
            'material',
            'visible',
          ], // Add other Three.js properties if needed
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          // Sort order: Node built-in modules, external packages, internal imports, relative imports, index files
          groups: [
            ['^react$', '^@?\\w'], // External packages, with `react` first
            [
              '^@components',
              '^@constants',
              '^@contexts',
              '^@hooks',
              '^@interfaces',
              '^@utils',
            ], // Internal imports
            ['^\\.'], // Relative imports
            ['^index'], // Index files
          ],
        },
      ],
      quotes: ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-double'],
      'simple-import-sort/exports': 'error',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true, // Single quotes for JavaScript
          jsxSingleQuote: false, // Double quotes for JSX attributes
        },
      ],
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'warn', // Optional rule to enforce type annotations
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      prettier: pluginPrettier,
      'simple-import-sort': simpleImportSort,
      '@typescript-eslint': tsEslint, // Register TypeScript plugin
    },
  },

  // Use FlatCompat to include recommended configs
  ...compat.extends('plugin:@typescript-eslint/recommended'), // TypeScript
  ...compat.extends('plugin:react/recommended'), // React
  ...compat.extends('plugin:react-hooks/recommended'), // React Hooks
  ...compat.extends('plugin:react/jsx-runtime'), // React JSX Runtime
  ...compat.extends('plugin:prettier/recommended'), // Prettier
  pluginJs.configs.recommended, // JavaScript
  ...compat.extends(),
];
