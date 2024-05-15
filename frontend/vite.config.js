import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // proxy: {
    //   "/api/users": {
    //     target: "http://localhost:5000",
    //     changeOrigin: true,
    //     rewrite: (path) => {
    //       console.log("Rewriting path:", path);
    //       return path.replace(/^\/api/, "");
    //     },
    //   },
    // },
  },
});
