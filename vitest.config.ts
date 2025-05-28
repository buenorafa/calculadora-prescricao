import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["text", "html"], // text → terminal | html → visual no navegador
      exclude: [
        'vite.config.ts',
        'vitest.config.ts',
        'eslint.config.js',
        'vite-env.d.ts',
        'src/main.tsx',
        'src/App.tsx',
        '**/index.tsx',
        '**/*.d.ts',
      ],
    },
  },
});
