import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Para GitHub Pages: la URL será https://usuario.github.io/NOMBRE-REPO/
// El workflow de deploy define BASE_PATH=/Food_Flow_MVP_Gantt/
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  plugins: [react()],
  base,
});
