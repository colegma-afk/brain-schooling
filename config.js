/* ===== Brain Schooling — configuración de sincronización en la nube =====
   Dejá los valores vacíos para funcionar en MODO LOCAL (los datos viven solo en
   este navegador, con localStorage). Completalos para COMPARTIR los datos entre
   la coordinación PIE, docentes y estudiantes desde cualquier dispositivo.

   1) Creá un proyecto gratis en https://supabase.com
   2) En "Project Settings → API" copiá la URL y la clave "anon public".
   3) Pegalas abajo, guardá y volvé a publicar (git push).
   4) En "SQL Editor" ejecutá el script que aparece en la app
      (menú Admin → botón ☁️ Sincronización).

   Nota: la clave "anon public" está pensada para usarse en el navegador
   (protegida por las políticas RLS de la tabla). No pongas aquí la "service_role". */
window.BRAIN_CONFIG = {
  SUPABASE_URL: "",       // ej: https://xxxxxxxx.supabase.co
  SUPABASE_ANON_KEY: ""   // clave anon public
};
