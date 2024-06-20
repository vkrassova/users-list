import { defineConfig } from "vite";

export default defineConfig({
    base: process.env.NODE_ENV === 'production'
        ? './'
        : '/',
    server: {
        port: 3000,
        host: "0.0.0.0",
        hmr: true,
    }
})
