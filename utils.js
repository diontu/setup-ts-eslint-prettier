const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const packageJson = JSON.parse(fs.readFileSync("./package.json"));

/**
 * Function to check if package.json exists
 *
 * @returns {boolean} whether package.json exists
 */
const doesPackageJsonExist = () => {
  // Get the current working directory
  const currentDirectory = process.cwd();
  // Build the path to the package.json file
  const packageJsonPath = path.join(currentDirectory, "package.json");

  // Check if package.json exists
  if (fs.existsSync(packageJsonPath)) {
    console.log("package.json found.");
    return true;
    // Proceed with the rest of your script
  } else {
    console.log("No package.json found in the current directory.");
    return false;
  }
};

/**
 * Function to run npm install on an array of dependencies.
 *
 * @param {string[]} dependencies
 */
const installPackages = (dependencies) => {
  try {
    console.log("Installing necessary packages...");
    execSync(`npm install -D ${dependencies.join(" ")}`, { stdio: "inherit" });
    console.log("Packages installed successfully.");
  } catch (error) {
    console.error("Error during package installation:", error);
  }
};

/**
 * Function to copy files to the user's current directory
 *
 * @param {string[]} filesToCopy - array of files to copy
 * @param {boolean} isReactEnabled - whether react is enabled
 */
const copyFiles = (filesToCopy, isReactEnabled) => {
  // Get the current working directory
  const currentDirectory = process.cwd();
  // Get the current working directory where the npx command is run
  console.log(`Current directory: ${currentDirectory}`);

  filesToCopy.forEach((file) => {
    // Source file path (assuming the files are in the "templates" folder of your npx package)
    const sourceFile = path.join(
      __dirname,
      "templates",
      isReactEnabled ? "/react" : "/non-react",
      file
    );

    // Destination file path (copying to the user's current directory)
    const destinationFile = path.join(currentDirectory, file);

    // Copy config files
    fs.copyFile(sourceFile, destinationFile, (err) => {
      if (err) {
        console.error(`Error while copying the ${file}:`, err);
      } else {
        console.log(`${file} copied successfully to ${destinationFile}`);
      }
    });
  });

  // Copy .eslintignore and .prettierignore files
  const ignoreFiles = [".eslintignore", ".prettierignore"];
  ignoreFiles.forEach((file) => {
    const sourceFile = path.join(__dirname, "templates", file);
    const destinationFile = path.join(currentDirectory, file);
    fs.copyFile(sourceFile, destinationFile, (err) => {
      if (err) {
        console.error(`Error while copying the ${file}:`, err);
      } else {
        console.log(`${file} copied successfully to ${destinationFile}`);
      }
    });
  });
};

/**
 * Function to check if the package is installed inside the package.json
 *
 * @param {string} packageName
 * @returns {boolean} whether the package is installed
 */
const isPackageInstalled = (packageName) => {
  return (
    (packageJson.devDependencies && packageJson.devDependencies[packageName]) ||
    (packageJson.dependencies && packageJson.dependencies[packageName])
  );
};

module.exports = {
  doesPackageJsonExist,
  installPackages,
  copyFiles,
  isPackageInstalled,
};
