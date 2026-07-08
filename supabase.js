/* ===== Brain Schooling — capa de sincronización con Supabase =====
   Guarda todo el estado (DB) como un único documento JSON en la tabla `brain_state`
   (fila id='main'). Si no hay configuración o falla la red, la app sigue funcionando
   en modo local (localStorage). Última escritura gana. */
let sb = null;            // cliente supabase
let syncEnabled = false;
let _cloudTimer = null;
let _lastPushed = "";     // para no re-renderizar por nuestros propios cambios

function getSyncCfg() {
  const c = window.BRAIN_CONFIG || {};
  if (c.SUPABASE_URL && c.SUPABASE_ANON_KEY) return { url: c.SUPABASE_URL, key: c.SUPABASE_ANON_KEY, src: "config" };
  try { const o = JSON.parse(localStorage.getItem("brain_sync_cfg")); if (o && o.url && o.key) return { url: o.url, key: o.key, src: "local" }; } catch (e) {}
  return null;
}
function setLocalSyncCfg(url, key) {
  if (url && key) localStorage.setItem("brain_sync_cfg", JSON.stringify({ url: url.trim(), key: key.trim() }));
  else localStorage.removeItem("brain_sync_cfg");
}
async function initSupabase() {
  const cfg = getSyncCfg();
  if (!cfg || !window.supabase || !window.supabase.createClient) { syncEnabled = false; return false; }
  try {
    sb = window.supabase.createClient(cfg.url, cfg.key);
    syncEnabled = true;
    return true;
  } catch (e) { console.warn("[sync] init", e.message); syncEnabled = false; return false; }
}
async function cloudLoad() {
  if (!syncEnabled) return null;
  try {
    const { data, error } = await sb.from("brain_state").select("data").eq("id", "main").maybeSingle();
    if (error) { console.warn("[sync] load", error.message); return null; }
    return data ? data.data : null;
  } catch (e) { console.warn("[sync] load", e.message); return null; }
}
async function cloudSave(obj) {
  if (!syncEnabled) return;
  try {
    _lastPushed = JSON.stringify(obj);
    const { error } = await sb.from("brain_state").upsert({ id: "main", data: obj, updated_at: new Date().toISOString() });
    if (error) console.warn("[sync] save", error.message);
  } catch (e) { console.warn("[sync] save", e.message); }
}
function scheduleCloudSave() {
  if (!syncEnabled) return;
  if (typeof requireAuth === "function" && requireAuth()) return; // modo tablas: no se usa el blob
  clearTimeout(_cloudTimer);
  _cloudTimer = setTimeout(() => { if (typeof DB !== "undefined") cloudSave(DB); }, 700);
}
function subscribeCloud() {
  if (!syncEnabled || !sb) return;
  try {
    sb.channel("brain_state_ch")
      .on("postgres_changes", { event: "*", schema: "public", table: "brain_state" }, (payload) => {
        const incoming = payload.new && payload.new.data;
        if (!incoming) return;
        const str = JSON.stringify(incoming);
        if (str === _lastPushed) return;                 // eco de nuestro propio guardado
        if (typeof DB !== "undefined" && str === JSON.stringify(DB)) return;
        DB = incoming;
        try { localStorage.setItem(DB_KEY, JSON.stringify(DB)); } catch (e) {}
        if (typeof session !== "undefined" && session && typeof user === "function" && user(session)) {
          if (typeof renderApp === "function") renderApp();
        }
      })
      .subscribe();
  } catch (e) { console.warn("[sync] subscribe", e.message); }
}
/* ---------- Fase 3: lectura por tablas → reconstruye el objeto DB (cache de sesión) ----------
   Trae solo las filas que la RLS permite ver al usuario autenticado y las mapea a la
   forma que ya usa app.js, para no reescribir toda la UI. */
