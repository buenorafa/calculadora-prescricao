import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // tudo que começa com /api vai para o backend
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        // importantíssimo p/ Set-Cookie vindo do 8080 funcionar no 5173
        cookieDomainRewrite: "localhost",
        cookiePathRewrite: "/",
      },
      "/usuarios": {
        target: "http://localhost:8080",
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
        cookiePathRewrite: "/",
      },
      "/prescricao": {
        target: "http://localhost:8080",
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
        cookiePathRewrite: "/",
      },
      "/public": {
        target: "http://localhost:8080",
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
        cookiePathRewrite: "/",
      },
    },
  },
});
