#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const userAgent = process.env.npm_config_user_agent || "";
const projectRoot = path.resolve(__dirname, "..");

// Helper: delete file if it exists
function safeDelete(file) {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath, { force: true });
    console.log(`🧹 Removed ${file}`);
  }
}

if (!userAgent.includes("yarn")) {
  console.error("\n❌ Please use Yarn to install dependencies (not npm or pnpm).\n");

  // Clean up unwanted lockfiles
  safeDelete("package-lock.json");
  safeDelete("pnpm-lock.yaml");

  process.exit(1);
}

console.log("✅ Using Yarn for installation.");
