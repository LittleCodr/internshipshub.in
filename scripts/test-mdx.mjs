import { readFile } from "node:fs/promises";
import { compile } from "@mdx-js/mdx";

const file = process.argv[2];
if (!file) {
  console.error("Pass a file path");
  process.exit(1);
}

const source = await readFile(file, "utf8");
try {
  await compile(source, { jsx: true, providerImportSource: "@mdx-js/react" });
  console.log("ok");
} catch (error) {
  console.error(error);
  process.exit(1);
}
