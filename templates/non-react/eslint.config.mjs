import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

const INCLUDE_FILES = ["**/*.ts"];
const IGNORE_FILES = [
    "**/*.d.ts",
    "node_modules/**/*",
    "dist/**/*",
    "build/**/*"
];

export default tseslint.config({
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
});
