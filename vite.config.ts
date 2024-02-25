import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: process.env.BLACKDOG_CONFIGURATOR_FRONTEND_VITE_HOST || "0.0.0.0",
		port: process.env.BLACKDOG_CONFIGURATOR_FRONTEND_VITE_PORT
			? Number(process.env.BLACKDOG_CONFIGURATOR_FRONTEND_VITE_PORT)
			: 5137,
	},
});
