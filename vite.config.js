import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  // Define a pasta raiz do projeto como 'src'
  root: resolve(__dirname, 'src'),
  // Mantém a pasta 'public' fora de 'src' como diretório de estáticos
  publicDir: resolve(__dirname, 'public'),
  server: {
    host: true,
    port: 3000,
    open: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
      'Cross-Origin-Opener-Policy': 'unsafe-none'
    }
  },
  build: {
    // Gera o build em 'dist' na raiz do projeto
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue']
        }
      }
    }
  },
  define: {
    __VUE_PROD_DEVTOOLS__: false
  }
}))