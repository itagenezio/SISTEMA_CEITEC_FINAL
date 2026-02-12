import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// CONFIGURAÇAO ESTÁVEL (Vite + PostCSS)
// Desativamos o plugin nativo do Vite para evitar o erro de conflito de motor do Windows
export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    open: true,
    fs: {
      strict: false // Permitir servir arquivos fora de src
    }
  }
})
