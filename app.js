/* ===== Brain Schooling — lógica de la aplicación ===== */
const SESSION_KEY = "brain_schooling_session";
let session = null;   // id de usuario logueado
let view = "dashboard";
let viewArg = null;

/* ---------- logo de marca (SVG) ---------- */
function brainLogo(size = 40) {
  const id = "bg" + size;
  return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop stop-color="#6d5fe0"/><stop offset="1" stop-color="#14b8a6"/></linearGradient></defs>
    <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#${id})"/>
    <path d="M32 16c-4.4 0-8 3.2-8 7.2 0 .4 0 .8.1 1.2-2.6.8-4.5 3.1-4.5 5.9 0 1.7.7 3.2 1.9 4.3-.5.9-.8 1.9-.8 3 0 3.6 3.1 6.5 7 6.5 1.7 0 3.2-.6 4.3-1.5V16z" fill="#fff" fill-opacity=".95"/>
    <path d="M32 16c4.4 0 8 3.2 8 7.2 0 .4 0 .8-.1 1.2 2.6.8 4.5 3.1 4.5 5.9 0 1.7-.7 3.2-1.9 4.3.5.9.8 1.9.8 3 0 3.6-3.1 6.5-7 6.5-1.7 0-3.2-.6-4.3-1.5V16z" fill="#fff" fill-opacity=".8"/>
    <path d="M32 20v24M27 25h4M33 31h4M27 37h4" stroke="#5b4fc4" stroke-width="1.6" stroke-linecap="round" opacity=".55"/>
  </svg>`;
}

/* ---------- utilidades ---------- */
const $ = (sel) => document.querySelector(sel);
const el = (id) => document.getElementById(id);
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
function uid(p) { return p + "_" + Math.random().toString(36).slice(2, 9); }
function initials(name) { return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase(); }
function user(id) { return DB.users.find(u => u.id === id); }
function course(id) { return DB.courses.find(c => c.id === id); }
function me() { return user(session); }
function fmtDate(d) {
  if (!d) return "—";
  const dt = new Date(d + (d.length === 10 ? "T00:00" : ""));
  return dt.toLocaleDateString("es", { day: "2-digit", month: "short", year: "numeric" });
}
function today() { return new Date().toISOString().slice(0, 10); }
function daysTo(d) { return Math.round((new Date(d) - new Date(today())) / 86400000); }

function toast(msg) {
  const t = el("toast"); t.textContent = msg; t.classList.remove("hidden");
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.add("hidden"), 2600);
}
function openModal(html) { el("modal-box").innerHTML = html; el("modal-box").className = "modal-box"; el("modal-overlay").classList.remove("hidden"); }
function closeModal() {
  stopVideo();
  el("modal-overlay").classList.add("hidden");
  el("modal-box").className = "modal-box";
}

/* ---------- consultas de dominio ---------- */
function myCourses() {
  const u = me();
  if (u.role === "admin") return DB.courses;
  if (u.role === "docente") return DB.courses.filter(c => c.teacher === u.id);
  return DB.courses.filter(c => (u.enrolled || []).includes(c.id));
}
function courseStudents(cid) {
  return DB.users.filter(u => u.role === "estudiante" && (u.enrolled || []).includes(cid));
}
function assignmentsFor(cid) { return DB.assignments.filter(a => a.course === cid); }
function submission(aid, sid) { return DB.submissions.find(s => s.assignment === aid && s.student === sid); }
function unreadCount() { return DB.messages.filter(m => m.to === session && !m.read).length; }
function myGrades() {
  return DB.submissions.filter(s => s.student === session && s.grade != null);
}

/* ============================================================
   LOGIN
============================================================ */
function renderLogin() {
  el("app").innerHTML = `
    <div class="login-wrap">
      <div class="login-card">
        <div class="login-logo" style="display:flex;justify-content:center">${brainLogo(72)}</div>
        <div class="login-title">Brain <span>Schooling</span></div>
        <div class="login-sub">Aula virtual · Secundaria & Pre-Laboral</div>
        <form onsubmit="doLogin(event)">
          <div class="field">
            <label>Correo electrónico</label>
            <input id="li-email" type="email" placeholder="tu@brain.edu" required>
          </div>
          <div class="field">
            <label>Contraseña</label>
            <input id="li-pass" type="password" placeholder="••••" required>
          </div>
          <button class="btn btn-primary btn-block" type="submit">Ingresar</button>
        </form>
        <div class="login-hint">Accesos rápidos de demostración:</div>
        <div class="demo-row">
          <button class="demo-btn" onclick="quickLogin('admin@brain.edu')">👤 Admin</button>
          <button class="demo-btn" onclick="quickLogin('laura@brain.edu')">🍎 Docente</button>
          <button class="demo-btn" onclick="quickLogin('martin@brain.edu')">🎓 Estudiante</button>
        </div>
      </div>
    </div>`;
}
function doLogin(e) {
  e.preventDefault();
  const email = el("li-email").value.trim().toLowerCase();
  const pass = el("li-pass").value;
  const u = DB.users.find(x => x.email.toLowerCase() === email && x.pass === pass);
  if (!u) { toast("Credenciales incorrectas"); return; }
  session = u.id; localStorage.setItem(SESSION_KEY, session);
  nivelSel = null; view = "dashboard"; renderApp();
}
function quickLogin(email) {
  const u = DB.users.find(x => x.email === email);
  session = u.id; localStorage.setItem(SESSION_KEY, session);
  nivelSel = null; view = "dashboard"; renderApp();
}
function logout() { session = null; localStorage.removeItem(SESSION_KEY); renderLogin(); }

/* ============================================================
   SHELL / NAVEGACIÓN
============================================================ */
function navFor(role) {
  const base = [
    { id: "dashboard", ic: "🏠", label: "Inicio" },
    { id: "courses", ic: "📚", label: "Cursos" },
    { id: "assignments", ic: "📝", label: "Tareas" },
    { id: "calendar", ic: "📅", label: "Calendario" },
    { id: "messages", ic: "✉️", label: "Mensajes", badge: unreadCount() },
  ];
  if (role === "estudiante") {
    base.push({ id: "grades", ic: "📊", label: "Mis notas" });
    base.push({ id: "prelabor", ic: "💼", label: "Pre-Laboral" });
    base.push({ id: "university", ic: "🎓", label: "Universidad" });
  }
  if (role === "docente") {
    base.push({ id: "gradebook", ic: "📊", label: "Calificaciones" });
    base.push({ id: "attendance", ic: "✅", label: "Asistencia" });
  }
  if (role === "admin") {
    base.push({ id: "people", ic: "👥", label: "Usuarios" });
    base.push({ id: "reports", ic: "📈", label: "Reportes" });
  }
  return base;
}
const TITLES = {
  dashboard: "Inicio", courses: "Cursos", assignments: "Tareas", calendar: "Calendario",
  messages: "Mensajes", grades: "Mis notas", prelabor: "Módulo Pre-Laboral",
  gradebook: "Calificaciones", attendance: "Asistencia", people: "Usuarios", reports: "Reportes",
  course: "Curso", university: "Orientación Universitaria",
};
function renderApp() {
  const u = me();
  if (!u) { renderLogin(); return; }
  const nav = navFor(u.role);
  el("app").innerHTML = `
    <div class="shell">
      <aside class="sidebar">
        <div class="side-logo">${brainLogo(34)}<span>Brain <b>Schooling</b></span></div>
        <nav class="side-nav">
          ${nav.map(n => `
            <button class="nav-item ${view === n.id ? "active" : ""}" onclick="go('${n.id}')">
              <span>${n.ic}</span><span>${n.label}</span>
              ${n.badge ? `<span class="badge">${n.badge}</span>` : ""}
            </button>`).join("")}
        </nav>
        <div class="side-footer">
          <div class="side-user">
            <div class="avatar" style="background:${u.color}">${initials(u.name)}</div>
            <div class="who"><div class="n">${esc(u.name)}</div><div class="r">${u.role}${u.grade ? " · " + u.grade : ""}</div></div>
          </div>
          <button class="btn btn-ghost btn-sm btn-block" onclick="logout()">Cerrar sesión</button>
        </div>
      </aside>
      <main class="main">
        <header class="topbar">
          <h1>${TITLES[view] || "Brain Schooling"}</h1>
          <div class="top-actions">
            <button class="icon-btn" title="Tema" onclick="toggleTheme()">🌓</button>
          </div>
        </header>
        <div class="content" id="content"></div>
      </main>
    </div>`;
  renderView();
}
function go(v, arg) { view = v; viewArg = arg || null; renderApp(); }

function renderView() {
  const c = el("content");
  const r = me().role;
  switch (view) {
    case "dashboard": return viewDashboard(c);
    case "courses": return viewCourses(c);
    case "course": return viewCourse(c);
    case "assignments": return viewAssignments(c);
    case "calendar": return viewCalendar(c);
    case "messages": return viewMessages(c);
    case "grades": return viewGrades(c);
    case "prelabor": return viewPrelabor(c);
    case "university": return viewUniversity(c);
    case "gradebook": return viewGradebook(c);
    case "attendance": return viewAttendance(c);
    case "people": return viewPeople(c);
    case "reports": return viewReports(c);
    default: c.innerHTML = "<div class='empty'>Sección no encontrada.</div>";
  }
}

/* ============================================================
   DASHBOARD
============================================================ */
function statCard(ico, bg, v, l) {
  return `<div class="card stat-card"><div class="stat-ico" style="background:${bg}22;color:${bg}">${ico}</div><div><div class="v">${v}</div><div class="l">${l}</div></div></div>`;
}
function viewDashboard(c) {
  const u = me();
  const cs = myCourses();
  let stats = "";
  if (u.role === "estudiante") {
    const grades = myGrades();
    const avg = grades.length ? (grades.reduce((a, s) => a + s.grade, 0) / grades.length).toFixed(1) : "—";
    const pending = DB.assignments.filter(a => cs.some(cc => cc.id === a.course) && !submission(a.id, u.id)).length;
    stats = statCard("📚", "#5b4fc4", cs.length, "Cursos activos")
      + statCard("📝", "#e8a13c", pending, "Tareas pendientes")
      + statCard("📊", "#14b8a6", avg, "Promedio general")
      + statCard("✉️", "#e05260", unreadCount(), "Mensajes sin leer");
  } else if (u.role === "docente") {
    const studs = new Set(); cs.forEach(cc => courseStudents(cc.id).forEach(s => studs.add(s.id)));
    const toGrade = DB.submissions.filter(s => s.grade == null && assignmentsFor2(cs).some(a => a.id === s.assignment)).length;
    stats = statCard("📚", "#5b4fc4", cs.length, "Cursos a cargo")
      + statCard("👥", "#14b8a6", studs.size, "Estudiantes")
      + statCard("📝", "#e8a13c", toGrade, "Entregas por corregir")
      + statCard("✉️", "#e05260", unreadCount(), "Mensajes sin leer");
  } else {
    stats = statCard("📚", "#5b4fc4", DB.courses.length, "Cursos")
      + statCard("👥", "#14b8a6", DB.users.filter(x => x.role === "estudiante").length, "Estudiantes")
      + statCard("🍎", "#e8a13c", DB.users.filter(x => x.role === "docente").length, "Docentes")
      + statCard("📝", "#e05260", DB.assignments.length, "Tareas activas");
  }

  // próximos eventos
  const up = DB.events.filter(e => daysTo(e.date) >= 0).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 5);
  const upHtml = up.length ? up.map(e => `
    <div class="list-item">
      <div class="stat-ico" style="background:${course(e.course).color}22;color:${course(e.course).color};width:40px;height:40px;font-size:1rem">${e.type === "entrega" ? "📌" : "📆"}</div>
      <div class="grow"><div class="t">${esc(e.title)}</div><div class="s">${course(e.course).name} · ${fmtDate(e.date)}</div></div>
      <span class="pill ${daysTo(e.date) <= 2 ? "warn" : "info"}">${daysTo(e.date) === 0 ? "Hoy" : "en " + daysTo(e.date) + "d"}</span>
    </div>`).join("") : "<div class='empty'>Sin eventos próximos.</div>";

  c.innerHTML = `
    <div style="margin-bottom:22px"><h2 style="font-size:1.4rem">¡Hola, ${esc(u.name.split(" ")[0])}! 👋</h2>
      <p style="color:var(--text-soft)">Este es tu panel de ${u.role}. ${fmtDate(today())}.</p></div>
    <div class="grid grid-4">${stats}</div>
    <div class="grid grid-2" style="margin-top:22px">
      <div class="card"><h3>📅 Próximos eventos</h3>${upHtml}</div>
      <div class="card"><h3>📚 Tus cursos</h3>
        ${cs.map(cc => `
          <div class="list-item" style="cursor:pointer" onclick="go('course','${cc.id}')">
            <div class="stat-ico" style="background:${cc.color}22;color:${cc.color};width:40px;height:40px;font-size:1.1rem">${cc.icon}</div>
            <div class="grow"><div class="t">${cc.name}</div><div class="s">${cc.area === "prelaboral" ? "Pre-Laboral" : "Secundaria"} · ${user(cc.teacher).name}</div></div>
            <span style="color:var(--text-soft)">›</span>
          </div>`).join("") || "<div class='empty'>Sin cursos.</div>"}
      </div>
    </div>`;
}
function assignmentsFor2(cs) { return DB.assignments.filter(a => cs.some(c => c.id === a.course)); }

/* ============================================================
   CURSOS
============================================================ */
function viewCourses(c) {
  const cs = myCourses();
  const canCreate = me().role !== "estudiante";
  c.innerHTML = `
    <div class="section-head"><h2>${me().role === "estudiante" ? "Mis cursos" : "Cursos"}</h2>
      ${canCreate ? `<button class="btn btn-primary btn-sm" onclick="editCourse()">+ Nuevo curso</button>` : ""}</div>
    <div class="grid grid-3">
      ${cs.map(cc => {
        const nl = DB.lessons.filter(l => l.course === cc.id).length;
        const na = assignmentsFor(cc.id).length;
        return `<div class="card course-card" onclick="go('course','${cc.id}')">
          <div class="course-band" style="background:${cc.color}"></div>
          <div class="ico">${cc.icon}</div>
          <h3>${cc.name}</h3>
          <div class="meta">${user(cc.teacher).name}</div>
          <p style="font-size:.85rem;color:var(--text-soft);margin-top:8px">${esc(cc.desc)}</p>
          <div style="display:flex;gap:14px;margin-top:12px;font-size:.8rem;color:var(--text-soft)">
            <span>📖 ${nl} lecciones</span><span>📝 ${na} tareas</span>
          </div>
          <span class="tag ${cc.area === "prelaboral" ? "pre" : "sec"}">${cc.area === "prelaboral" ? "Pre-Laboral" : "Secundaria"}</span>
        </div>`;
      }).join("") || "<div class='empty'><span class='e'>📚</span>No tenés cursos aún.</div>"}
    </div>`;
}

let courseTab = "lessons";
let nivelSel = null;
const NIVELES = [["1M", "1° medio"], ["2M", "2° medio"], ["3M", "3° medio"], ["4M", "4° medio"]];
function gradeToNivel(g) { const m = String(g || "").match(/([1-4])/); return m ? m[1] + "M" : null; }
function lessonNivel(l) { return l.nivel || "1M"; }
function viewCourse(c) {
  const cc = course(viewArg);
  if (!cc) { c.innerHTML = "<div class='empty'>Curso no encontrado.</div>"; return; }
  if (nivelSel === null) nivelSel = gradeToNivel(me().grade) || "1M";
  const isTeacher = me().role !== "estudiante";
  const lessons = DB.lessons.filter(l => l.course === cc.id && lessonNivel(l) === nivelSel);
  const asgs = assignmentsFor(cc.id);
  const quizzes = DB.quizzes.filter(q => q.course === cc.id && lessonNivel(q) === nivelSel);
  const studs = courseStudents(cc.id);

  let tabBody = "";
  if (courseTab === "lessons") {
    tabBody = `${isTeacher ? `<button class="btn btn-primary btn-sm" style="margin-bottom:14px" onclick="editLesson('${cc.id}')">+ Nueva lección</button>` : ""}
      ${lessons.map(l => `
        <div class="list-item">
          <div class="stat-ico" style="background:${cc.color}22;color:${cc.color};width:40px;height:40px;font-size:1rem">📖</div>
          <div class="grow"><div class="t">${esc(l.title)}</div><div class="s">⏱️ ${l.mins} min${l.oa ? ` · <span class="pill info" style="font-size:.68rem;padding:1px 8px">${esc(l.oa)}</span>` : ""}</div></div>
          <button class="btn btn-accent btn-sm" onclick="openVideo('${l.id}')" title="Video narrado">▶ Video</button>
          <button class="btn btn-ghost btn-sm" onclick="openLesson('${l.id}')">Ver lección</button>
        </div>`).join("") || "<div class='empty'>Sin lecciones aún.</div>"}`;
  } else if (courseTab === "asg") {
    tabBody = `${isTeacher ? `<button class="btn btn-primary btn-sm" style="margin-bottom:14px" onclick="editAssignment('${cc.id}')">+ Nueva tarea</button>` : ""}
      ${asgs.map(a => asgRow(a)).join("") || "<div class='empty'>Sin tareas.</div>"}`;
  } else if (courseTab === "quiz") {
    tabBody = quizzes.map(q => `
      <div class="list-item">
        <div class="stat-ico" style="background:${cc.color}22;color:${cc.color};width:40px;height:40px;font-size:1rem">🧩</div>
        <div class="grow"><div class="t">${esc(q.title)}</div><div class="s">${q.questions.length} preguntas · autocorregible</div></div>
        <button class="btn btn-accent btn-sm" onclick="startQuiz('${q.id}')">Comenzar</button>
      </div>`).join("") || "<div class='empty'>Sin evaluaciones.</div>";
  } else if (courseTab === "people") {
    tabBody = `<div class="list-item"><div class="avatar" style="background:${user(cc.teacher).color}">${initials(user(cc.teacher).name)}</div>
        <div class="grow"><div class="t">${user(cc.teacher).name}</div><div class="s">Docente</div></div></div>
      ${studs.map(s => `<div class="list-item"><div class="avatar" style="background:${s.color}">${initials(s.name)}</div>
        <div class="grow"><div class="t">${esc(s.name)}</div><div class="s">${s.grade || "Estudiante"}</div></div></div>`).join("")}`;
  }

  c.innerHTML = `
    <button class="btn btn-ghost btn-sm" style="margin-bottom:16px" onclick="go('courses')">‹ Volver a cursos</button>
    <div class="card" style="margin-bottom:20px">
      <div class="course-band" style="background:${cc.color}"></div>
      <div style="display:flex;align-items:center;gap:14px">
        <div style="font-size:2.4rem">${cc.icon}</div>
        <div><h2 style="font-size:1.4rem">${cc.name}</h2>
          <div style="color:var(--text-soft);font-size:.88rem">${user(cc.teacher).name} · ${studs.length} estudiantes</div></div>
      </div>
      <p style="margin-top:12px;color:var(--text-soft)">${esc(cc.desc)}</p>
    </div>
    <div class="tabs">
      ${tabBtn("lessons", "📖 Lecciones")}
      ${tabBtn("asg", "📝 Tareas")}
      ${tabBtn("quiz", "🧩 Evaluaciones")}
      ${tabBtn("people", "👥 Integrantes")}
    </div>
    ${(courseTab === "lessons" || courseTab === "quiz") ? `<div class="nivel-bar">
      <span class="nivel-lbl">Nivel:</span>
      ${NIVELES.map(([v, lbl]) => {
        const n = DB.lessons.filter(l => l.course === cc.id && lessonNivel(l) === v).length;
        return `<button class="nivel-chip ${nivelSel === v ? "active" : ""}" onclick="nivelSel='${v}';renderView()">${lbl}${n ? ` <b>${n}</b>` : ""}</button>`;
      }).join("")}
    </div>` : ""}
    <div class="card">${tabBody}</div>`;
}
function tabBtn(id, label) { return `<button class="tab ${courseTab === id ? "active" : ""}" onclick="courseTab='${id}';renderView()">${label}</button>`; }

function asgRow(a) {
  const isStudent = me().role === "estudiante";
  const sub = isStudent ? submission(a.id, session) : null;
  const overdue = daysTo(a.due) < 0;
  let right;
  if (isStudent) {
    if (sub && sub.grade != null) right = `<span class="pill ok">Nota: ${sub.grade}/10</span>`;
    else if (sub) right = `<span class="pill info">Entregado</span>`;
    else right = `<button class="btn btn-accent btn-sm" onclick="openSubmit('${a.id}')">Entregar</button>`;
  } else {
    const subs = DB.submissions.filter(s => s.assignment === a.id);
    const graded = subs.filter(s => s.grade != null).length;
    right = `<button class="btn btn-ghost btn-sm" onclick="openGrading('${a.id}')">Corregir (${graded}/${subs.length})</button>`;
  }
  return `<div class="list-item">
      <div class="stat-ico" style="background:${course(a.course).color}22;color:${course(a.course).color};width:40px;height:40px;font-size:1rem">📝</div>
      <div class="grow"><div class="t">${esc(a.title)}</div>
        <div class="s">${course(a.course).name} · vence ${fmtDate(a.due)} ${overdue && (!sub) ? "· <span style='color:var(--danger)'>vencida</span>" : ""}</div></div>
      ${right}
    </div>`;
}

/* ---------- lecciones ---------- */
function openLesson(lid) {
  const l = DB.lessons.find(x => x.id === lid);
  openModal(`<h3>📖 ${esc(l.title)}</h3>
    <div style="color:var(--text-soft);font-size:.82rem;margin-bottom:14px">${course(l.course).name} · ${l.mins} min${l.oa ? ` · <b>${esc(l.oa)}</b> (Currículum Nacional)` : ""}</div>
    <div class="lesson-body">${l.body}</div>
    <div class="modal-actions"><button class="btn btn-accent" onclick="openVideo('${l.id}')">▶ Ver en video</button>
      <button class="btn btn-primary" onclick="closeModal();toast('¡Lección completada! 🎉')">Marcar como leída</button></div>`);
}

/* ---------- video-lección narrada ---------- */
let videoState = null;
function stripTags(html) { const d = document.createElement("div"); d.innerHTML = html; return d.textContent.replace(/\s+/g, " ").trim(); }
function buildSlides(l) {
  const cc = course(l.course);
  const slides = [];
  slides.push({ kind: "intro", icon: cc.icon, title: l.title, sub: cc.name + (l.oa ? " · " + l.oa : ""),
    narration: `Bienvenidos a la lección: ${l.title}, de la asignatura ${cc.name}. ${l.oa ? "Objetivo de aprendizaje " + l.oa + " del Currículum Nacional." : ""} Comencemos.` });
  const tmp = document.createElement("div"); tmp.innerHTML = l.body;
  tmp.childNodes.forEach(node => {
    if (node.nodeType !== 1) return;
    const tag = node.tagName.toLowerCase();
    if (tag === "p") {
      const t = stripTags(node.innerHTML);
      if (t) slides.push({ kind: "text", title: "Concepto clave", html: node.innerHTML, narration: t });
    } else if (tag === "ul" || tag === "ol") {
      const items = [...node.querySelectorAll("li")].map(li => li.innerHTML);
      slides.push({ kind: "list", title: "Puntos clave", items, narration: "Puntos clave. " + items.map(stripTags).join(". ") + "." });
    }
  });
  slides.push({ kind: "end", icon: "🎓", title: "¡Muy bien!", sub: "Completaste la lección",
    narration: `Con esto terminamos la lección ${l.title}. Ahora te invito a resolver la evaluación autocorregible y las tareas del curso. ¡Excelente trabajo!` });
  return slides;
}
function openVideo(lid) {
  const l = DB.lessons.find(x => x.id === lid);
  const cc = course(l.course);
  videoState = { lesson: l, slides: buildSlides(l), i: 0, playing: true, timer: null, spokenIdx: -1 };
  el("modal-box").className = "modal-box video";
  el("modal-box").innerHTML = `
    <div class="video-stage" id="v-stage" style="background:linear-gradient(135deg, ${cc.color} 0%, #4438a8 130%)"></div>
    <div class="video-caption"><div class="lbl">🔊 Narración</div><div id="v-cap"></div></div>
    <div class="video-bar"><div class="vfill" id="v-fill"></div></div>
    <div class="video-controls">
      <button class="vbtn" onclick="videoSeek(-1)" title="Anterior">⏮</button>
      <button class="vbtn play" id="v-play" onclick="videoToggle()" title="Reproducir/Pausar">⏸</button>
      <button class="vbtn" onclick="videoSeek(1)" title="Siguiente">⏭</button>
      <span class="vmeta" id="v-meta"></span>
      <button class="btn btn-ghost btn-sm vclose" onclick="closeModal()">Cerrar</button>
    </div>`;
  el("modal-overlay").classList.remove("hidden");
  renderSlide(); speakSlide();
}
function renderSlide() {
  if (!videoState) return;
  const s = videoState.slides[videoState.i];
  let inner = "";
  if (s.kind === "intro" || s.kind === "end") {
    inner = `<div class="vslide-ico">${s.icon}</div><div class="vslide-title">${esc(s.title)}</div><div class="vslide-sub">${esc(s.sub)}</div>`;
  } else if (s.kind === "text") {
    inner = `<div class="vslide-title" style="font-size:1.3rem">${esc(s.title)}</div><div class="vslide-text">${s.html}</div>`;
  } else if (s.kind === "list") {
    inner = `<div class="vslide-title" style="font-size:1.4rem;margin-bottom:16px">${esc(s.title)}</div>
      <ul class="vslide-list">${s.items.map((it, k) => `<li id="v-li-${k}" class="${k <= videoState.spokenIdx ? "spoken" : ""}">${it}</li>`).join("")}</ul>`;
  }
  el("v-stage").innerHTML = `<span class="vtag">🎬 ${esc(course(videoState.lesson.course).name)}</span>
    <span class="vnum">${videoState.i + 1} / ${videoState.slides.length}</span>${inner}`;
  el("v-cap").textContent = s.narration;
  el("v-meta").textContent = `Lámina ${videoState.i + 1} de ${videoState.slides.length}`;
  el("v-fill").style.width = ((videoState.i + 1) / videoState.slides.length * 100) + "%";
  el("v-play").textContent = videoState.playing ? "⏸" : "▶";
}
function speakSlide() {
  if (!videoState || !videoState.playing) return;
  const s = videoState.slides[videoState.i];
  clearTimeout(videoState.timer);
  // resalta viñetas progresivamente
  if (s.kind === "list") animateBullets(s);
  const advance = () => { if (videoState && videoState.playing) videoNext(true); };
  const RATE = 0.8; // narración pausada
  if (window.speechSynthesis) {
    try { speechSynthesis.cancel(); } catch (e) {}
    const u = new SpeechSynthesisUtterance(s.narration);
    u.lang = "es-MX"; u.rate = RATE; u.pitch = 1;
    const voices = speechSynthesis.getVoices();
    // prioriza voz de español mexicano; si no hay, cae a latinoamérica y luego a cualquier español
    const v = voices.find(x => /es[-_]?MX/i.test(x.lang) || /mexic|paulina|juan|angelica/i.test(x.name))
      || voices.find(x => /es[-_]?(419|US|CO|CL|AR)/i.test(x.lang))
      || voices.find(x => /^es/i.test(x.lang));
    if (v) u.voice = v;
    u.onend = advance;
    videoState._u = u;
    speechSynthesis.speak(u);
    // respaldo por si no hay motor de voz audible: avanza por tiempo estimado (ajustado a la velocidad)
    const est = Math.max(4000, (s.narration.split(/\s+/).length / 2.6 * 1000) / RATE + 800);
    videoState.timer = setTimeout(() => { if (videoState && videoState.playing && (!speechSynthesis.speaking)) advance(); }, est);
  } else {
    const est = Math.max(4000, (s.narration.split(/\s+/).length / 2.6 * 1000) / RATE);
    videoState.timer = setTimeout(advance, est);
  }
}
function animateBullets(s) {
  videoState.spokenIdx = -1;
  const total = s.items.length;
  const per = Math.max(1500, ((s.narration.split(/\s+/).length / 2.6 * 1000) / 0.8) / (total + 1));
  let k = 0;
  const step = () => {
    if (!videoState || videoState.slides[videoState.i] !== s || !videoState.playing) return;
    videoState.spokenIdx = k;
    const li = el("v-li-" + k); if (li) li.classList.add("spoken");
    k++;
    if (k < total) videoState._bulletT = setTimeout(step, per);
  };
  step();
}
function videoToggle() {
  if (!videoState) return;
  videoState.playing = !videoState.playing;
  if (videoState.playing) { renderSlide(); speakSlide(); }
  else { try { speechSynthesis && speechSynthesis.cancel(); } catch (e) {} clearTimeout(videoState.timer); clearTimeout(videoState._bulletT); el("v-play").textContent = "▶"; }
}
function videoNext(auto) {
  if (!videoState) return;
  clearTimeout(videoState.timer); clearTimeout(videoState._bulletT);
  if (videoState.i < videoState.slides.length - 1) {
    videoState.i++; videoState.spokenIdx = -1; renderSlide();
    if (videoState.playing) speakSlide();
  } else {
    videoState.playing = false; renderSlide();
    if (auto) toast("Video finalizado 🎬");
  }
}
function videoSeek(dir) {
  if (!videoState) return;
  clearTimeout(videoState.timer); clearTimeout(videoState._bulletT);
  try { speechSynthesis && speechSynthesis.cancel(); } catch (e) {}
  videoState.i = Math.max(0, Math.min(videoState.slides.length - 1, videoState.i + dir));
  videoState.spokenIdx = -1; renderSlide();
  if (videoState.playing) speakSlide();
}
function stopVideo() {
  if (!videoState) return;
  clearTimeout(videoState.timer); clearTimeout(videoState._bulletT);
  try { speechSynthesis && speechSynthesis.cancel(); } catch (e) {}
  videoState = null;
}
function editLesson(cid, lid) {
  const l = lid ? DB.lessons.find(x => x.id === lid) : { title: "", mins: 20, body: "" };
  openModal(`<h3>${lid ? "Editar" : "Nueva"} lección</h3>
    <div class="field"><label>Título</label><input id="le-title" value="${esc(l.title)}"></div>
    <div class="field"><label>Duración (min)</label><input id="le-mins" type="number" value="${l.mins}"></div>
    <div class="field"><label>Contenido (acepta HTML)</label><textarea id="le-body">${esc(l.body)}</textarea></div>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="saveLesson('${cid}','${lid || ""}')">Guardar</button></div>`);
}
function saveLesson(cid, lid) {
  const title = el("le-title").value.trim(); if (!title) return toast("Poné un título");
  const body = el("le-body").value, mins = +el("le-mins").value || 15;
  if (lid) { const l = DB.lessons.find(x => x.id === lid); Object.assign(l, { title, body, mins }); }
  else DB.lessons.push({ id: uid("l"), course: cid, title, body, mins });
  saveDB(); closeModal(); renderView(); toast("Lección guardada");
}

/* ---------- entregas de tareas (estudiante) ---------- */
function openSubmit(aid) {
  const a = DB.assignments.find(x => x.id === aid);
  openModal(`<h3>📝 ${esc(a.title)}</h3>
    <p style="color:var(--text-soft);font-size:.88rem;margin-bottom:14px">${esc(a.desc)}<br>Vence: ${fmtDate(a.due)} · ${a.points} pts</p>
    <div class="field"><label>Tu respuesta / entrega</label><textarea id="sub-text" placeholder="Escribí tu respuesta o el enlace a tu trabajo..."></textarea></div>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-accent" onclick="submitAsg('${aid}')">Entregar</button></div>`);
}
function submitAsg(aid) {
  const text = el("sub-text").value.trim(); if (!text) return toast("Escribí tu entrega");
  const ex = submission(aid, session);
  if (ex) { ex.text = text; ex.date = today(); }
  else DB.submissions.push({ id: uid("s"), assignment: aid, student: session, text, date: today(), grade: null, feedback: "" });
  saveDB(); closeModal(); renderView(); toast("¡Entrega enviada! ✅");
}

