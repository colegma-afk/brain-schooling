# 🧠 Brain Schooling

Aula virtual para **secundaria y pre-laboral**. Webapp autocontenida en HTML + CSS + JavaScript puro, sin dependencias ni build. Los datos se guardan en el navegador (`localStorage`).

## Características

- **3 roles** con paneles propios:
  - **Estudiante**: cursos, lecciones, entrega de tareas, evaluaciones autocorregibles, notas, calendario, mensajería y módulo Pre-Laboral (CV descargable en PDF, habilidades, objetivos).
  - **Docente**: gestión de cursos y lecciones, corrección de entregas con nota y devolución, libro de calificaciones y toma de asistencia.
  - **Administración**: gestión de usuarios, reportes institucionales y ranking.
- 8 cursos precargados (secundaria + pre-laboral) con lecciones, quizzes y tareas.
- Modo claro/oscuro y diseño responsive.

## Accesos de demostración (contraseña `1234`)

| Rol | Email |
|-----|-------|
| Administración | `admin@brain.edu` |
| Docente | `laura@brain.edu` · `diego@brain.edu` |
| Estudiante | `martin@brain.edu` · `sofia@brain.edu` · `bruno@brain.edu` |

## Uso local

Es un sitio estático. Basta con abrir `index.html`, o servirlo:

```bash
python3 -m http.server 8080
```

y entrar a `http://localhost:8080`.

## Deploy

Se publica automáticamente en GitHub Pages al hacer push a `main` (ver `.github/workflows/deploy.yml`).
