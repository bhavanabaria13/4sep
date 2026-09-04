import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      
      strictPort: true,
      allowedHosts: true,
	  host: "localhost",
  port: 3000,
  https: false,
      hmr: {
        clientPort: 443,
        protocol: "wss",
      },
    },
    preview: {
      host: "localhost",
      port: 3000,
	  
  https: false,
    },
    define: {
      "process.env.REACT_APP_BACKEND_URL": JSON.stringify(env.REACT_APP_BACKEND_URL || env.VITE_BACKEND_URL || ""),
    },
  };
});