/* ---------- corrección (docente) ---------- */
function openGrading(aid) {
  const a = DB.assignments.find(x => x.id === aid);
  const studs = courseStudents(a.course);
  const rows = studs.map(s => {
    const sub = submission(aid, s.id);
    return `<div class="card" style="margin-bottom:12px;padding:16px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <div class="avatar" style="background:${s.color};width:32px;height:32px;font-size:.8rem">${initials(s.name)}</div>
        <b>${esc(s.name)}</b>
        ${sub ? `<span class="pill info" style="margin-left:auto">Entregó ${fmtDate(sub.date)}</span>` : `<span class="pill bad" style="margin-left:auto">Sin entrega</span>`}
      </div>
      ${sub ? `<div style="background:var(--bg);padding:10px;border-radius:8px;font-size:.86rem;margin-bottom:10px">${esc(sub.text)}</div>
        <div style="display:flex;gap:8px;align-items:flex-end">
          <div class="field" style="width:90px;margin:0"><label>Nota /10</label><input id="gr-${s.id}" type="number" min="0" max="10" value="${sub.grade != null ? sub.grade : ""}"></div>
          <div class="field" style="flex:1;margin:0"><label>Devolución</label><input id="fb-${s.id}" value="${esc(sub.feedback || "")}"></div>
          <button class="btn btn-primary btn-sm" onclick="saveGrade('${aid}','${s.id}')">Guardar</button>
        </div>` : ""}
    </div>`;
  }).join("");
  openModal(`<h3>Corregir: ${esc(a.title)}</h3>${rows || "<div class='empty'>Sin estudiantes.</div>"}
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Cerrar</button></div>`);
}
function saveGrade(aid, sid) {
  const g = el("gr-" + sid).value, fb = el("fb-" + sid).value;
  const sub = submission(aid, sid); if (!sub) return;
  sub.grade = g === "" ? null : Math.max(0, Math.min(10, +g)); sub.feedback = fb;
  saveDB(); toast("Nota guardada para " + user(sid).name.split(" ")[0]);
}

