import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { buildVersion } from "./scripts/site-version.mjs";

export default defineConfig({
  define: { __SITE_VERSION__: buildVersion() },
  base: './',
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
});
