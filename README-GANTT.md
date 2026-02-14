# Gantt Chart – Cómo verlo y publicarlo

## Ver en local (en Cursor o en el navegador)

1. Abre una terminal en esta carpeta (PowerShell).
2. Instala dependencias y arranca el servidor:

   ```powershell
   npm install
   npm run dev
   ```

3. Abre en el navegador la URL que muestre Vite (normalmente **http://localhost:5173**).
4. **Dentro de Cursor**: menú **View → Simple Browser** (o `Ctrl+Shift+P` → "Simple Browser: Show") y pega esa URL.

---

## Publicar en GitHub Pages

Sí, se puede exhibir en GitHub Pages. El proyecto ya está preparado.

### Pasos

1. **Crea un repositorio en GitHub** (por ejemplo `SPRINT-4-ALSEA` o `gantt-alsea`).  
   Evita espacios en el nombre; usa guiones (ej. `SPRINT-4-ALSEA`).

2. **Inicializa Git en esta carpeta** (si aún no lo has hecho):

   ```powershell
   git init
   git add .
   git commit -m "Gantt chart + deploy GitHub Pages"
   ```

3. **Conecta y sube a GitHub**:

   ```powershell
   git remote add origin https://github.com/TU-USUARIO/NOMBRE-DEL-REPO.git
   git branch -M main
   git push -u origin main
   ```

4. **Activa GitHub Pages en el repo**:
   - En GitHub: **Settings → Pages**.
   - En "Build and deployment", **Source** = **GitHub Actions**.

5. **Espera al workflow**: en la pestaña **Actions** se ejecutará "Deploy to GitHub Pages".  
   Cuando termine, la URL será:

   ```
   https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/
   ```

Cada vez que hagas `git push` a `main`, se volverá a desplegar automáticamente.