/* ---------- quiz autocorregible ---------- */
let quizState = null;
function startQuiz(qid) {
  const q = DB.quizzes.find(x => x.id === qid);
  quizState = { qid, answers: {} };
  renderQuiz(q);
}
function renderQuiz(q) {
  openModal(`<h3>🧩 ${esc(q.title)}</h3>
    ${q.questions.map((qq, i) => `
      <div class="quiz-q">
        <div class="qt">${i + 1}. ${esc(qq.q)}</div>
        ${qq.opts.map((o, j) => `
          <label class="quiz-opt"><input type="radio" name="q${i}" value="${j}" onchange="quizState.answers[${i}]=${j}"> <span>${esc(o)}</span></label>`).join("")}
      </div>`).join("")}
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-accent" onclick="submitQuiz('${q.id}')">Corregir</button></div>`);
}
function submitQuiz(qid) {
  const q = DB.quizzes.find(x => x.id === qid);
  let correct = 0;
  q.questions.forEach((qq, i) => { if (quizState.answers[i] === qq.correct) correct++; });
  const pct = Math.round(correct / q.questions.length * 100);
  const nota = (correct / q.questions.length * 10).toFixed(1);
  const emoji = pct >= 60 ? "🎉" : "💪";
  openModal(`<h3>Resultado</h3>
    <div class="score-big" style="color:${pct >= 60 ? "var(--ok)" : "var(--warn)"}">${nota}/10</div>
    <p style="text-align:center;color:var(--text-soft);margin:6px 0 16px">${correct} de ${q.questions.length} correctas ${emoji}</p>
    ${q.questions.map((qq, i) => {
      const ok = quizState.answers[i] === qq.correct;
      return `<div class="list-item"><span>${ok ? "✅" : "❌"}</span>
        <div class="grow"><div class="t" style="font-size:.86rem">${esc(qq.q)}</div>
        <div class="s">Correcta: ${esc(qq.opts[qq.correct])}</div></div></div>`;
    }).join("")}
    <div class="modal-actions"><button class="btn btn-primary" onclick="closeModal()">Finalizar</button></div>`);
}

