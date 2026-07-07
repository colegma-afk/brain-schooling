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

## Sincronización en la nube (opcional)

Por defecto los datos viven en el navegador (`localStorage`). Para **compartirlos entre usuarios y dispositivos** se puede conectar un proyecto gratuito de [Supabase](https://supabase.com):

1. Creá un proyecto en Supabase.
2. En **SQL Editor** ejecutá:
   ```sql
   create table if not exists brain_state (
     id text primary key,
     data jsonb,
     updated_at timestamptz default now()
   );
   alter table brain_state enable row level security;
   create policy "brain_rw" on brain_state for all using (true) with check (true);
   ```
3. Activá **Realtime** para la tabla `brain_state`.
4. Pegá la **URL** y la clave **anon public** en `config.js` (aplica a todos) o desde la app en el botón **☁️/💾 → Sincronización** (solo este navegador).

La app guarda todo el estado como un documento JSON (`brain_state`, fila `id='main'`) con última-escritura-gana y se actualiza en tiempo real. La política RLS de ejemplo es de nivel demo; para producción conviene restringirla con Supabase Auth.

## Deploy

Se publica automáticamente en GitHub Pages al hacer push a `main` (ver `.github/workflows/deploy.yml`).
