-- ============================================================
-- Brain Schooling — Fase 1: esquema + RLS con aislamiento por usuario
-- Ejecutar en Supabase → SQL Editor (corre como owner, por eso puede crear políticas).
-- Decisiones: caché por sesión · docentes ven ficha PIE de sus estudiantes (solo lectura)
--             + PIE/admin · partir de cero.
-- ============================================================

-- ---------- PERFILES (id = auth.users.id) ----------
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  name text,
  email text,
  role text not null default 'estudiante' check (role in ('estudiante','docente','pie','admin')),
  grade text,
  color text default '#5b4fc4',
  created_at timestamptz default now()
);

-- Crear perfil automáticamente al registrarse
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, email, role)
  values (new.id,
          coalesce(new.raw_user_meta_data->>'name', split_part(new.email,'@',1)),
          new.email, 'estudiante')
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users for each row execute function public.handle_new_user();

-- Evitar que un usuario se auto-promueva de rol (solo admin cambia roles)
create or replace function public.guard_role_change()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.role is distinct from old.role and coalesce(public.my_role(),'') <> 'admin' then
    raise exception 'Solo un admin puede cambiar el rol';
  end if;
  return new;
end $$;

-- ---------- FUNCIONES AUXILIARES ----------
create or replace function public.my_role() returns text
  language sql stable security definer set search_path = public as
$$ select role from public.profiles where id = auth.uid() $$;

-- ---------- TABLAS ----------
create table if not exists courses (
  id text primary key, name text, area text,
  teacher_id uuid references profiles, color text, icon text, description text
);
create table if not exists enrollments (
  course_id text references courses on delete cascade,
  student_id uuid references profiles on delete cascade,
  primary key (course_id, student_id)
);
create table if not exists lessons (
  id text primary key, course_id text references courses on delete cascade,
  nivel text, title text, mins int, oa text, body text
);
create table if not exists quizzes (
  id text primary key, course_id text references courses on delete cascade,
  nivel text, title text, questions jsonb
);
create table if not exists assignments (
  id text primary key, course_id text references courses on delete cascade,
  title text, description text, due date, points int
);
create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id text references assignments on delete cascade,
  student_id uuid references profiles on delete cascade,
  body text, date date, grade numeric, feedback text,
  unique (assignment_id, student_id)
);
create table if not exists attendance (
  id uuid primary key default gen_random_uuid(),
  course_id text references courses on delete cascade,
  student_id uuid references profiles on delete cascade,
  date date, status text,
  unique (course_id, student_id, date)
);
create table if not exists events (
  id text primary key, course_id text references courses on delete cascade,
  title text, date date, type text
);
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  from_id uuid references profiles, to_id uuid references profiles,
  subject text, body text, created_at timestamptz default now(), read boolean default false
);
create table if not exists adaptations (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles on delete cascade,
  course_id text, lesson_id text, title text, profile text,
  content text, read_text text,
  created_by uuid references profiles, created_at timestamptz default now()
);
create table if not exists pie_profiles (
  student_id uuid primary key references profiles on delete cascade,
  tipo text, perfil text, diagnostico text, profesional text,
  fecha date, revision date, notas text
);
create table if not exists pie_apoyos (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles on delete cascade,
  text text, date date, created_by uuid references profiles
);
create table if not exists pie_evaldif (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles on delete cascade,
  course_id text, name text, adec text, grade numeric, date date
);
create table if not exists prelabor (
  student_id uuid primary key references profiles on delete cascade,
  cv jsonb, skills jsonb, goals jsonb
);

-- Funciones auxiliares que dependen de las tablas anteriores
create or replace function public.teaches(cid text) returns boolean
  language sql stable security definer set search_path = public as
$$ select exists(select 1 from public.courses where id = cid and teacher_id = auth.uid()) $$;

create or replace function public.enrolled(cid text) returns boolean
  language sql stable security definer set search_path = public as
$$ select exists(select 1 from public.enrollments where course_id = cid and student_id = auth.uid()) $$;

create or replace function public.teaches_student(sid uuid) returns boolean
  language sql stable security definer set search_path = public as
$$ select exists(select 1 from public.enrollments e join public.courses c on c.id = e.course_id
                 where e.student_id = sid and c.teacher_id = auth.uid()) $$;

drop trigger if exists guard_profile_role on profiles;
create trigger guard_profile_role before update on profiles
  for each row execute function public.guard_role_change();

-- ---------- HABILITAR RLS ----------
alter table profiles     enable row level security;
alter table courses      enable row level security;
alter table enrollments  enable row level security;
alter table lessons      enable row level security;
alter table quizzes      enable row level security;
alter table assignments  enable row level security;
alter table submissions  enable row level security;
alter table attendance   enable row level security;
alter table events       enable row level security;
alter table messages     enable row level security;
alter table adaptations  enable row level security;
alter table pie_profiles enable row level security;
alter table pie_apoyos   enable row level security;
alter table pie_evaldif  enable row level security;
alter table prelabor     enable row level security;

-- ---------- POLÍTICAS ----------
-- profiles: lectura para autenticados (nombres/roles visibles en la UI); update propio; admin todo
create policy prof_read   on profiles for select to authenticated using (true);
create policy prof_self   on profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy prof_admin  on profiles for all    to authenticated using (my_role()='admin') with check (my_role()='admin');

