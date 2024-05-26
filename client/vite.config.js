import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			"/api/node": {
				// Proxying API requests to Node.js backend
				target: "http://localhost:3001",
				changeOrigin: true,
				secure: false,
			},
			"/api/fastapi": {
				// Proxying API requests to FastAPI backend
				target: "http://localhost:8000",
				changeOrigin: true,
				secure: false,
			},
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./vitest.setup.js",
	},
	plugins: [react()],
});
