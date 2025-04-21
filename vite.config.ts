import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  build: {
    outDir: `dist`,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'mapbox-gl': ['mapbox-gl'],
          'app': [
            './src/App.tsx',
            './src/components/MapComponent.tsx',
            './src/components/Preloader.tsx',
            './src/components/SeaPath.tsx',
            './src/components/Modal.tsx',
            './src/components/PlayAreaButton.tsx',
            './src/components/Logo.tsx',
            './src/components/BeachMarker.tsx',
            './src/components/LandmarkMarker.tsx',
            './src/components/WarningMarker.tsx',
            './src/components/HQMarker.tsx',
            './src/components/AnchorageMarker.tsx',
            './src/components/NavigationMenu.tsx',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  envDir: '.',
  envPrefix: 'VITE_',
  base: '/',
});
