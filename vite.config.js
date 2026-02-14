import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Para GitHub Pages: la URL será https://usuario.github.io/NOMBRE-REPO/
// Si no usas GitHub Pages, deja BASE_PATH vacío o no lo definas
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  plugins: [react()],
  base,
});
