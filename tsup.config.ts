import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.js"],
    outDir: "lib",
    format: ["cjs"], // Only ESM
    target: "node20",
    platform: "node",
    clean: true,
    sourcemap: true,
  },
]);
