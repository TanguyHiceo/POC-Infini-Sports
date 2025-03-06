import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0', // écoute sur toutes les interfaces
    port: 5173,      // port par défaut
  },
})
