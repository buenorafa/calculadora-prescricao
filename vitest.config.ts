import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default defineConfig({
  ...viteConfig,
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      reporter: ["text", "html"], // text → terminal | html → visual no navegador
      exclude: [
        "vite.config.ts",
        "vitest.config.ts",
        "eslint.config.js",
        "vite-env.d.ts",
        "src/main.tsx",
        "src/App.tsx",
        "**/index.tsx",
        "**/*.d.ts",
      ],
    },
  },
});