-- Contenido compartido: lectura autenticados; escritura docente del curso o admin
create policy course_read  on courses for select to authenticated using (true);
create policy course_write on courses for all to authenticated using (teacher_id=auth.uid() or my_role()='admin') with check (teacher_id=auth.uid() or my_role()='admin');

create policy lesson_read  on lessons for select to authenticated using (true);
create policy lesson_write on lessons for all to authenticated using (teaches(course_id) or my_role()='admin') with check (teaches(course_id) or my_role()='admin');

create policy quiz_read   on quizzes for select to authenticated using (true);
create policy quiz_write  on quizzes for all to authenticated using (teaches(course_id) or my_role()='admin') with check (teaches(course_id) or my_role()='admin');

create policy asg_read    on assignments for select to authenticated using (true);
create policy asg_write   on assignments for all to authenticated using (teaches(course_id) or my_role()='admin') with check (teaches(course_id) or my_role()='admin');

create policy ev_read     on events for select to authenticated using (true);
create policy ev_write    on events for all to authenticated using (teaches(course_id) or my_role()='admin') with check (teaches(course_id) or my_role()='admin');

-- enrollments: el estudiante ve las suyas; docente del curso; staff. Escritura: docente del curso o admin
create policy enr_read    on enrollments for select to authenticated
  using (student_id=auth.uid() or teaches(course_id) or my_role() in ('pie','admin'));
create policy enr_write   on enrollments for all to authenticated
  using (teaches(course_id) or my_role()='admin') with check (teaches(course_id) or my_role()='admin');

-- submissions: estudiante las suyas; docente del curso; staff
create policy sub_student on submissions for all to authenticated
  using (student_id=auth.uid()) with check (student_id=auth.uid());
create policy sub_teacher on submissions for all to authenticated
  using (exists(select 1 from assignments a where a.id=assignment_id and teaches(a.course_id)))
  with check (exists(select 1 from assignments a where a.id=assignment_id and teaches(a.course_id)));
create policy sub_staff   on submissions for all to authenticated
  using (my_role() in ('pie','admin')) with check (my_role() in ('pie','admin'));

-- attendance: docente del curso; estudiante lee la suya; staff
create policy att_teacher on attendance for all to authenticated
  using (teaches(course_id)) with check (teaches(course_id));
create policy att_student on attendance for select to authenticated using (student_id=auth.uid());
create policy att_staff   on attendance for all to authenticated
  using (my_role() in ('pie','admin')) with check (my_role() in ('pie','admin'));

-- messages: solo emisor o receptor
create policy msg_rw on messages for all to authenticated
  using (from_id=auth.uid() or to_id=auth.uid()) with check (from_id=auth.uid());

-- adaptations: estudiante lee las suyas; creador, docente del curso, PIE y admin gestionan
create policy adapt_student on adaptations for select to authenticated using (student_id=auth.uid());
create policy adapt_manage  on adaptations for all to authenticated
  using (created_by=auth.uid() or teaches(course_id) or my_role() in ('pie','admin'))
  with check (created_by=auth.uid() or teaches(course_id) or my_role() in ('pie','admin'));

-- PIE (sensible): estudiante lee lo suyo; docente del estudiante lee (solo lectura); PIE/admin gestionan
create policy piep_self    on pie_profiles for select to authenticated using (student_id=auth.uid());
create policy piep_teacher on pie_profiles for select to authenticated using (teaches_student(student_id));
create policy piep_staff   on pie_profiles for all to authenticated using (my_role() in ('pie','admin')) with check (my_role() in ('pie','admin'));

create policy piea_self    on pie_apoyos for select to authenticated using (student_id=auth.uid());
create policy piea_teacher on pie_apoyos for select to authenticated using (teaches_student(student_id));
create policy piea_staff   on pie_apoyos for all to authenticated using (my_role() in ('pie','admin')) with check (my_role() in ('pie','admin'));

create policy piev_self    on pie_evaldif for select to authenticated using (student_id=auth.uid());
create policy piev_teacher on pie_evaldif for select to authenticated using (teaches_student(student_id));
create policy piev_staff   on pie_evaldif for all to authenticated using (my_role() in ('pie','admin')) with check (my_role() in ('pie','admin'));

-- prelabor: estudiante gestiona lo suyo; PIE/admin leen
create policy pre_self  on prelabor for all to authenticated using (student_id=auth.uid()) with check (student_id=auth.uid());
create policy pre_staff on prelabor for select to authenticated using (my_role() in ('pie','admin'));

-- ============================================================
-- Después de ejecutar esto:
--  1) Registrá tu usuario en la app (o en Authentication → Users).
--  2) Convertilo en admin (reemplazá el email):
--       update public.profiles set role='admin' where email='TU_EMAIL';
--  3) El contenido compartido (cursos, lecciones, quizzes, tareas, eventos) se cargará
--     desde la app con un botón de administración "Sembrar contenido" (Fase 1b),
--     reutilizando los datos que ya existen en data.js/temarios.js.
--  4) Activá Realtime para las tablas que quieras sincronizar en vivo.
-- ============================================================
