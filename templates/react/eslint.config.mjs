import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import globals from 'globals';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            react
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                ...globals.browser
            }
        },
        rules: {
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'error',
            'react/jsx-props-no-spreading': 'off',
            'react/jsx-fragments': 'warn',
            'react/hook-use-state': 'error'
        },
        files: ['**/*.ts', '**/*.tsx']
    }
);