async function cloudLoadAll() {
  if (!sb) return null;
  const names = ["profiles", "courses", "enrollments", "lessons", "quizzes", "assignments",
    "submissions", "attendance", "events", "messages", "adaptations", "pie_profiles", "pie_apoyos", "pie_evaldif", "prelabor"];
  let res;
  try { res = await Promise.all(names.map(n => sb.from(n).select("*"))); }
  catch (e) { console.warn("[cloud] loadAll", e.message); return null; }
  const bad = res.find(r => r.error);
  if (bad && bad.error) { console.warn("[cloud] loadAll", bad.error.message); return null; }
  const D = {}; names.forEach((n, i) => D[n] = res[i].data || []);

  const db = {
    users: D.profiles.map(p => ({ id: p.id, name: p.name, email: p.email, role: p.role, grade: p.grade, color: p.color,
      enrolled: D.enrollments.filter(e => e.student_id === p.id).map(e => e.course_id) })),
    courses: D.courses.map(c => ({ id: c.id, name: c.name, area: c.area, teacher: c.teacher_id, color: c.color, icon: c.icon, desc: c.description })),
    lessons: D.lessons.map(l => ({ id: l.id, course: l.course_id, nivel: l.nivel, title: l.title, mins: l.mins, oa: l.oa, body: l.body })),
    quizzes: D.quizzes.map(q => ({ id: q.id, course: q.course_id, nivel: q.nivel, title: q.title, questions: q.questions })),
    assignments: D.assignments.map(a => ({ id: a.id, course: a.course_id, title: a.title, desc: a.description, due: a.due, points: a.points })),
    submissions: D.submissions.map(s => ({ id: s.id, assignment: s.assignment_id, student: s.student_id, text: s.body, date: s.date, grade: s.grade, feedback: s.feedback })),
    attendance: D.attendance.map(a => ({ date: a.date, course: a.course_id, student: a.student_id, status: a.status })),
    events: D.events.map(e => ({ id: e.id, course: e.course_id, title: e.title, date: e.date, type: e.type })),
    messages: D.messages.map(m => ({ id: m.id, from: m.from_id, to: m.to_id, subject: m.subject, body: m.body, date: m.created_at, read: m.read })),
    adaptations: D.adaptations.map(a => ({ id: a.id, student: a.student_id, course: a.course_id, lesson: a.lesson_id, title: a.title, profile: a.profile, content: a.content, readText: a.read_text, by: a.created_by, date: a.created_at })),
    pie: {}, prelabor: {},
  };
  const pie = (sid) => (db.pie[sid] = db.pie[sid] || { nee: {}, apoyos: [], evalDif: [] });
  D.pie_profiles.forEach(p => { pie(p.student_id).nee = { tipo: p.tipo, perfil: p.perfil, diagnostico: p.diagnostico, profesional: p.profesional, fecha: p.fecha, revision: p.revision, notas: p.notas }; });
  D.pie_apoyos.forEach(a => { pie(a.student_id).apoyos.push({ id: a.id, text: a.text, date: a.date, by: a.created_by }); });
  D.pie_evaldif.forEach(e => { pie(e.student_id).evalDif.push({ id: e.id, course: e.course_id, name: e.name, adec: e.adec, grade: e.grade, date: e.date }); });
  D.prelabor.forEach(p => { db.prelabor[p.student_id] = { cv: p.cv || { headline: "", summary: "", experience: "", education: "" }, skills: p.skills || [], goals: p.goals || [] }; });
  return db;
}

/* ---------- Fase 3: escritura por tablas ---------- */
function cloudActive() { return typeof requireAuth === "function" && requireAuth() && !!sb; }
async function cloudUpsert(table, row, onConflict) {
  if (!cloudActive()) return;
  try { const q = sb.from(table).upsert(row, onConflict ? { onConflict } : undefined); const { error } = await q; if (error) console.warn("[cloud] upsert " + table, error.message); }
  catch (e) { console.warn("[cloud] upsert " + table, e.message); }
}
async function cloudDelete(table, match) {
  if (!cloudActive()) return;
  try { const { error } = await sb.from(table).delete().match(match); if (error) console.warn("[cloud] delete " + table, error.message); }
  catch (e) { console.warn("[cloud] delete " + table, e.message); }
}

/* ---------- Autenticación real (Supabase Auth) ---------- */
async function authSignIn(email, password) {
  if (!sb) return { ok: false, msg: "Sin conexión a la nube" };
  try {
    const { data, error } = await sb.auth.signInWithPassword({ email: (email || "").trim(), password });
    if (error) return { ok: false, msg: error.message };
    return { ok: true, user: data.user };
  } catch (e) { return { ok: false, msg: e.message }; }
}
async function authSignUp(email, password, meta) {
  if (!sb) return { ok: false, msg: "Sin conexión a la nube" };
  try {
    const { data, error } = await sb.auth.signUp({ email: (email || "").trim(), password, options: { data: meta || {} } });
    if (error) return { ok: false, msg: error.message };
    return { ok: true, user: data.user, session: data.session };
  } catch (e) { return { ok: false, msg: e.message }; }
}
async function authSignOut() { try { if (sb) await sb.auth.signOut(); } catch (e) {} }
async function authSessionEmail() {
  if (!sb) return null;
  try { const { data } = await sb.auth.getSession(); return data && data.session ? data.session.user.email : null; }
  catch (e) { return null; }
}

async function testSyncConnection(url, key) {
  if (!window.supabase || !window.supabase.createClient) return { ok: false, msg: "No se cargó la librería de Supabase (revisá tu conexión)." };
  try {
    const c = window.supabase.createClient(url.trim(), key.trim());
    const { error } = await c.from("brain_state").select("id").limit(1);
    if (error) return { ok: false, msg: error.message };
    return { ok: true, msg: "Conexión correcta ✔️" };
  } catch (e) { return { ok: false, msg: e.message }; }
}
