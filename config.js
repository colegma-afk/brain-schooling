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
  SUPABASE_URL: "https://azgkzyoqtjmmqqmoczyc.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6Z2t6eW9xdGptbXFxbW9jenljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0Mjc1OTgsImV4cCI6MjA5OTAwMzU5OH0.TphIknTYuluw0B3pkiQ_B-wie2_JP29hOWZFRpZ_OPs",

  // Autenticación real con Supabase Auth. Dejalo en false hasta completar en Supabase:
  //   1) Authentication → Providers → Email → desactivar "Confirm email".
  //   2) Ejecutar el SQL de "bloqueo" (ver botón ☁️ Sincronización en la app).
  // Con REQUIRE_AUTH:true, el ingreso es por email/contraseña reales (login/registro).
  REQUIRE_AUTH: true
};
