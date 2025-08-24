console.log("Creating your app...");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");


const projectName = process.argv[2] || "fw-app";
const projectPath = path.join(process.cwd(), projectName);


if (fs.existsSync(projectPath)) {
  console.error(
    `Folder "${projectName}" already exists. Please choose another name.`
  );
  process.exit(1);
}
fs.mkdirSync(projectPath);

const templatePath = path.join(__dirname, "src");

if (fs.existsSync(templatePath)) {
  if (fs.cpSync) {
    fs.cpSync(templatePath, projectPath, { recursive: true });
  } else {
    execSync(`cp -r "${templatePath}" "${projectPath}"`);
  }
  console.log(`Done! cd ${projectName} && npm install`);
} else {
  console.error("Template folder not found.");
  process.exit(1);
}
