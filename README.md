# icsdesigns

Portfolio de aplicaciones de icsdesigns, publicado con GitHub Pages en
https://icsdesigns.github.io/icsdesigns/

Sitio estático (HTML, CSS y JavaScript, sin paso de compilación).

## Añadir un proyecto

Edita `js/projects.js` y copia uno de los bloques. La tarjeta, el menú y la
infografía (cifras, funciones, flujo y tecnología) se generan a partir de ese
bloque. Los iconos disponibles están en `ICONS`, dentro de `js/main.js`.

## Ver en local

```bash
python3 -m http.server 8000
```

y abre http://localhost:8000.

## Publicación

Cada push a `main` ejecuta `.github/workflows/pages.yml` y publica el sitio.
Primera vez: en el repositorio, **Settings → Pages → Build and deployment →
Source: GitHub Actions**.
