import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react-vendors'; // Separate chunk for React-related modules
            }
            if (id.includes('lodash')) {
              return 'lodash'; // Separate chunk for lodash if used
            }
            return 'vendor'; // Everything else from node_modules
          }
        },
      },
    },
    chunkSizeWarningLimit: 5000, // optional: raise the warning limit (default is 500 kB)
  },
})
