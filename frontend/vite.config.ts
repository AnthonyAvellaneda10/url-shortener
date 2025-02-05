import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/shorten": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false, // Desactiva verificación SSL en caso de ser necesario
      },
    },
  },
});
