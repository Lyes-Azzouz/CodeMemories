import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    rollupOptions: {
      external: ["react-router-dom", "react-dom", "firebase/app"], // Ajoutez firebase/app ici
    },
  },
  optimizeDeps: {
    include: ["react-router-dom"],
    exclude: ["firebase/app"],
    css: {
      modules: {},
      postcss: {},
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/variables.scss";`,
        },
      },
    },
  },
});
