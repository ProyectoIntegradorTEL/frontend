import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/ws-connect": {
        target: "ws://localhost:8081", // Cambiar a WebSocket puro
        ws: true, // Habilitar WebSocket
        changeOrigin: true,
      },
    },
  },
  define: {
    global: {},
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
