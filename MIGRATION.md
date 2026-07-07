# Plan de migración: de blob JSON a tablas con aislamiento por usuario

Estado actual: todo el estado vive en un único documento JSON (`brain_state`) con RLS
abierta o "solo autenticados". No permite que cada usuario vea **solo lo suyo**.
Objetivo: modelar los datos en **tablas relacionales** con **RLS por fila**, para que:

- **Estudiante** vea solo sus entregas, notas, mensajes, su ficha PIE, sus adecuaciones y los cursos en que está inscrito.
- **Docente** vea sus cursos, los estudiantes de esos cursos y sus entregas/asistencia.
- **Coordinador/a PIE** vea todas las fichas PIE y adecuaciones.
- **Admin** vea todo.

---

## 1. Identidad

- Cada usuario = una fila en `profiles` cuyo `id` (uuid) **es igual a `auth.users.id`** (Supabase Auth).
- Se reemplazan los ids string actuales (`u_est1`, `c_mat`…) por `uuid`/`text` estables.
- Un trigger crea el `profile` automáticamente al registrarse (rol inicial `estudiante`; el admin promueve).

## 2. Esquema propuesto (DDL resumido)

```sql
-- Perfiles (id = auth.uid)
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  name text, email text, role text default 'estudiante'
    check (role in ('estudiante','docente','pie','admin')),
  grade text, color text, created_at timestamptz default now()
);

create table courses (
  id text primary key, name text, area text, teacher_id uuid references profiles,
  color text, icon text, description text
);
create table enrollments (            -- reemplaza users.enrolled[]
  course_id text references courses, student_id uuid references profiles,
  primary key (course_id, student_id)
);
create table lessons  ( id text primary key, course_id text references courses,
  nivel text, title text, mins int, oa text, body text );
create table quizzes  ( id text primary key, course_id text references courses,
  nivel text, title text, questions jsonb );
create table assignments ( id text primary key, course_id text references courses,
  title text, description text, due date, points int );
create table submissions ( id uuid primary key default gen_random_uuid(),
  assignment_id text references assignments, student_id uuid references profiles,
  body text, date date, grade numeric, feedback text );
create table attendance ( id uuid primary key default gen_random_uuid(),
  course_id text references courses, student_id uuid references profiles,
  date date, status text );
create table events ( id text primary key, course_id text references courses,
  title text, date date, type text );
create table messages ( id uuid primary key default gen_random_uuid(),
  from_id uuid references profiles, to_id uuid references profiles,
  subject text, body text, created_at timestamptz default now(), read boolean default false );

-- Inclusión / PIE (datos sensibles)
create table adaptations ( id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles, course_id text, lesson_id text,
  title text, profile text, content text, read_text text,
  created_by uuid references profiles, created_at timestamptz default now() );
create table pie_profiles ( student_id uuid primary key references profiles,
  tipo text, perfil text, diagnostico text, profesional text,
  fecha date, revision date, notas text );
create table pie_apoyos ( id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles, text text, date date, created_by uuid references profiles );
create table pie_evaldif ( id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles, course_id text, name text, adec text, grade numeric, date date );
create table prelabor ( student_id uuid primary key references profiles,
  cv jsonb, skills jsonb, goals jsonb );

-- temarios: se mantienen como contenido estático en temarios.js (referencia, no editable).
```

## 3. RLS — funciones auxiliares y políticas

```sql
create or replace function public.my_role() returns text
  language sql stable security definer set search_path=public as
$$ select role from profiles where id = auth.uid() $$;

create or replace function public.teaches(cid text) returns boolean
  language sql stable security definer set search_path=public as
$$ select exists(select 1 from courses where id=cid and teacher_id=auth.uid()) $$;

create or replace function public.enrolled(cid text) returns boolean
  language sql stable security definer set search_path=public as
$$ select exists(select 1 from enrollments where course_id=cid and student_id=auth.uid()) $$;
```

Ejemplos de políticas (patrón por tabla):

