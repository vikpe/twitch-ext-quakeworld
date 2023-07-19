import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        videoOverlay: "video_overlay.html",
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@qwhub": resolve(__dirname, "./src/hub/src"),
    },
  },
});
