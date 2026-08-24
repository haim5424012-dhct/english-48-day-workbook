/* Prepare the Vite artifact for GitHub Pages project hosting. */
import { copyFile, writeFile } from "node:fs/promises";
import path from "node:path";

const publicDir = path.resolve("dist/public");
await copyFile(path.join(publicDir, "index.html"), path.join(publicDir, "404.html"));
await writeFile(path.join(publicDir, ".nojekyll"), "", "utf8");
console.log("GitHub Pages artifact prepared: 404.html and .nojekyll");
