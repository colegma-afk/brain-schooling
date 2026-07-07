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
