# Instrucciones: actualizar cronograma desde un JSON

Cuando me adjuntes o indiques un archivo **.json** de cronograma (con `activities` y `deps`), debo hacer lo siguiente:

## 1. Leer el JSON
- Abrir el archivo JSON que me compartiste y revisar su contenido (`activities` y `deps`).

## 2. Revisar el Gantt chart
- Abrir el archivo **`gantt-chart.jsx`** del proyecto.
- Localizar los datos actuales: el array **`initialActivities`** y el array **`initialDeps`** (cerca del inicio del archivo).

## 3. Comparar
- Comparar las actividades del JSON con las de `initialActivities` (ids, nombres, `cat`, `start`, `dur`).
- Comparar las dependencias del JSON con las de `initialDeps` (`from`, `to`, `type`).
- Identificar qué cambió: actividades nuevas, eliminadas, renombradas o con fechas/duración distintas, y dependencias distintas.

## 4. Preguntar antes de cambiar
- **No** modificar el código sin confirmación.
- Resumir los cambios que encontré (por ejemplo: “La actividad 14 de brand pasa de ‘Selección agencia branding’ a ‘Kick-off BOOST’”, “Hay 2 actividades nuevas en tech”, etc.).
- Preguntar explícitamente:  
  **“¿Quieres que actualice `gantt-chart.jsx` y deje estos datos hardcodeados en `initialActivities` e `initialDeps`?”**

## 5. Si confirmas que sí
- Sustituir **`initialActivities`** por el array de actividades del JSON.
- Sustituir **`initialDeps`** por el array de dependencias del JSON.
- No cambiar `main.jsx` ni la lógica del componente; solo los datos iniciales dentro de `gantt-chart.jsx`.

---

**Resumen:** Adjuntas JSON → yo comparo con `gantt-chart.jsx` → te digo qué cambió → te pregunto si quieres que lo deje hardcodeado → si dices que sí, actualizo solo `initialActivities` e `initialDeps` en `gantt-chart.jsx`.
