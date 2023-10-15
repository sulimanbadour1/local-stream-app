import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Your local IP address
    // host: "192.168.1.100", // Your local IP address
    // localhost: "10.21.211.106", // server IP address
  },
});
