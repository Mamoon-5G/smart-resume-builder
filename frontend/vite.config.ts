import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path"; // Fixed path import

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "localhost", // Changed from "::" for better compatibility
    port: 5173, // Match port with package.json dev script
    strictPort: true,
  },
  plugins: [
    react(),
    // Removed lovable-tagger (no longer in package.json)
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});