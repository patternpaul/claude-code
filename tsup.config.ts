import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    outDir: "lib",
    format: ["cjs"], // Only ESM
    target: "node20",
    platform: "node",
    clean: true,
    sourcemap: true,
  },
]);
