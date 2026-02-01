import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

function run(command, args) {
  const commandLine = [command, ...args].join(" ");
  return new Promise((resolve, reject) => {
    const child = spawn(commandLine, { stdio: "inherit", cwd: projectRoot, shell: true });
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`${commandLine} exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

async function build() {
  await run("node", ["scripts/build-content.mjs"]);
  await run("vite", ["build"]);
  await run("node", ["scripts/prerender.mjs"]);
  await run("node", ["scripts/generate-sitemap.mjs"]);
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
