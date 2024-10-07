import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";

const INCLUDE_FILES = ["**/*.{ts,tsx}"];
const IGNORE_FILES = [
    "**/*.d.ts",
    "node_modules/**/*",
    "dist/**/*",
    "build/**/*"
];

export default tseslint.config(
    {
        // TS and ES Lint specific
        files: INCLUDE_FILES,
        ignores: IGNORE_FILES,
        extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
        // Custom rules go here
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { vars: "all", args: "after-used", ignoreRestSiblings: true }
            ]
        }
    },
    {
        // React specific
        extends: [
            reactPlugin.configs.flat.recommended,
            reactPlugin.configs.flat["jsx-runtime"]
        ],
        languageOptions: {
            ...reactPlugin.configs.flat.recommended.languageOptions,
            globals: {
                ...globals.serviceworker,
                ...globals.browser
            }
        },
        rules: {
            // ... any rules you want
            "react/hook-use-state": ["error", { allowDestructuredState: true }]
        }
    }
);
