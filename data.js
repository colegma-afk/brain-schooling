/* ===== Brain Schooling — datos semilla y capa de persistencia ===== */
const DB_KEY = "brain_schooling_db_v2";

function seedDB() {
  return {
    users: [
      { id: "u_admin", name: "Dirección Brain", email: "admin@brain.edu", pass: "1234", role: "admin", color: "#5b4fc4" },
      { id: "u_prof1", name: "Prof. Laura Méndez", email: "laura@brain.edu", pass: "1234", role: "docente", color: "#14b8a6", subjects: ["c_mat", "c_prog", "c_ing", "c_dig"] },
      { id: "u_prof2", name: "Prof. Diego Ríos", email: "diego@brain.edu", pass: "1234", role: "docente", color: "#e8a13c", subjects: ["c_len", "c_lab", "c_cs", "c_his"] },
      { id: "u_est1", name: "Martín Suárez", email: "martin@brain.edu", pass: "1234", role: "estudiante", color: "#e05260", grade: "4º A", enrolled: ["c_mat", "c_len", "c_prog", "c_lab", "c_cs", "c_his", "c_ing", "c_dig"] },
      { id: "u_est2", name: "Sofía Torres", email: "sofia@brain.edu", pass: "1234", role: "estudiante", color: "#2fae72", grade: "4º A", enrolled: ["c_mat", "c_len", "c_prog", "c_lab", "c_cs", "c_ing", "c_dig"] },
      { id: "u_est3", name: "Bruno Díaz", email: "bruno@brain.edu", pass: "1234", role: "estudiante", color: "#3b82f6", grade: "4º A", enrolled: ["c_mat", "c_len", "c_lab", "c_cs", "c_his"] },
    ],
    courses: [
      { id: "c_mat", name: "Matemática", area: "secundaria", teacher: "u_prof1", color: "#5b4fc4", icon: "📐", desc: "Álgebra, funciones y geometría para 4º año." },
      { id: "c_len", name: "Lengua y Literatura", area: "secundaria", teacher: "u_prof2", color: "#e05260", icon: "📖", desc: "Comprensión lectora, escritura y análisis literario." },
      { id: "c_prog", name: "Programación", area: "secundaria", teacher: "u_prof1", color: "#14b8a6", icon: "💻", desc: "Pensamiento computacional y bases de JavaScript." },
      { id: "c_lab", name: "Orientación Pre-Laboral", area: "prelaboral", teacher: "u_prof2", color: "#e8a13c", icon: "💼", desc: "Habilidades para el empleo, CV y entrevistas." },
      { id: "c_cs", name: "Ciencias Naturales", area: "secundaria", teacher: "u_prof2", color: "#2fae72", icon: "🔬", desc: "Biología, química y método científico." },
      { id: "c_his", name: "Historia y Cs. Sociales", area: "secundaria", teacher: "u_prof2", color: "#b06a3a", icon: "🏛️", desc: "Procesos históricos y ciudadanía." },
      { id: "c_ing", name: "Inglés", area: "secundaria", teacher: "u_prof1", color: "#3b82f6", icon: "🌎", desc: "Comunicación básica e intermedia en inglés." },
      { id: "c_dig", name: "Competencias Digitales Laborales", area: "prelaboral", teacher: "u_prof1", color: "#8b5cf6", icon: "🖥️", desc: "Herramientas digitales para el trabajo: mail, ofimática y ciudadanía digital." },
    ],
    lessons: [
      { id: "l1", course: "c_mat", title: "Funciones lineales", mins: 25, body: "<p>Una <b>función lineal</b> tiene la forma <code>f(x) = mx + b</code>, donde <b>m</b> es la pendiente y <b>b</b> la ordenada al origen.</p><ul><li>La pendiente indica la inclinación de la recta.</li><li>Si m &gt; 0 la función crece; si m &lt; 0 decrece.</li></ul><p>Ejemplo: <code>f(x) = 2x + 1</code> cruza el eje Y en 1.</p>" },
      { id: "l2", course: "c_mat", title: "Ecuaciones cuadráticas", mins: 30, body: "<p>Una ecuación cuadrática tiene la forma <code>ax² + bx + c = 0</code>.</p><p>Se resuelve con la <b>fórmula general</b>: x = (-b ± √(b²-4ac)) / 2a.</p><ul><li>El discriminante b²-4ac indica cuántas soluciones reales hay.</li></ul>" },
      { id: "l3", course: "c_len", title: "El texto argumentativo", mins: 20, body: "<p>El <b>texto argumentativo</b> busca convencer al lector sobre una idea.</p><ul><li>Tesis: la idea que se defiende.</li><li>Argumentos: razones que la sostienen.</li><li>Conclusión: cierre que refuerza la tesis.</li></ul>" },
      { id: "l4", course: "c_prog", title: "Variables y tipos", mins: 25, body: "<p>En JavaScript declaramos variables con <code>let</code> y <code>const</code>.</p><ul><li><code>let edad = 15;</code> — número</li><li><code>const nombre = \"Ana\";</code> — texto (string)</li><li><code>let activo = true;</code> — booleano</li></ul>" },
      { id: "l5", course: "c_prog", title: "Condicionales", mins: 28, body: "<p>Las estructuras <code>if / else</code> permiten tomar decisiones.</p><p><code>if (nota &gt;= 6) { aprobado } else { recuperar }</code></p>" },
      { id: "l6", course: "c_lab", title: "Cómo armar tu CV", mins: 22, body: "<p>Un buen <b>CV</b> es claro y breve. Incluye:</p><ul><li>Datos de contacto</li><li>Perfil personal (2-3 líneas)</li><li>Experiencia y formación</li><li>Habilidades</li></ul><p>Usa verbos de acción y adapta el CV a cada puesto.</p>" },
      { id: "l7", course: "c_lab", title: "La entrevista laboral", mins: 26, body: "<p>Claves para una entrevista:</p><ul><li>Investiga la empresa antes.</li><li>Llega puntual y con presentación cuidada.</li><li>Escucha y responde con ejemplos concretos.</li><li>Prepara 2 preguntas para el entrevistador.</li></ul>" },
      { id: "l8", course: "c_cs", title: "El método científico", mins: 24, body: "<p>El <b>método científico</b> es un proceso ordenado para investigar:</p><ul><li>Observación de un fenómeno.</li><li>Hipótesis: una explicación posible.</li><li>Experimentación para ponerla a prueba.</li><li>Conclusión: se acepta o rechaza la hipótesis.</li></ul>" },
      { id: "l9", course: "c_cs", title: "La célula", mins: 27, body: "<p>La <b>célula</b> es la unidad básica de la vida.</p><ul><li><b>Célula procariota</b>: sin núcleo definido (bacterias).</li><li><b>Célula eucariota</b>: con núcleo (plantas y animales).</li><li>Partes clave: membrana, citoplasma y material genético.</li></ul>" },
      { id: "l10", course: "c_his", title: "La Revolución Industrial", mins: 26, body: "<p>La <b>Revolución Industrial</b> (siglo XVIII–XIX) transformó la producción con máquinas.</p><ul><li>Paso del trabajo artesanal a la fábrica.</li><li>Aparición de la máquina de vapor.</li><li>Cambios sociales: crecimiento de las ciudades y la clase obrera.</li></ul>" },
      { id: "l11", course: "c_his", title: "Derechos y ciudadanía", mins: 20, body: "<p>Ser <b>ciudadano</b> implica derechos y responsabilidades.</p><ul><li>Derechos civiles, políticos y sociales.</li><li>La participación democrática (voto, organización).</li><li>La convivencia se basa en el respeto mutuo.</li></ul>" },
      { id: "l12", course: "c_ing", title: "Greetings & introductions", mins: 22, body: "<p>Frases básicas para presentarte en inglés:</p><ul><li><i>Hello, my name is...</i> — Hola, mi nombre es...</li><li><i>Nice to meet you.</i> — Un gusto conocerte.</li><li><i>Where are you from?</i> — ¿De dónde sos?</li><li><i>I am from Argentina.</i> — Soy de Argentina.</li></ul>" },
      { id: "l13", course: "c_ing", title: "Present simple", mins: 25, body: "<p>El <b>present simple</b> describe rutinas y hechos.</p><ul><li><i>I work / You study / She works.</i></li><li>En 3ª persona (he/she/it) se agrega <b>-s</b>.</li><li>Negación con <i>don't / doesn't</i>.</li></ul>" },
      { id: "l14", course: "c_dig", title: "Correo electrónico profesional", mins: 23, body: "<p>Un <b>email laboral</b> claro incluye:</p><ul><li>Asunto breve y concreto.</li><li>Saludo formal (<i>Estimado/a...</i>).</li><li>Mensaje directo y ordenado.</li><li>Despedida y firma con tus datos.</li></ul>" },
      { id: "l15", course: "c_dig", title: "Ofimática básica", mins: 28, body: "<p>Herramientas de oficina indispensables:</p><ul><li><b>Procesador de texto</b>: cartas, informes, CV.</li><li><b>Planilla de cálculo</b>: tablas, sumas, presupuestos.</li><li><b>Presentaciones</b>: exponer ideas con diapositivas.</li></ul>" },
    ],
    quizzes: [
      { id: "q1", course: "c_mat", title: "Autoevaluación: Funciones", questions: [
        { q: "¿Qué representa la 'm' en f(x)=mx+b?", opts: ["La pendiente", "La ordenada al origen", "El eje X"], correct: 0 },
        { q: "Si m es negativa, la función...", opts: ["Crece", "Decrece", "Es constante"], correct: 1 },
        { q: "¿Dónde cruza el eje Y la función f(x)=2x+1?", opts: ["En 2", "En 0", "En 1"], correct: 2 },
      ]},
      { id: "q2", course: "c_prog", title: "Autoevaluación: Variables", questions: [
        { q: "¿Cómo se declara una constante en JS?", opts: ["const", "var fija", "let final"], correct: 0 },
        { q: "El valor true / false es de tipo...", opts: ["String", "Booleano", "Número"], correct: 1 },
        { q: "¿Cuál es un número válido?", opts: ["\"15\"", "let x", "15"], correct: 2 },
      ]},
      { id: "q3", course: "c_lab", title: "Autoevaluación: CV y entrevista", questions: [
        { q: "Un buen CV debe ser...", opts: ["Largo y detallado", "Claro y breve", "Sin habilidades"], correct: 1 },
        { q: "Antes de una entrevista conviene...", opts: ["Investigar la empresa", "Llegar tarde", "No preparar nada"], correct: 0 },
      ]},
      { id: "q4", course: "c_cs", title: "Autoevaluación: Célula y método", questions: [
        { q: "La unidad básica de la vida es...", opts: ["El átomo", "La célula", "El tejido"], correct: 1 },
        { q: "¿Qué célula NO tiene núcleo definido?", opts: ["Procariota", "Eucariota", "Vegetal"], correct: 0 },
        { q: "Una hipótesis es...", opts: ["Una conclusión final", "Una explicación a poner a prueba", "Un experimento"], correct: 1 },
      ]},
      { id: "q5", course: "c_ing", title: "Quiz: Present simple", questions: [
        { q: "She ___ in a shop.", opts: ["work", "works", "working"], correct: 1 },
        { q: "'Nice to meet you' significa...", opts: ["Un gusto conocerte", "Nos vemos", "¿Cómo estás?"], correct: 0 },
        { q: "Negación correcta:", opts: ["I no work", "I don't work", "I not work"], correct: 1 },
      ]},
      { id: "q6", course: "c_dig", title: "Quiz: Herramientas digitales", questions: [
        { q: "Para hacer un presupuesto con sumas conviene usar...", opts: ["Procesador de texto", "Planilla de cálculo", "Presentación"], correct: 1 },
        { q: "Un email laboral debe tener...", opts: ["Asunto claro y firma", "Solo emojis", "Ningún saludo"], correct: 0 },
      ]},
    ],
    assignments: [
      { id: "a1", course: "c_mat", title: "TP: Graficar funciones lineales", desc: "Graficá tres funciones lineales e identificá pendiente y ordenada.", due: "2026-07-12", points: 10 },
      { id: "a2", course: "c_len", title: "Ensayo argumentativo", desc: "Escribí un texto argumentativo de 300 palabras sobre el uso del celular en clase.", due: "2026-07-10", points: 10 },
      { id: "a3", course: "c_prog", title: "Programa con condicionales", desc: "Escribí pseudocódigo que decida si un alumno aprueba según su nota.", due: "2026-07-15", points: 10 },
      { id: "a4", course: "c_lab", title: "Redactá tu CV", desc: "Completá el módulo de CV en la sección Pre-Laboral y adjuntá una reflexión.", due: "2026-07-18", points: 10 },
      { id: "a5", course: "c_cs", title: "Informe: método científico", desc: "Elegí un fenómeno cotidiano y planteá una hipótesis con un experimento simple.", due: "2026-07-14", points: 10 },
      { id: "a6", course: "c_ing", title: "Writing: About me", desc: "Escribí un párrafo de 5 oraciones presentándote en inglés (present simple).", due: "2026-07-16", points: 10 },
      { id: "a7", course: "c_dig", title: "Email profesional", desc: "Redactá un correo formal solicitando información sobre una pasantía.", due: "2026-07-17", points: 10 },
    ],
    submissions: [
      { id: "s1", assignment: "a2", student: "u_est1", text: "El uso del celular en clase debe regularse porque...", date: "2026-07-04", grade: 8, feedback: "Buena tesis, cuidá la ortografía." },
      { id: "s2", assignment: "a1", student: "u_est2", text: "Adjunto los tres gráficos con sus pendientes.", date: "2026-07-05", grade: null, feedback: "" },
    ],
    attendance: [
      // { date, course, student, status: P|T|A }
      { date: "2026-07-02", course: "c_mat", student: "u_est1", status: "P" },
      { date: "2026-07-02", course: "c_mat", student: "u_est2", status: "P" },
      { date: "2026-07-02", course: "c_mat", student: "u_est3", status: "T" },
    ],
    events: [
      { id: "e1", date: "2026-07-08", title: "Clase de repaso Matemática", course: "c_mat", type: "clase" },
      { id: "e2", date: "2026-07-10", title: "Entrega: Ensayo argumentativo", course: "c_len", type: "entrega" },
      { id: "e3", date: "2026-07-12", title: "Entrega: TP Funciones", course: "c_mat", type: "entrega" },
      { id: "e4", date: "2026-07-15", title: "Taller de entrevistas", course: "c_lab", type: "clase" },
      { id: "e5", date: "2026-07-09", title: "Laboratorio de Ciencias", course: "c_cs", type: "clase" },
      { id: "e6", date: "2026-07-16", title: "Examen oral de Inglés", course: "c_ing", type: "examen" },
      { id: "e7", date: "2026-07-11", title: "Práctica de ofimática", course: "c_dig", type: "clase" },
    ],
    messages: [
      { id: "m1", from: "u_prof1", to: "u_est1", subject: "Sobre tu TP", body: "Martín, revisá la pendiente del segundo gráfico. Nos vemos en clase.", date: "2026-07-05T10:00", read: false },
      { id: "m2", from: "u_admin", to: "u_est1", subject: "Bienvenido a Brain Schooling", body: "¡Hola! Te damos la bienvenida a la plataforma. Cualquier duda escribinos.", date: "2026-07-01T09:00", read: true },
    ],
    prelabor: {
      // por estudiante
      u_est1: {
        cv: { headline: "Estudiante de 4º año orientado a la tecnología", summary: "Responsable y con ganas de aprender. Interés en programación y atención al público.", experience: "Ayudante en feria de ciencias 2025.", education: "Secundaria en curso — Brain Schooling." },
        skills: [
          { name: "Trabajo en equipo", level: 80 },
          { name: "Comunicación", level: 65 },
          { name: "Puntualidad", level: 90 },
          { name: "Manejo de PC", level: 75 },
        ],
        goals: [
          { id: "g1", text: "Completar el CV", done: true },
          { id: "g2", text: "Hacer una entrevista simulada", done: false },
          { id: "g3", text: "Terminar el módulo pre-laboral", done: false },
        ],
      },
    },
  };
}

let DB = null;
function loadDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    DB = raw ? JSON.parse(raw) : seedDB();
  } catch (e) { DB = seedDB(); }
  if (!DB.users) DB = seedDB();
  saveDB();
}
function saveDB() { localStorage.setItem(DB_KEY, JSON.stringify(DB)); }
function resetDB() { DB = seedDB(); saveDB(); }