/* ============================================================
   TAREAS (vista global)
============================================================ */
function viewAssignments(c) {
  const cs = myCourses();
  const asgs = DB.assignments.filter(a => cs.some(cc => cc.id === a.course)).sort((a, b) => a.due.localeCompare(b.due));
  c.innerHTML = `<div class="section-head"><h2>Tareas</h2></div>
    <div class="card">${asgs.map(a => asgRow(a)).join("") || "<div class='empty'><span class='e'>📝</span>No hay tareas.</div>"}</div>`;
}

/* ============================================================
   CALENDARIO
============================================================ */
let calDate = new Date();
function viewCalendar(c) {
  const cs = myCourses().map(x => x.id);
  const y = calDate.getFullYear(), m = calDate.getMonth();
  const first = new Date(y, m, 1); const startDow = (first.getDay() + 6) % 7; // lunes=0
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const monthName = calDate.toLocaleDateString("es", { month: "long", year: "numeric" });
  const dows = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  // eventos (incl. vencimientos de tareas) del mes visibles para el usuario
  const evs = DB.events.filter(e => cs.includes(e.course));
  const dueEvs = DB.assignments.filter(a => cs.includes(a.course)).map(a => ({ date: a.due, title: "📌 " + a.title, course: a.course, type: "entrega" }));
  const all = [...evs, ...dueEvs];

  let cells = "";
  for (let i = 0; i < startDow; i++) cells += `<div class="cal-cell other"></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const ds = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const dayEvs = all.filter(e => e.date === ds);
    const isToday = ds === today();
    cells += `<div class="cal-cell ${isToday ? "today" : ""}">
      <div class="d">${d}</div>
      ${dayEvs.slice(0, 3).map(e => `<span class="cal-ev ${e.type === "entrega" ? "due" : ""}" title="${esc(e.title)}">${esc(e.title.replace("📌 ", ""))}</span>`).join("")}
    </div>`;
  }

  const canAdd = me().role !== "estudiante";
  c.innerHTML = `
    <div class="card">
      <div class="cal-head">
        <button class="icon-btn" onclick="calMove(-1)">‹</button>
        <h3>${monthName}</h3>
        <div style="display:flex;gap:8px">
          <button class="icon-btn" onclick="calMove(1)">›</button>
          ${canAdd ? `<button class="btn btn-primary btn-sm" onclick="editEvent()">+ Evento</button>` : ""}
        </div>
      </div>
      <div class="cal-grid">${dows.map(d => `<div class="cal-dow">${d}</div>`).join("")}${cells}</div>
    </div>`;
}
function calMove(n) { calDate.setMonth(calDate.getMonth() + n); renderView(); }
function editEvent() {
  const cs = myCourses();
  openModal(`<h3>Nuevo evento</h3>
    <div class="field"><label>Título</label><input id="ev-title"></div>
    <div class="field"><label>Fecha</label><input id="ev-date" type="date" value="${today()}"></div>
    <div class="field"><label>Curso</label><select id="ev-course">${cs.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select></div>
    <div class="field"><label>Tipo</label><select id="ev-type"><option value="clase">Clase</option><option value="entrega">Entrega</option><option value="examen">Examen</option></select></div>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="saveEvent()">Guardar</button></div>`);
}
function saveEvent() {
  const title = el("ev-title").value.trim(); if (!title) return toast("Poné un título");
  DB.events.push({ id: uid("e"), title, date: el("ev-date").value, course: el("ev-course").value, type: el("ev-type").value });
  saveDB(); closeModal(); renderView(); toast("Evento agregado");
}

/* ============================================================
   MENSAJES
============================================================ */
let msgSel = null;
function viewMessages(c) {
  const inbox = DB.messages.filter(m => m.to === session).sort((a, b) => b.date.localeCompare(a.date));
  if (!msgSel && inbox[0]) msgSel = inbox[0].id;
  const sel = DB.messages.find(m => m.id === msgSel);
  c.innerHTML = `
    <div class="section-head"><h2>Mensajes</h2><button class="btn btn-primary btn-sm" onclick="composeMsg()">✉️ Redactar</button></div>
    <div class="msg-layout">
      <div class="card" style="padding:8px">
        ${inbox.map(m => `
          <div class="list-item msg-item ${m.read ? "" : "unread"} ${m.id === msgSel ? "sel" : ""}" onclick="selMsg('${m.id}')">
            <div class="avatar" style="background:${user(m.from).color};width:34px;height:34px;font-size:.78rem">${initials(user(m.from).name)}</div>
            <div class="grow"><div class="t" style="font-size:.86rem">${esc(m.subject)}</div>
              <div class="s">${user(m.from).name} · ${fmtDate(m.date.slice(0, 10))}</div></div>
          </div>`).join("") || "<div class='empty'>Bandeja vacía.</div>"}
      </div>
      <div class="card">
        ${sel ? `
          <h3>${esc(sel.subject)}</h3>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;color:var(--text-soft);font-size:.85rem">
            <div class="avatar" style="background:${user(sel.from).color};width:34px;height:34px;font-size:.78rem">${initials(user(sel.from).name)}</div>
            <div>De <b>${user(sel.from).name}</b><br>${fmtDate(sel.date.slice(0, 10))}</div>
          </div>
          <p style="line-height:1.6">${esc(sel.body)}</p>
          <div class="modal-actions"><button class="btn btn-primary btn-sm" onclick="composeMsg('${sel.from}','Re: ${esc(sel.subject)}')">Responder</button></div>
        ` : "<div class='empty'><span class='e'>✉️</span>Seleccioná un mensaje.</div>"}
      </div>
    </div>`;
}
function selMsg(id) { msgSel = id; const m = DB.messages.find(x => x.id === id); if (m && !m.read) { m.read = true; saveDB(); } renderApp(); }
function composeMsg(to, subject) {
  const people = DB.users.filter(u => u.id !== session);
  openModal(`<h3>Nuevo mensaje</h3>
    <div class="field"><label>Para</label><select id="mc-to">${people.map(p => `<option value="${p.id}" ${p.id === to ? "selected" : ""}>${p.name} (${p.role})</option>`).join("")}</select></div>
    <div class="field"><label>Asunto</label><input id="mc-subj" value="${esc(subject || "")}"></div>
    <div class="field"><label>Mensaje</label><textarea id="mc-body"></textarea></div>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="sendMsg()">Enviar</button></div>`);
}
function sendMsg() {
  const to = el("mc-to").value, subject = el("mc-subj").value.trim(), body = el("mc-body").value.trim();
  if (!subject || !body) return toast("Completá asunto y mensaje");
  DB.messages.push({ id: uid("m"), from: session, to, subject, body, date: new Date().toISOString().slice(0, 16), read: false });
  saveDB(); closeModal(); toast("Mensaje enviado ✉️");
}

/* ============================================================
   NOTAS (estudiante)
============================================================ */
function viewGrades(c) {
  const grades = DB.submissions.filter(s => s.student === session);
  const rows = grades.map(s => {
    const a = DB.assignments.find(x => x.id === s.assignment);
    return `<tr><td><b>${esc(a.title)}</b></td><td>${course(a.course).name}</td>
      <td>${s.grade != null ? `<span class="pill ${s.grade >= 6 ? "ok" : "bad"}">${s.grade}/10</span>` : `<span class="pill warn">Pendiente</span>`}</td>
      <td style="color:var(--text-soft)">${esc(s.feedback || "—")}</td></tr>`;
  }).join("");
  const graded = grades.filter(s => s.grade != null);
  const avg = graded.length ? (graded.reduce((a, s) => a + s.grade, 0) / graded.length).toFixed(2) : "—";
  c.innerHTML = `
    <div class="grid grid-4" style="margin-bottom:20px">
      ${statCard("📊", "#14b8a6", avg, "Promedio general")}
      ${statCard("✅", "#2fae72", graded.filter(s => s.grade >= 6).length, "Aprobadas")}
      ${statCard("📝", "#e8a13c", grades.length, "Entregas totales")}
    </div>
    <div class="card"><h3>Detalle de calificaciones</h3>
      <table class="tbl"><thead><tr><th>Tarea</th><th>Curso</th><th>Nota</th><th>Devolución</th></tr></thead>
      <tbody>${rows || "<tr><td colspan='4' class='empty'>Sin calificaciones aún.</td></tr>"}</tbody></table>
    </div>`;
}

/* ============================================================
   CALIFICACIONES (docente) — libro de notas
============================================================ */
function viewGradebook(c) {
  const cs = myCourses();
  let sel = viewArg && cs.find(x => x.id === viewArg) ? viewArg : cs[0] && cs[0].id;
  if (!sel) { c.innerHTML = "<div class='empty'>Sin cursos.</div>"; return; }
  const cc = course(sel);
  const asgs = assignmentsFor(sel);
  const studs = courseStudents(sel);
  const head = asgs.map(a => `<th title="${esc(a.title)}">${esc(a.title.slice(0, 14))}</th>`).join("");
  const rows = studs.map(s => {
    const cells = asgs.map(a => {
      const sub = submission(a.id, s.id);
      if (!sub) return `<td style="color:var(--text-soft)">·</td>`;
      if (sub.grade == null) return `<td><span class="pill warn">—</span></td>`;
      return `<td><span class="pill ${sub.grade >= 6 ? "ok" : "bad"}">${sub.grade}</span></td>`;
    }).join("");
    const gs = asgs.map(a => submission(a.id, s.id)).filter(x => x && x.grade != null);
    const avg = gs.length ? (gs.reduce((t, x) => t + x.grade, 0) / gs.length).toFixed(1) : "—";
    return `<tr><td><b>${esc(s.name)}</b></td>${cells}<td><b>${avg}</b></td></tr>`;
  }).join("");
  c.innerHTML = `
    <div class="section-head"><h2>Libro de calificaciones</h2></div>
    <div class="tabs">${cs.map(x => `<button class="tab ${x.id === sel ? "active" : ""}" onclick="go('gradebook','${x.id}')">${x.icon} ${x.name}</button>`).join("")}</div>
    <div class="card" style="overflow-x:auto">
      <table class="tbl"><thead><tr><th>Estudiante</th>${head}<th>Prom.</th></tr></thead>
      <tbody>${rows || "<tr><td class='empty'>Sin estudiantes.</td></tr>"}</tbody></table>
      <p style="font-size:.8rem;color:var(--text-soft);margin-top:12px">Tip: usá el botón “Corregir” en cada tarea para cargar notas y devoluciones.</p>
    </div>`;
}

/* ============================================================
   ASISTENCIA (docente)
============================================================ */
let attCourse = null, attDate = today();
function viewAttendance(c) {
  const cs = myCourses();
  if (!attCourse || !cs.find(x => x.id === attCourse)) attCourse = cs[0] && cs[0].id;
  if (!attCourse) { c.innerHTML = "<div class='empty'>Sin cursos.</div>"; return; }
  const studs = courseStudents(attCourse);
  const rows = studs.map(s => {
    const rec = DB.attendance.find(a => a.course === attCourse && a.date === attDate && a.student === s.id);
    const st = rec ? rec.status : "";
    const b = (code, label) => `<button class="att-btn ${code} ${st === code ? "on" : ""}" onclick="setAtt('${s.id}','${code}')">${label}</button>`;
    return `<tr><td><div style="display:flex;align-items:center;gap:10px"><div class="avatar" style="background:${s.color};width:30px;height:30px;font-size:.72rem">${initials(s.name)}</div>${esc(s.name)}</div></td>
      <td><div style="display:flex;gap:6px">${b("P", "P")}${b("T", "T")}${b("A", "A")}</div></td></tr>`;
  }).join("");
  c.innerHTML = `
    <div class="section-head"><h2>Asistencia</h2></div>
    <div class="card" style="margin-bottom:16px;display:flex;gap:16px;flex-wrap:wrap;align-items:flex-end">
      <div class="field" style="margin:0"><label>Curso</label><select onchange="attCourse=this.value;renderView()">
        ${cs.map(x => `<option value="${x.id}" ${x.id === attCourse ? "selected" : ""}>${x.name}</option>`).join("")}</select></div>
      <div class="field" style="margin:0"><label>Fecha</label><input type="date" value="${attDate}" onchange="attDate=this.value;renderView()"></div>
      <div style="font-size:.82rem;color:var(--text-soft)">P = Presente · T = Tarde · A = Ausente</div>
    </div>
    <div class="card"><table class="tbl"><thead><tr><th>Estudiante</th><th>Estado</th></tr></thead>
      <tbody>${rows || "<tr><td class='empty'>Sin estudiantes.</td></tr>"}</tbody></table></div>`;
}
function setAtt(sid, code) {
  const rec = DB.attendance.find(a => a.course === attCourse && a.date === attDate && a.student === sid);
  if (rec) rec.status = code;
  else DB.attendance.push({ date: attDate, course: attCourse, student: sid, status: code });
  saveDB(); renderView();
}

/* ============================================================
   PRE-LABORAL (estudiante)
============================================================ */
function prelaborData() {
  if (!DB.prelabor[session]) DB.prelabor[session] = { cv: { headline: "", summary: "", experience: "", education: "" }, skills: [], goals: [] };
  return DB.prelabor[session];
}
let preTab = "cv";
function viewPrelabor(c) {
  const d = prelaborData();
  let body = "";
  if (preTab === "cv") {
    body = `<div class="card">
      <h3>📄 Mi Currículum Vitae</h3>
      <div class="field"><label>Titular profesional</label><input id="cv-headline" value="${esc(d.cv.headline)}" placeholder="Ej: Estudiante orientado a la tecnología"></div>
      <div class="field"><label>Perfil personal</label><textarea id="cv-summary" placeholder="2-3 líneas sobre vos...">${esc(d.cv.summary)}</textarea></div>
      <div class="field"><label>Experiencia</label><textarea id="cv-exp">${esc(d.cv.experience)}</textarea></div>
      <div class="field"><label>Formación</label><textarea id="cv-edu">${esc(d.cv.education)}</textarea></div>
      <button class="btn btn-primary" onclick="saveCV()">Guardar CV</button>
      <button class="btn btn-ghost" onclick="previewCV()">👁️ Vista previa</button>
    </div>`;
  } else if (preTab === "skills") {
    body = `<div class="card"><h3>🧭 Mis habilidades</h3>
      ${d.skills.map((s, i) => `
        <div class="skill-row">
          <div class="sk-head"><span>${esc(s.name)}</span><span>${s.level}%</span></div>
          <div class="skill-bar"><div class="skill-fill" style="width:${s.level}%"></div></div>
          <input type="range" min="0" max="100" value="${s.level}" oninput="updSkill(${i},this.value)">
        </div>`).join("") || "<div class='empty'>Agregá tus habilidades.</div>"}
      <div style="display:flex;gap:8px;margin-top:14px">
        <input id="new-skill" placeholder="Nueva habilidad..." style="flex:1;padding:9px 12px;border:1.5px solid var(--border);border-radius:9px;background:var(--bg)">
        <button class="btn btn-accent btn-sm" onclick="addSkill()">+ Agregar</button>
      </div></div>`;
  } else if (preTab === "goals") {
    const done = d.goals.filter(g => g.done).length;
    body = `<div class="card"><h3>🎯 Mis objetivos</h3>
      <div class="progress" style="margin-bottom:16px"><div class="fill" style="width:${d.goals.length ? done / d.goals.length * 100 : 0}%"></div></div>
      ${d.goals.map(g => `
        <div class="list-item"><input type="checkbox" ${g.done ? "checked" : ""} onchange="toggleGoal('${g.id}')" style="width:20px;height:20px;accent-color:var(--brand)">
          <div class="grow"><div class="t" style="${g.done ? "text-decoration:line-through;color:var(--text-soft)" : ""}">${esc(g.text)}</div></div>
          <button class="icon-btn" onclick="delGoal('${g.id}')">🗑️</button></div>`).join("") || "<div class='empty'>Sin objetivos.</div>"}
      <div style="display:flex;gap:8px;margin-top:14px">
        <input id="new-goal" placeholder="Nuevo objetivo..." style="flex:1;padding:9px 12px;border:1.5px solid var(--border);border-radius:9px;background:var(--bg)">
        <button class="btn btn-accent btn-sm" onclick="addGoal()">+ Agregar</button>
      </div></div>`;
  }
  c.innerHTML = `
    <div style="margin-bottom:16px"><h2 style="font-size:1.3rem">💼 Módulo Pre-Laboral</h2>
      <p style="color:var(--text-soft)">Prepará tu ingreso al mundo del trabajo: CV, habilidades y objetivos.</p></div>
    <div class="tabs">
      <button class="tab ${preTab === "cv" ? "active" : ""}" onclick="preTab='cv';renderView()">📄 Currículum</button>
      <button class="tab ${preTab === "skills" ? "active" : ""}" onclick="preTab='skills';renderView()">🧭 Habilidades</button>
      <button class="tab ${preTab === "goals" ? "active" : ""}" onclick="preTab='goals';renderView()">🎯 Objetivos</button>
    </div>${body}`;
}
function saveCV() {
  const d = prelaborData();
  d.cv = { headline: el("cv-headline").value, summary: el("cv-summary").value, experience: el("cv-exp").value, education: el("cv-edu").value };
  saveDB(); toast("CV guardado 📄");
}
function previewCV() {
  const d = prelaborData(); const u = me();
  openModal(`<div style="border-bottom:3px solid var(--brand);padding-bottom:12px;margin-bottom:14px">
      <h3 style="font-size:1.5rem;margin:0">${esc(u.name)}</h3>
      <div style="color:var(--brand);font-weight:600">${esc(d.cv.headline || "—")}</div>
      <div style="color:var(--text-soft);font-size:.82rem">${esc(u.email)} · ${u.grade || ""}</div>
    </div>
    <p style="font-style:italic;margin-bottom:14px">${esc(d.cv.summary || "")}</p>
    <b>Experiencia</b><p style="margin:4px 0 12px;color:var(--text-soft)">${esc(d.cv.experience || "—")}</p>
    <b>Formación</b><p style="margin:4px 0 12px;color:var(--text-soft)">${esc(d.cv.education || "—")}</p>
    <b>Habilidades</b><div style="margin-top:6px">${d.skills.map(s => `<span class="tag sec" style="margin:2px 4px 2px 0">${esc(s.name)}</span>`).join("") || "—"}</div>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Cerrar</button>
      <button class="btn btn-accent" onclick="downloadCV()">📄 Descargar PDF</button></div>`);
}
function downloadCV() {
  const d = prelaborData(), u = me();
  const skills = d.skills.map(s => `<li><b>${esc(s.name)}</b> — ${s.level}%</li>`).join("");
  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>CV — ${esc(u.name)}</title>
    <style>
      *{box-sizing:border-box} body{font-family:"Segoe UI",system-ui,sans-serif;color:#23263b;max-width:720px;margin:0 auto;padding:40px}
      .head{border-bottom:4px solid #5b4fc4;padding-bottom:14px;margin-bottom:22px}
      .head h1{margin:0;font-size:30px} .role{color:#5b4fc4;font-weight:600;font-size:16px}
      .contact{color:#6b7086;font-size:13px;margin-top:4px}
      h2{font-size:15px;text-transform:uppercase;letter-spacing:1px;color:#5b4fc4;border-bottom:1px solid #e3e5ef;padding-bottom:4px;margin:22px 0 8px}
      p{margin:4px 0;line-height:1.55} ul{margin:6px 0 0 18px} li{margin-bottom:3px}
      .summary{font-style:italic;color:#3a3d55}
      @media print{body{padding:20px} .noprint{display:none}}
      .noprint{text-align:center;margin-bottom:20px}
      .btn{background:#5b4fc4;color:#fff;border:none;padding:10px 22px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer}
    </style></head><body>
    <div class="noprint"><button class="btn" onclick="window.print()">🖨️ Guardar como PDF / Imprimir</button></div>
    <div class="head"><h1>${esc(u.name)}</h1><div class="role">${esc(d.cv.headline || "")}</div>
      <div class="contact">${esc(u.email)}${u.grade ? " · " + esc(u.grade) : ""} · Brain Schooling</div></div>
    ${d.cv.summary ? `<h2>Perfil</h2><p class="summary">${esc(d.cv.summary)}</p>` : ""}
    ${d.cv.experience ? `<h2>Experiencia</h2><p>${esc(d.cv.experience).replace(/\n/g, "<br>")}</p>` : ""}
    ${d.cv.education ? `<h2>Formación</h2><p>${esc(d.cv.education).replace(/\n/g, "<br>")}</p>` : ""}
    ${skills ? `<h2>Habilidades</h2><ul>${skills}</ul>` : ""}
    </body></html>`;
  const w = window.open("", "_blank");
  if (!w) { toast("Permití las ventanas emergentes para descargar el PDF"); return; }
  w.document.write(html); w.document.close();
  setTimeout(() => { try { w.print(); } catch (e) {} }, 350);
}
function updSkill(i, v) { prelaborData().skills[i].level = +v; saveDB(); renderView(); }
function addSkill() { const n = el("new-skill").value.trim(); if (!n) return; prelaborData().skills.push({ name: n, level: 50 }); saveDB(); renderView(); }
function addGoal() { const n = el("new-goal").value.trim(); if (!n) return; prelaborData().goals.push({ id: uid("g"), text: n, done: false }); saveDB(); renderView(); }
function toggleGoal(id) { const g = prelaborData().goals.find(x => x.id === id); g.done = !g.done; saveDB(); renderView(); }
function delGoal(id) { const d = prelaborData(); d.goals = d.goals.filter(x => x.id !== id); saveDB(); renderView(); }

/* ============================================================
   ORIENTACIÓN UNIVERSITARIA (DEMRE / PAES / becas)
============================================================ */
let uniTab = "info";
const PAES_FACTORS = [
  { id: "nem", name: "NEM (Notas de Enseñanza Media)", w: 20 },
  { id: "rank", name: "Ranking de Notas", w: 20 },
  { id: "cl", name: "Competencia Lectora", w: 30 },
  { id: "m1", name: "Competencia Matemática 1 (M1)", w: 30 },
  { id: "m2", name: "Competencia Matemática 2 (M2)", w: 0 },
  { id: "cien", name: "Ciencias (electiva)", w: 0 },
  { id: "hist", name: "Historia y Cs. Sociales (electiva)", w: 0 },
];
const PAES_PRESETS = {
  ingenieria: { nem: 20, rank: 20, cl: 10, m1: 30, m2: 20, cien: 0, hist: 0 },
  salud: { nem: 20, rank: 25, cl: 15, m1: 15, m2: 0, cien: 25, hist: 0 },
  humanista: { nem: 20, rank: 20, cl: 30, m1: 10, m2: 0, cien: 0, hist: 20 },
  general: { nem: 20, rank: 20, cl: 30, m1: 30, m2: 0, cien: 0, hist: 0 },
};
const BECAS = [
  { ic: "🆓", name: "Gratuidad", who: "60% de menores ingresos del país", covers: "Matrícula y arancel regulado completo de la carrera (universidad, IP o CFT acreditados).", tag: "ok" },
  { ic: "🎓", name: "Beca Bicentenario", who: "70% de menores ingresos · universidades del CRUCH", covers: "Arancel de referencia anual de la carrera universitaria.", tag: "info" },
  { ic: "📗", name: "Beca Juan Gómez Millas", who: "70% de menores ingresos · ≥ 510 pts promedio PAES obligatorias", covers: "Hasta ~$1.150.000 del arancel anual.", tag: "info" },
  { ic: "🔧", name: "Beca Nuevo Milenio", who: "70% de menores ingresos · carreras Técnico-Profesionales (CFT/IP)", covers: "Hasta ~$860.000 del arancel anual según decil.", tag: "info" },
  { ic: "🍎", name: "Beca Vocación de Profesor", who: "Estudiantes de Pedagogía · puntaje PAES destacado (desde ~595 pts)", covers: "Matrícula + arancel completo (y más beneficios según puntaje).", tag: "info" },
  { ic: "⭐", name: "Beca de Excelencia Académica (BEA)", who: "10% de mejores egresados de su establecimiento · 80% menores ingresos", covers: "Hasta ~$1.150.000 del arancel anual.", tag: "info" },
  { ic: "💳", name: "Crédito con Aval del Estado (CAE)", who: "Estudiantes con necesidad de financiamiento", covers: "Crédito para financiar el arancel; se paga una vez egresado.", tag: "warn" },
];
function viewUniversity(c) {
  let body = "";
  if (uniTab === "info") body = uniInfo();
  else if (uniTab === "pruebas") body = uniPruebas();
  else if (uniTab === "calc") body = uniCalc();
  else if (uniTab === "becas") body = uniBecas();
  c.innerHTML = `
    <div style="margin-bottom:16px"><h2 style="font-size:1.3rem">🎓 Orientación Universitaria</h2>
      <p style="color:var(--text-soft)">Prepará tu ingreso a la educación superior: PAES (DEMRE), ponderación de puntajes y becas.</p></div>
    <div class="tabs">
      <button class="tab ${uniTab === "info" ? "active" : ""}" onclick="uniTab='info';renderView()">ℹ️ ¿Qué es la PAES?</button>
      <button class="tab ${uniTab === "pruebas" ? "active" : ""}" onclick="uniTab='pruebas';renderView()">📝 Las pruebas</button>
      <button class="tab ${uniTab === "calc" ? "active" : ""}" onclick="uniTab='calc';renderView()">🧮 Calculadora ponderada</button>
      <button class="tab ${uniTab === "becas" ? "active" : ""}" onclick="uniTab='becas';renderView()">💰 Becas</button>
    </div>${body}`;
  if (uniTab === "calc") calcPaes();
}
function uniInfo() {
  return `<div class="grid grid-2">
    <div class="card"><h3>ℹ️ ¿Qué es la PAES?</h3>
      <p style="font-size:.92rem">La <b>PAES</b> (Prueba de Acceso a la Educación Superior) es el examen que administra el <b>DEMRE</b> (Universidad de Chile) para postular a las universidades del Sistema de Acceso. Reemplazó a la antigua PSU/PDT.</p>
      <ul style="margin:10px 0 0 20px;font-size:.9rem"><li>Los puntajes van de <b>100 a 1.000 puntos</b>.</li><li>Se rinde en papel, una o dos veces al año (proceso regular e invierno).</li><li>Tus puntajes se combinan con tus notas (NEM y Ranking).</li></ul>
    </div>
    <div class="card"><h3>✅ Requisitos para postular</h3>
      <ul style="margin:0 0 0 20px;font-size:.9rem"><li>Rendir las <b>dos pruebas obligatorias</b>: Competencia Lectora y Competencia Matemática 1 (M1).</li><li>Rendir <b>al menos una prueba electiva</b> (Ciencias o Historia y Cs. Sociales).</li><li>Obtener un promedio <b>≥ 458 puntos</b> entre Competencia Lectora y M1 para quedar habilitado/a.</li></ul>
      <div style="margin-top:12px;background:var(--brand-light);border-radius:10px;padding:12px;font-size:.85rem">
        📅 <b>Proceso:</b> inscripción y rendición se gestionan en <b>demre.cl</b>; la postulación a carreras es posterior a conocer los resultados.
      </div>
    </div>
    <div class="card" style="grid-column:1/-1"><h3>🧭 Ruta hacia la universidad</h3>
      <div class="grid grid-4" style="margin-top:4px">
        ${["1️⃣ Inscríbete en DEMRE|Crea tu cuenta y elige tus pruebas", "2️⃣ Prepárate|Estudia con los temarios oficiales", "3️⃣ Rinde la PAES|Pruebas obligatorias + electivas", "4️⃣ Postula y financia|Ordena carreras y postula a becas (FUAS)"].map(s => {
          const [t, d] = s.split("|"); return `<div style="background:var(--bg);border:1px solid var(--border);border-radius:12px;padding:14px"><b style="font-size:.92rem">${t}</b><div style="font-size:.82rem;color:var(--text-soft);margin-top:4px">${d}</div></div>`;
        }).join("")}
      </div>
    </div>
    <div class="card" style="grid-column:1/-1;display:flex;gap:10px;flex-wrap:wrap;align-items:center">
      <b>🔗 Sitios oficiales:</b>
      <a class="btn btn-ghost btn-sm" href="https://demre.cl" target="_blank" rel="noopener">demre.cl</a>
      <a class="btn btn-ghost btn-sm" href="https://portal.beneficiosestudiantiles.cl" target="_blank" rel="noopener">beneficiosestudiantiles.cl</a>
      <a class="btn btn-ghost btn-sm" href="https://fuas.cl" target="_blank" rel="noopener">fuas.cl</a>
      <a class="btn btn-ghost btn-sm" href="https://acceso.mineduc.cl" target="_blank" rel="noopener">acceso.mineduc.cl</a>
    </div>
  </div>`;
}
function uniPruebas() {
  const rows = [
    ["📖 Competencia Lectora", "Obligatoria", "Comprensión y análisis de textos.", "ok"],
    ["🔢 Competencia Matemática 1 (M1)", "Obligatoria", "Matemática de 7° básico a 2° medio.", "ok"],
    ["➗ Competencia Matemática 2 (M2)", "Según carrera", "Matemática de 3° y 4° medio (ingenierías, ciencias).", "warn"],
    ["🔬 Ciencias", "Electiva", "Biología, Física, Química o módulo Técnico-Profesional.", "info"],
    ["🏛️ Historia y Cs. Sociales", "Electiva", "Historia, geografía, economía y formación ciudadana.", "info"],
  ];
  return `<div class="card"><h3>📝 Pruebas de la PAES</h3>
    <table class="tbl"><thead><tr><th>Prueba</th><th>Tipo</th><th>Contenido</th></tr></thead><tbody>
    ${rows.map(r => `<tr><td><b>${r[0]}</b></td><td><span class="pill ${r[3]}">${r[1]}</span></td><td style="color:var(--text-soft)">${r[2]}</td></tr>`).join("")}
    </tbody></table>
    <p style="font-size:.85rem;color:var(--text-soft);margin-top:14px">💡 Debes inscribir las 2 obligatorias y al menos 1 electiva. Rinde <b>M2</b> solo si tu carrera la exige. Los temarios oficiales están en demre.cl.</p>
  </div>
  <div class="card" style="margin-top:16px"><h3>📊 Factores de selección</h3>
    <p style="font-size:.9rem">Tu <b>puntaje ponderado</b> se construye combinando cinco factores; cada universidad y carrera les asigna un porcentaje que suma 100%:</p>
    <div class="grid grid-3" style="margin-top:10px">
      ${[["NEM", "Promedio de notas de 1° a 4° medio, en escala 100-1000."], ["Ranking de Notas", "Premia tu posición relativa respecto a tu colegio."], ["Competencia Lectora", "Puntaje de la prueba obligatoria."], ["Competencia Matemática M1", "Puntaje de la prueba obligatoria."], ["Electiva / M2", "Ciencias, Historia o Matemática 2."], ["Ponderación", "Los % los define cada carrera (NEM y Ranking suelen pesar 10-30% c/u)."]].map(x => `<div style="background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:12px"><b style="font-size:.88rem">${x[0]}</b><div style="font-size:.8rem;color:var(--text-soft);margin-top:3px">${x[1]}</div></div>`).join("")}
    </div>
  </div>`;
}
function uniCalc() {
  return `<div class="card"><h3>🧮 Calculadora de puntaje ponderado</h3>
    <p style="font-size:.88rem;color:var(--text-soft);margin-bottom:12px">Ingresá tu puntaje en cada factor (100-1000) y el porcentaje de ponderación que le da la carrera. El total de ponderaciones debe sumar 100%.</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
      <span style="font-size:.82rem;font-weight:700;color:var(--text-soft);align-self:center">Ejemplos:</span>
      <button class="btn btn-ghost btn-sm" onclick="setPaesPreset('general')">General</button>
      <button class="btn btn-ghost btn-sm" onclick="setPaesPreset('ingenieria')">Ingeniería</button>
      <button class="btn btn-ghost btn-sm" onclick="setPaesPreset('salud')">Salud</button>
      <button class="btn btn-ghost btn-sm" onclick="setPaesPreset('humanista')">Humanista</button>
    </div>
    <table class="tbl"><thead><tr><th>Factor</th><th style="width:130px">Ponderación %</th><th style="width:130px">Puntaje</th></tr></thead><tbody>
      ${PAES_FACTORS.map(f => `<tr>
        <td><b>${f.name}</b></td>
        <td><input id="pw-${f.id}" type="number" min="0" max="100" value="${f.w}" oninput="calcPaes()" style="width:100%;padding:7px 9px;border:1.5px solid var(--border);border-radius:8px;background:var(--bg)"></td>
        <td><input id="pp-${f.id}" type="number" min="100" max="1000" placeholder="—" oninput="calcPaes()" style="width:100%;padding:7px 9px;border:1.5px solid var(--border);border-radius:8px;background:var(--bg)"></td>
      </tr>`).join("")}
    </tbody></table>
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:18px;background:var(--brand-light);border-radius:12px;padding:16px 20px">
      <div>Total ponderación: <span id="paes-sum" class="pill">0%</span></div>
      <div style="text-align:right"><div style="font-size:.8rem;color:var(--text-soft)">Puntaje ponderado</div><div id="paes-pond" class="score-big" style="color:var(--brand);line-height:1">0</div></div>
    </div>
    <p style="font-size:.8rem;color:var(--text-soft);margin-top:10px">ℹ️ Cálculo referencial. Cada carrera fija sus ponderaciones y puntajes mínimos; confirmá en el sitio de cada universidad y en demre.cl.</p>
  </div>`;
}
function setPaesPreset(key) {
  const p = PAES_PRESETS[key];
  PAES_FACTORS.forEach(f => { const w = el("pw-" + f.id); if (w) w.value = p[f.id]; });
  calcPaes(); toast("Ejemplo aplicado: ajustá tus puntajes");
}
function calcPaes() {
  let wsum = 0, acc = 0;
  PAES_FACTORS.forEach(f => {
    const w = parseFloat((el("pw-" + f.id) || {}).value) || 0;
    const p = parseFloat((el("pp-" + f.id) || {}).value) || 0;
    wsum += w; acc += w * p;
  });
  const sumEl = el("paes-sum"), pondEl = el("paes-pond");
  if (!sumEl || !pondEl) return;
  sumEl.textContent = Math.round(wsum) + "%";
  sumEl.className = "pill " + (Math.round(wsum) === 100 ? "ok" : "warn");
  pondEl.textContent = Math.round(acc / 100);
}
function uniBecas() {
  return `<div class="card" style="margin-bottom:16px;background:var(--accent-light);border:none">
      <b>💰 ¿Cómo se postula?</b>
      <p style="font-size:.88rem;margin-top:4px">La mayoría de las becas y la Gratuidad se solicitan completando el <b>FUAS</b> (Formulario Único de Acreditación Socioeconómica) en <b>fuas.cl</b>, dentro del plazo que fija el Mineduc. La asignación depende de tus ingresos familiares, tu rendimiento y tu puntaje PAES.</p>
    </div>
    <div class="grid grid-2">
    ${BECAS.map(b => `<div class="card">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><div class="stat-ico" style="width:42px;height:42px;font-size:1.2rem;background:var(--brand-light)">${b.ic}</div><h3 style="margin:0">${b.name}</h3></div>
      <div style="font-size:.8rem"><span class="pill ${b.tag}">Dirigida a</span> <span style="color:var(--text-soft)">${b.who}</span></div>
      <p style="font-size:.88rem;margin-top:8px">${b.covers}</p>
    </div>`).join("")}
    </div>
    <p style="font-size:.8rem;color:var(--text-soft);margin-top:14px">ℹ️ Montos y requisitos referenciales (pueden variar cada año). No se puede tener Gratuidad y otra beca de arancel a la vez. Verificá siempre en <b>beneficiosestudiantiles.cl</b>.</p>`;
}

/* ============================================================
   ADMIN: USUARIOS
============================================================ */
function viewPeople(c) {
  const rows = DB.users.map(u => `
    <tr><td><div style="display:flex;align-items:center;gap:10px"><div class="avatar" style="background:${u.color};width:32px;height:32px;font-size:.78rem">${initials(u.name)}</div><b>${esc(u.name)}</b></div></td>
      <td>${esc(u.email)}</td>
      <td><span class="pill ${u.role === "admin" ? "bad" : u.role === "docente" ? "warn" : "info"}">${u.role}</span></td>
      <td>${u.grade || (u.subjects ? u.subjects.map(s => course(s) ? course(s).name : s).join(", ") : "—")}</td>
      <td><button class="btn btn-ghost btn-sm" onclick="editUser('${u.id}')">Editar</button></td></tr>`).join("");
  c.innerHTML = `
    <div class="section-head"><h2>Usuarios</h2><button class="btn btn-primary btn-sm" onclick="editUser()">+ Nuevo usuario</button></div>
    <div class="card"><table class="tbl">
      <thead><tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Curso / Materias</th><th></th></tr></thead>
      <tbody>${rows}</tbody></table></div>`;
}
function editUser(id) {
  const u = id ? user(id) : { name: "", email: "", role: "estudiante", grade: "", pass: "1234" };
  openModal(`<h3>${id ? "Editar" : "Nuevo"} usuario</h3>
    <div class="field"><label>Nombre</label><input id="us-name" value="${esc(u.name)}"></div>
    <div class="field"><label>Email</label><input id="us-email" value="${esc(u.email)}"></div>
    <div class="field"><label>Rol</label><select id="us-role"><option value="estudiante" ${u.role === "estudiante" ? "selected" : ""}>Estudiante</option><option value="docente" ${u.role === "docente" ? "selected" : ""}>Docente</option><option value="admin" ${u.role === "admin" ? "selected" : ""}>Administrador</option></select></div>
    <div class="field"><label>Curso (si es estudiante)</label><input id="us-grade" value="${esc(u.grade || "")}" placeholder="Ej: 4º A"></div>
    <div class="field"><label>Contraseña</label><input id="us-pass" value="${esc(u.pass)}"></div>
    <div class="modal-actions">
      ${id && id !== session ? `<button class="btn btn-danger" style="margin-right:auto" onclick="delUser('${id}')">Eliminar</button>` : ""}
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="saveUser('${id || ""}')">Guardar</button></div>`);
}
function saveUser(id) {
  const name = el("us-name").value.trim(), email = el("us-email").value.trim();
  if (!name || !email) return toast("Completá nombre y email");
  const role = el("us-role").value, grade = el("us-grade").value, pass = el("us-pass").value;
  const colors = ["#5b4fc4", "#14b8a6", "#e8a13c", "#e05260", "#2fae72", "#3b82f6"];
  if (id) { const u = user(id); Object.assign(u, { name, email, role, grade, pass }); }
  else {
    const nu = { id: uid("u"), name, email, role, grade, pass, color: colors[DB.users.length % colors.length] };
    if (role === "estudiante") nu.enrolled = DB.courses.filter(c => c.area === "secundaria" || c.area === "prelaboral").map(c => c.id);
    DB.users.push(nu);
  }
  saveDB(); closeModal(); renderView(); toast("Usuario guardado");
}
function delUser(id) { DB.users = DB.users.filter(u => u.id !== id); saveDB(); closeModal(); renderView(); toast("Usuario eliminado"); }

/* ============================================================
   ADMIN: REPORTES
============================================================ */
function viewReports(c) {
  const students = DB.users.filter(u => u.role === "estudiante");
  const allGrades = DB.submissions.filter(s => s.grade != null);
  const globalAvg = allGrades.length ? (allGrades.reduce((a, s) => a + s.grade, 0) / allGrades.length).toFixed(2) : "—";
  const att = DB.attendance;
  const present = att.filter(a => a.status === "P").length;
  const attRate = att.length ? Math.round(present / att.length * 100) : 0;

  // rendimiento por curso
  const byCourse = DB.courses.map(cc => {
    const gs = DB.submissions.filter(s => { const a = DB.assignments.find(x => x.id === s.assignment); return a && a.course === cc.id && s.grade != null; });
    const avg = gs.length ? (gs.reduce((t, s) => t + s.grade, 0) / gs.length).toFixed(1) : "—";
    return { cc, avg, n: gs.length };
  });

  c.innerHTML = `
    <div class="grid grid-4" style="margin-bottom:20px">
      ${statCard("👥", "#5b4fc4", students.length, "Estudiantes")}
      ${statCard("📊", "#14b8a6", globalAvg, "Promedio institucional")}
      ${statCard("✅", "#2fae72", attRate + "%", "Tasa de asistencia")}
      ${statCard("📚", "#e8a13c", DB.courses.length, "Cursos ofrecidos")}
    </div>
    <div class="grid grid-2">
      <div class="card"><h3>📈 Rendimiento por curso</h3>
        ${byCourse.map(b => `
          <div class="skill-row"><div class="sk-head"><span>${b.cc.icon} ${b.cc.name}</span><span>${b.avg}${b.avg !== "—" ? "/10" : ""}</span></div>
          <div class="skill-bar"><div class="skill-fill" style="width:${b.avg === "—" ? 0 : b.avg * 10}%"></div></div></div>`).join("")}
      </div>
      <div class="card"><h3>🏆 Ranking de estudiantes</h3>
        ${students.map(s => {
          const gs = DB.submissions.filter(x => x.student === s.id && x.grade != null);
          const avg = gs.length ? (gs.reduce((t, x) => t + x.grade, 0) / gs.length) : 0;
          return { s, avg };
        }).sort((a, b) => b.avg - a.avg).map((r, i) => `
          <div class="list-item"><span style="font-weight:800;color:var(--text-soft);width:22px">${i + 1}º</span>
            <div class="avatar" style="background:${r.s.color};width:32px;height:32px;font-size:.78rem">${initials(r.s.name)}</div>
            <div class="grow"><div class="t">${esc(r.s.name)}</div><div class="s">${r.s.grade || ""}</div></div>
            <span class="pill ${r.avg >= 6 ? "ok" : r.avg > 0 ? "bad" : "info"}">${r.avg ? r.avg.toFixed(1) : "s/n"}</span></div>`).join("")}
      </div>
    </div>
    <div class="card" style="margin-top:18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
      <div><b>⚙️ Administración de datos</b><div style="font-size:.82rem;color:var(--text-soft)">Restablecer la plataforma a los datos de demostración.</div></div>
      <button class="btn btn-danger btn-sm" onclick="if(confirm('¿Restablecer todos los datos de demostración?')){resetDB();renderApp();toast('Datos restablecidos');}">Restablecer datos demo</button>
    </div>`;
}

/* ============================================================
   TEMA + ARRANQUE
============================================================ */
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("brain_theme", document.body.classList.contains("dark") ? "dark" : "light");
}
function boot() {
  loadDB();
  if (localStorage.getItem("brain_theme") === "dark") document.body.classList.add("dark");
  const s = localStorage.getItem(SESSION_KEY);
  if (s && user(s)) { session = s; renderApp(); } else renderLogin();
}
boot();