```sql
-- submissions: estudiante ve/edita las suyas; docente del curso las ve; PIE/admin ven todo
alter table submissions enable row level security;
create policy sub_student on submissions for all to authenticated
  using ( student_id = auth.uid() ) with check ( student_id = auth.uid() );
create policy sub_teacher on submissions for select to authenticated
  using ( exists (select 1 from assignments a where a.id=assignment_id and teaches(a.course_id)) );
create policy sub_staff on submissions for all to authenticated
  using ( my_role() in ('pie','admin') ) with check ( my_role() in ('pie','admin') );

-- pie_profiles (sensible): estudiante lee lo suyo; PIE/admin todo; docente solo lectura de sus estudiantes
create policy pie_self on pie_profiles for select to authenticated using ( student_id = auth.uid() );
create policy pie_staff on pie_profiles for all to authenticated
  using ( my_role() in ('pie','admin') ) with check ( my_role() in ('pie','admin') );
create policy pie_teacher on pie_profiles for select to authenticated
  using ( exists (select 1 from enrollments e join courses c on c.id=e.course_id
                  where e.student_id=pie_profiles.student_id and c.teacher_id=auth.uid()) );

-- messages: solo emisor o receptor
create policy msg_own on messages for all to authenticated
  using ( from_id = auth.uid() or to_id = auth.uid() )
  with check ( from_id = auth.uid() );

-- contenido compartido (courses, lessons, quizzes, assignments, events):
-- lectura para autenticados; escritura para docente del curso o admin
create policy lesson_read on lessons for select to authenticated using ( true );
create policy lesson_write on lessons for all to authenticated
  using ( teaches(course_id) or my_role()='admin' )
  with check ( teaches(course_id) or my_role()='admin' );
```

(Se replica el patrón para el resto: `adaptations`, `pie_apoyos`, `pie_evaldif`, `prelabor`, `attendance`, `enrollments`.)

## 4. Capa de datos en la app

Se abandona `saveDB()` (blob completo). Dos caminos:

- **A · Caché por sesión (recomendado, menos reescritura):** al iniciar sesión se cargan
  con `select` solo las filas permitidas (la RLS filtra en el servidor) hacia un objeto `DB`
  en memoria; la UI sigue siendo casi síncrona. Las **mutaciones** pasan a ser
  `insert/update/delete` puntuales por tabla (no se guarda todo el blob) y actualizan la caché.
  Realtime por tabla refresca la caché. Migración incremental por módulo.
- **B · Reescritura async total:** cada vista hace sus propias consultas. Más limpio y
  escalable, pero mucho más trabajo y cambia casi todo el `app.js`.

## 5. Roadmap por fases (incremental, sin romper lo actual)

1. **Fase 1 — Esquema + RLS + seed** (solo SQL en Supabase; no toca la app en vivo).
   Crear tablas, funciones y políticas; cargar contenido compartido (courses, lessons,
   quizzes, assignments, events, y opcional temarios). *Entregable de bajo riesgo.*
2. **Fase 2 — Auth obligatoria + perfiles.** Activar `REQUIRE_AUTH`, trigger de creación de
   `profiles`, pantalla de admin para asignar rol e inscripciones (enrollments).
3. **Fase 3 — Lectura por tabla.** Reemplazar la carga del blob por carga de slices permitidos
   (empezando por lo menos sensible: courses/lessons/quizzes → luego submissions/notas →
   mensajes → PIE). Enfoque de caché (opción A).
4. **Fase 4 — Escritura por tabla + realtime.** Convertir cada mutación (entregar tarea,
   corregir, asistencia, mensaje, adecuación, ficha PIE) en operaciones puntuales. Suscripciones
   realtime por tabla.
5. **Fase 5 — Endurecer y probar.** Matriz de pruebas por rol (estudiante/docente/PIE/admin),
   revisar que nadie acceda a lo ajeno, quitar el blob `brain_state`.

## 6. Riesgos y consideraciones

- **Reescritura grande** del `app.js` (de síncrono a datos por tabla). Mitigar con opción A e ir módulo por módulo.
- **Migración de ids** a uuid/keys estables (romper referencias si no se hace con cuidado).
- **Errores de RLS**: demasiado abierta (fuga) o demasiado cerrada (usuarios bloqueados). Requiere pruebas por rol.
- **Sin modo offline**: al depender de la red, se pierde el funcionamiento 100% local (hoy funciona sin conexión).
- **Datos actuales**: decidir si se parte de cero (recomendado para demo) o se migran los datos del blob.
- **Dependencias de Supabase**: desactivar confirmación de email o configurar SMTP; el dominio `@brain.edu` es inválido para Auth (usar emails reales).

## 7. Decisiones a confirmar antes de la Fase 1

1. Enfoque de datos: **A (caché por sesión)** vs **B (async total)**.
2. Visibilidad PIE: ¿los **docentes** ven la ficha PIE de sus estudiantes (solo lectura) o **solo** PIE/admin?
3. Datos: **partir de cero** con seed nuevo vs **migrar** el estado actual.
4. Alcance del primer entregable: ¿hacemos ya la **Fase 1 (SQL de esquema + RLS + seed)**, que no toca la app en vivo?
