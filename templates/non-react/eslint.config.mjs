import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        // Custom rules go here
        rules: {
            // '@typescript-eslint/no-unused-vars': [
            //     'warn',
            //     { vars: 'all', args: 'after-used', ignoreRestSiblings: true }
            // ]
        },
        files: ["**/*.ts"]
    }
);
