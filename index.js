#!/usr/bin/env node

const readline = require("readline");
const { doesPackageJsonExist, installPackages, copyFiles } = require("./utils");

// Check if package.json exists
if (!doesPackageJsonExist()) process.exit(1);

// Get the command-line arguments
const args = process.argv.slice(2); // Skip the first two elements (node and script path)
// Check if the `--react` flag is passed
const isReactEnabled = args.includes("--react");

const dependencies = [
  "@tsconfig/recommended",
  "eslint",
  "@eslint/js",
  "@types/eslint__js",
  "prettier",
  "typescript",
  "typescript-eslint",
];
const reactDependencies = ["@types/react", "eslint-plugin-react"];

const combinedDependencies = [
  ...dependencies,
  ...(isReactEnabled ? reactDependencies : []),
];

const filesToCopy = ["tsconfig.json", "eslint.config.mjs", ".prettierrc"];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt the user for confirmation
rl.question(
  `Do you want to install ${combinedDependencies.join(
    ", "
  )} as devDependencies? (y/n) `,
  (answer) => {
    if (answer.toLowerCase() === "y") {
      installPackages(combinedDependencies);
    } else {
      console.log("Skipping package installation.");
    }
    copyFiles(filesToCopy, isReactEnabled);
    rl.close();
  }
);
