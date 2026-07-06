/* ===== Brain Schooling — datos semilla y capa de persistencia ===== */
const DB_KEY = "brain_schooling_db_v3";

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
      /* ===== MATEMÁTICA (Bases Curriculares 1° medio · eje Números, Álgebra, Geometría, Probabilidad) ===== */
      { id: "l_ma1", course: "c_mat", title: "Números racionales y sus operaciones", mins: 26, oa: "MA1M OA 01", body: "<p>Los <b>números racionales (ℚ)</b> son los que se pueden escribir como fracción <code>a/b</code> (con b ≠ 0). Incluyen enteros, fracciones y decimales finitos o periódicos.</p><ul><li><b>Suma/resta</b>: se igualan denominadores. Ej: 1/2 + 1/3 = 3/6 + 2/6 = 5/6.</li><li><b>Multiplicación</b>: numerador por numerador y denominador por denominador.</li><li><b>División</b>: se multiplica por el inverso (recíproco).</li></ul><p>Regla de signos: (+)(+)=+, (+)(−)=−, (−)(−)=+.</p>" },
      { id: "l_ma2", course: "c_mat", title: "Potencias de base racional y exponente entero", mins: 24, oa: "MA1M OA 02", body: "<p>Una <b>potencia</b> <code>aⁿ</code> es multiplicar la base <b>a</b> por sí misma <b>n</b> veces.</p><ul><li>Producto de igual base: <code>aᵐ · aⁿ = aᵐ⁺ⁿ</code></li><li>Cociente: <code>aᵐ ÷ aⁿ = aᵐ⁻ⁿ</code></li><li>Exponente negativo: <code>a⁻ⁿ = 1/aⁿ</code></li><li>Exponente cero: <code>a⁰ = 1</code></li></ul><p>Las potencias modelan crecimiento (interés compuesto) y decrecimiento (desintegración).</p>" },
      { id: "l_ma3", course: "c_mat", title: "Productos notables y factorización", mins: 28, oa: "MA1M OA 03", body: "<p>Los <b>productos notables</b> son multiplicaciones que aparecen tan seguido que conviene memorizar su resultado.</p><ul><li>Cuadrado de binomio: <code>(a+b)² = a² + 2ab + b²</code></li><li>Suma por diferencia: <code>(a+b)(a−b) = a² − b²</code></li><li>Cuadrado de la diferencia: <code>(a−b)² = a² − 2ab + b²</code></li></ul><p><b>Factorizar</b> es el proceso inverso: escribir una expresión como producto de factores.</p>" },
      { id: "l_ma4", course: "c_mat", title: "Sistemas de ecuaciones lineales (2×2)", mins: 30, oa: "MA1M OA 04", body: "<p>Un <b>sistema 2×2</b> son dos ecuaciones con dos incógnitas. Su solución es el punto donde ambas rectas se cruzan.</p><p>Métodos: <b>sustitución</b>, <b>igualación</b> y <b>reducción</b>.</p><p>Ejemplo por reducción: <code>x + y = 10</code> y <code>x − y = 2</code> ⟶ sumando: 2x = 12 ⟶ x = 6, y = 4.</p>" },
      { id: "l_ma5", course: "c_mat", title: "Función lineal y afín", mins: 25, oa: "MA1M OA 05", body: "<p>Una <b>función afín</b> tiene la forma <code>f(x) = mx + b</code>, donde <b>m</b> es la pendiente y <b>b</b> la ordenada al origen. Si b = 0 es una <b>función lineal</b>.</p><ul><li>La pendiente indica la inclinación: si m &gt; 0 crece, si m &lt; 0 decrece.</li><li>Ejemplo: <code>f(x) = 2x + 1</code> cruza el eje Y en 1.</li></ul>" },
      { id: "l_ma6", course: "c_mat", title: "Teorema de Tales y semejanza", mins: 27, oa: "MA1M OA 09", body: "<p>El <b>Teorema de Tales</b>: si varias rectas paralelas cortan a dos transversales, los segmentos que determinan son proporcionales.</p><p>Dos figuras son <b>semejantes</b> si tienen la misma forma y sus lados son proporcionales (razón de semejanza). Se usa en mapas, maquetas y planos a escala.</p>" },
      { id: "l_ma7", course: "c_mat", title: "Probabilidad: reglas aditiva y multiplicativa", mins: 24, oa: "MA1M OA 14", body: "<p>La <b>probabilidad</b> de un evento es P = casos favorables / casos posibles (entre 0 y 1).</p><ul><li><b>Regla aditiva</b>: para eventos excluyentes, P(A o B) = P(A) + P(B).</li><li><b>Regla multiplicativa</b>: para eventos independientes, P(A y B) = P(A) · P(B).</li></ul><p>Ej: sacar un 6 en un dado = 1/6.</p>" },

      /* ===== LENGUA Y LITERATURA (1° medio · Lectura, Escritura, Comunicación oral) ===== */
      { id: "l_le1", course: "c_len", title: "Análisis de la narración", mins: 24, oa: "LE1M OA 03", body: "<p>Analizar un <b>texto narrativo</b> implica reconocer sus elementos:</p><ul><li><b>Narrador</b>: quién cuenta (1ª persona, omnisciente, testigo).</li><li><b>Personajes</b>: principales y secundarios; su evolución.</li><li><b>Conflicto</b>: el problema central de la historia.</li><li><b>Espacio y tiempo</b>: dónde y cuándo ocurre.</li></ul><p>Los símbolos aportan significados más profundos que el sentido literal.</p>" },
      { id: "l_le2", course: "c_len", title: "El poema y el lenguaje figurado", mins: 22, oa: "LE1M OA 04", body: "<p>La <b>poesía</b> usa el lenguaje de forma creativa. Recursos clave:</p><ul><li><b>Metáfora</b>: identifica dos cosas (\"tus ojos son dos luceros\").</li><li><b>Comparación</b>: usa \"como\" (\"blanco como la nieve\").</li><li><b>Personificación</b>: da cualidades humanas a lo no humano.</li><li><b>Hipérbole</b>: exageración expresiva.</li></ul><p>Elementos formales: verso, estrofa, rima y ritmo.</p>" },
      { id: "l_le3", course: "c_len", title: "El texto argumentativo", mins: 22, oa: "LE1M OA 09", body: "<p>El <b>texto argumentativo</b> busca convencer sobre una idea. Estructura:</p><ul><li><b>Tesis</b>: la idea que se defiende.</li><li><b>Argumentos</b>: razones y evidencias que la sostienen.</li><li><b>Conclusión</b>: cierre que refuerza la tesis.</li></ul><p>Distinguí entre <b>hechos</b> (comprobables) y <b>opiniones</b> (valoraciones personales).</p>" },
      { id: "l_le4", course: "c_len", title: "El Romanticismo", mins: 23, oa: "LE1M OA 07", body: "<p>El <b>Romanticismo</b> (fines del s. XVIII y s. XIX) fue un movimiento artístico que reaccionó contra la razón ilustrada. Características:</p><ul><li>Exaltación de los sentimientos y la libertad individual.</li><li>Valoración de la naturaleza y lo nacional.</li><li>Idealización del amor y rebeldía frente a las normas.</li></ul>" },
      { id: "l_le5", course: "c_len", title: "Escribir un ensayo persuasivo", mins: 26, oa: "LE1M OA 14", body: "<p>Para escribir un <b>ensayo persuasivo</b> seguí el proceso: planificar, escribir, revisar y editar.</p><ul><li>Formulá una <b>hipótesis</b> clara al inicio.</li><li>Sostenela con <b>evidencias</b> pertinentes (datos, ejemplos, citas).</li><li>Organizá un párrafo por idea con conectores.</li><li>Cerrá reafirmando tu postura.</li></ul>" },
      { id: "l_le6", course: "c_len", title: "Evaluar textos mediáticos y noticias falsas", mins: 21, oa: "LE1M OA 10", body: "<p>Los <b>textos mediáticos</b> (publicidad, noticias, redes) tienen un propósito e intención. Para evaluarlos:</p><ul><li>Identificá el <b>propósito</b>: informar, entretener o persuadir.</li><li>Reconocé <b>estrategias de persuasión</b>.</li><li>Verificá la <b>veracidad</b>: fuente, autor, fecha y contraste con otros medios.</li></ul><p>Así evitás caer en <i>fake news</i>.</p>" },

      /* ===== PROGRAMACIÓN / PENSAMIENTO COMPUTACIONAL (Tecnología 1° medio · recursos digitales) ===== */
      { id: "l_pr1", course: "c_prog", title: "Pensamiento computacional y algoritmos", mins: 24, oa: "TE1M OA 01", body: "<p>El <b>pensamiento computacional</b> resuelve problemas en pasos que una máquina podría ejecutar. Sus pilares:</p><ul><li><b>Descomposición</b>: dividir un problema grande en partes.</li><li><b>Patrones</b>: reconocer regularidades.</li><li><b>Abstracción</b>: quedarse con lo esencial.</li><li><b>Algoritmo</b>: secuencia ordenada de pasos.</li></ul>" },
      { id: "l_pr2", course: "c_prog", title: "Variables y tipos de datos", mins: 25, oa: "TE1M OA 02", body: "<p>Una <b>variable</b> guarda un dato. En JavaScript se declara con <code>let</code> o <code>const</code>.</p><ul><li><code>let edad = 15;</code> — número</li><li><code>const nombre = 'Ana';</code> — texto (string)</li><li><code>let activo = true;</code> — booleano</li></ul>" },
      { id: "l_pr3", course: "c_prog", title: "Condicionales (if / else)", mins: 26, oa: "TE1M OA 02", body: "<p>Las estructuras <b>condicionales</b> permiten tomar decisiones según se cumpla o no una condición.</p><p><code>if (nota &gt;= 4) { aprobado } else { repite }</code></p><p>Se pueden encadenar con <code>else if</code> para varias opciones.</p>" },
      { id: "l_pr4", course: "c_prog", title: "Bucles e iteración", mins: 27, oa: "TE1M OA 02", body: "<p>Un <b>bucle</b> repite instrucciones sin escribirlas muchas veces.</p><ul><li><code>for (let i = 0; i &lt; 5; i++) { ... }</code> — repite 5 veces.</li><li><code>while (condición) { ... }</code> — repite mientras se cumpla.</li></ul><p>Los bucles automatizan tareas repetitivas.</p>" },
      { id: "l_pr5", course: "c_prog", title: "Ética y seguridad al crear servicios digitales", mins: 22, oa: "TE1M OA 02", body: "<p>Al desarrollar un producto digital hay que considerar aspectos <b>éticos y de seguridad</b>:</p><ul><li>Proteger los <b>datos personales</b> de los usuarios.</li><li>Respetar la <b>propiedad intelectual</b> (licencias, autoría).</li><li>Diseñar de forma <b>accesible</b> e inclusiva.</li><li>Usar contraseñas seguras y evitar compartir información sensible.</li></ul>" },

      /* ===== CIENCIAS NATURALES (1° medio · Biología, Física, Química) ===== */
      { id: "l_cs1", course: "c_cs", title: "Evolución y selección natural", mins: 27, oa: "CN1M OA 02", body: "<p>La <b>teoría de la evolución</b> de Darwin explica cómo cambian las especies con el tiempo por <b>selección natural</b>: los individuos mejor adaptados sobreviven y dejan más descendencia.</p><p>Evidencias: fósiles, estructuras homólogas, embriología y secuencias de ADN.</p>" },
      { id: "l_cs2", course: "c_cs", title: "Ecosistemas y niveles de organización", mins: 26, oa: "CN1M OA 04", body: "<p>Un <b>ecosistema</b> es el conjunto de seres vivos (factores bióticos) y su ambiente físico (abióticos) que interactúan.</p><ul><li>Niveles: individuo → población → comunidad → ecosistema → biósfera.</li><li>Relaciones: depredación, competencia, mutualismo.</li></ul>" },
      { id: "l_cs3", course: "c_cs", title: "Ciclos de la materia y flujo de energía", mins: 25, oa: "CN1M OA 06", body: "<p>En los ecosistemas la <b>materia circula</b> y la <b>energía fluye</b>.</p><ul><li><b>Fotosíntesis</b>: las plantas captan energía del Sol y producen materia orgánica.</li><li><b>Respiración celular</b>: libera esa energía.</li><li>Ciclos biogeoquímicos: agua, carbono y nitrógeno.</li></ul>" },
      { id: "l_cs4", course: "c_cs", title: "Ondas: sonido y luz", mins: 26, oa: "CN1M OA 09", body: "<p>Una <b>onda</b> transporta energía sin transportar materia.</p><ul><li><b>Sonido</b>: onda mecánica que necesita un medio; fenómenos como eco y resonancia.</li><li><b>Luz</b>: onda electromagnética; se refleja, refracta e interfiere.</li></ul><p>Parámetros: amplitud, frecuencia y longitud de onda.</p>" },
      { id: "l_cs5", course: "c_cs", title: "Reacciones químicas y conservación de la materia", mins: 27, oa: "CN1M OA 17", body: "<p>En una <b>reacción química</b> unos reactantes se transforman en productos distintos (combustión, oxidación, fermentación).</p><p><b>Ley de conservación de la materia</b> (Lavoisier): el número total de átomos no cambia; por eso las ecuaciones químicas se <b>balancean</b>.</p>" },
      { id: "l_cs6", course: "c_cs", title: "La célula", mins: 24, oa: "CN1M OA 04", body: "<p>La <b>célula</b> es la unidad básica de la vida.</p><ul><li><b>Procariota</b>: sin núcleo definido (bacterias).</li><li><b>Eucariota</b>: con núcleo (plantas y animales).</li><li>Partes clave: membrana, citoplasma y material genético.</li></ul>" },

      /* ===== HISTORIA, GEOGRAFÍA Y CIENCIAS SOCIALES (1° medio) ===== */
      { id: "l_hi1", course: "c_his", title: "Ideas republicanas y liberales del siglo XIX", mins: 24, oa: "HI1M OA 01", body: "<p>El <b>liberalismo</b> y las <b>ideas republicanas</b> transformaron la política del siglo XIX.</p><ul><li>Soberanía popular y división de poderes.</li><li>Libertades individuales y derechos ciudadanos.</li><li>Reemplazo de las monarquías absolutas por repúblicas y constituciones.</li></ul>" },
      { id: "l_hi2", course: "c_his", title: "La Revolución Industrial", mins: 26, oa: "HI1M OA 05", body: "<p>La <b>Revolución Industrial</b> (s. XVIII–XIX) transformó la producción con máquinas.</p><ul><li>Del trabajo artesanal a la fábrica y la máquina de vapor.</li><li>Crecimiento de las ciudades (urbanización).</li><li>Surgimiento de la clase obrera y nuevas condiciones laborales.</li></ul>" },
      { id: "l_hi3", course: "c_his", title: "Imperialismo y Primera Guerra Mundial", mins: 27, oa: "HI1M OA 06", body: "<p>El <b>imperialismo</b> (fines s. XIX) fue la expansión de las potencias europeas sobre África y Asia buscando materias primas y mercados.</p><p>Las tensiones entre potencias desembocaron en la <b>Primera Guerra Mundial</b> (1914–1918), un conflicto de escala global con enormes consecuencias sociales.</p>" },
      { id: "l_hi4", course: "c_his", title: "La formación de la República de Chile", mins: 25, oa: "HI1M OA 08", body: "<p>Tras la independencia, Chile organizó su vida republicana en el siglo XIX.</p><ul><li>Ensayos constitucionales y la Constitución de 1833.</li><li>Consolidación del Estado y expansión territorial.</li><li>Inserción de Chile en la economía mundial (salitre).</li></ul>" },
      { id: "l_hi5", course: "c_his", title: "Economía: escasez y funcionamiento del mercado", mins: 23, oa: "HI1M OA 19", body: "<p>El <b>problema económico</b> nace de la <b>escasez</b>: los recursos son limitados y las necesidades ilimitadas, por eso hay que elegir.</p><ul><li>El <b>mercado</b> coordina a compradores y vendedores.</li><li><b>Oferta y demanda</b> determinan el precio.</li><li>El consumo responsable e informado cuida el presupuesto y el ambiente.</li></ul>" },
      { id: "l_hi6", course: "c_his", title: "Formación ciudadana: derechos y participación", mins: 21, oa: "HI1M OA 23", body: "<p>Ser <b>ciudadano</b> implica derechos y responsabilidades.</p><ul><li>Derechos civiles, políticos y sociales.</li><li>Participación democrática: voto, organización y opinión pública.</li><li>La convivencia se basa en el respeto y la resolución pacífica de conflictos.</li></ul>" },

      /* ===== INGLÉS (1° medio · Listening, Reading, Speaking, Writing) ===== */
      { id: "l_in1", course: "c_ing", title: "Greetings & introductions", mins: 22, oa: "IN1M OA 05", body: "<p>Frases básicas para presentarte en inglés:</p><ul><li><i>Hello, my name is...</i> — Hola, mi nombre es...</li><li><i>Nice to meet you.</i> — Un gusto conocerte.</li><li><i>Where are you from?</i> — ¿De dónde eres?</li><li><i>I am from Chile.</i> — Soy de Chile.</li></ul>" },
      { id: "l_in2", course: "c_ing", title: "Present simple", mins: 25, oa: "IN1M OA 16", body: "<p>El <b>present simple</b> describe rutinas y hechos.</p><ul><li><i>I work / You study / She works.</i></li><li>En 3ª persona (he/she/it) se agrega <b>-s</b>.</li><li>Negación con <i>don't / doesn't</i>.</li></ul>" },
      { id: "l_in3", course: "c_ing", title: "Reading strategies", mins: 23, oa: "IN1M OA 12", body: "<p>Estrategias para comprender textos en inglés:</p><ul><li><b>Skimming</b>: leer rápido para captar la idea general.</li><li><b>Scanning</b>: buscar información específica.</li><li>Inferir el significado por el <b>contexto</b> antes de usar el diccionario.</li><li>Identificar <i>cognates</i> (palabras parecidas al español).</li></ul>" },
      { id: "l_in4", course: "c_ing", title: "Process writing: a paragraph", mins: 24, oa: "IN1M OA 14", body: "<p>Escribir en inglés siguiendo el <b>writing process</b>:</p><ol><li><b>Plan</b>: ideas y vocabulario.</li><li><b>Draft</b>: primer borrador.</li><li><b>Revise</b>: mejorar el contenido.</li><li><b>Edit</b>: corregir gramática y ortografía.</li></ol><p>Un párrafo tiene <i>topic sentence</i>, <i>supporting details</i> y <i>closing</i>.</p>" },
      { id: "l_in5", course: "c_ing", title: "Listening for key information", mins: 22, oa: "IN1M OA 01", body: "<p>Para comprender audios en inglés:</p><ul><li>Anticipá el tema por el título o las imágenes.</li><li>Enfocate en <b>key words</b> y no en cada palabra.</li><li>Usá el tono y el contexto para inferir.</li><li>Reconocé números, fechas y nombres.</li></ul>" },

      /* ===== COMPETENCIAS DIGITALES LABORALES (Tecnología · TIC) ===== */
      { id: "l_di1", course: "c_dig", title: "Correo electrónico profesional", mins: 23, oa: "TE1M OA 04", body: "<p>Un <b>email laboral</b> claro incluye:</p><ul><li>Asunto breve y concreto.</li><li>Saludo formal (<i>Estimado/a...</i>).</li><li>Mensaje directo y ordenado.</li><li>Despedida y firma con tus datos.</li></ul>" },
      { id: "l_di2", course: "c_dig", title: "Ofimática básica", mins: 28, oa: "TE1M OA 04", body: "<p>Herramientas de oficina indispensables:</p><ul><li><b>Procesador de texto</b>: cartas, informes, CV.</li><li><b>Planilla de cálculo</b>: tablas, sumas, presupuestos.</li><li><b>Presentaciones</b>: exponer ideas con diapositivas.</li></ul>" },
      { id: "l_di3", course: "c_dig", title: "Ciudadanía digital, ética y seguridad", mins: 24, oa: "TE1M OA 02", body: "<p>Ser un buen <b>ciudadano digital</b> implica usar la tecnología de forma responsable.</p><ul><li>Protegé tus <b>datos personales</b> y usá contraseñas seguras.</li><li>Cuidá tu <b>huella digital</b>: lo que publicás permanece.</li><li>Respetá a los demás y denunciá el ciberacoso.</li><li>Reconocé estafas y correos sospechosos (<i>phishing</i>).</li></ul>" },
      { id: "l_di4", course: "c_dig", title: "Buscar y evaluar información en internet", mins: 22, oa: "TE1M OA 01", body: "<p>No toda la información en internet es confiable. Para evaluarla:</p><ul><li>Revisá el <b>autor</b> y la <b>fuente</b>.</li><li>Verificá la <b>fecha</b> de publicación.</li><li>Contrastá con otras fuentes.</li><li>Usá palabras clave precisas y comillas para frases exactas.</li></ul>" },
      { id: "l_di5", course: "c_dig", title: "Diseñar un servicio digital", mins: 26, oa: "TE1M OA 01", body: "<p>Para crear un <b>servicio digital</b> (app, sitio o formulario) que resuelva una necesidad:</p><ol><li>Identificá la <b>necesidad</b> u oportunidad.</li><li>Diseñá y <b>planificá</b> la solución.</li><li>Desarrollá con herramientas TIC.</li><li>Evaluá y proponé <b>mejoras</b>.</li></ol>" },

      /* ===== ORIENTACIÓN PRE-LABORAL (Orientación 1° medio · proyecto de vida y trabajo) ===== */
      { id: "l_la1", course: "c_lab", title: "Mi proyecto de vida", mins: 24, oa: "OR1M OA 10", body: "<p>Un <b>proyecto de vida</b> es el plan de lo que querés lograr, considerando tus habilidades, motivaciones y metas.</p><ul><li>Autoconocimiento: ¿qué me gusta y qué se me da bien?</li><li>Metas de corto, mediano y largo plazo.</li><li>Las decisiones de hoy influyen en tu futuro.</li></ul>" },
      { id: "l_la2", course: "c_lab", title: "Caminos académicos y laborales", mins: 23, oa: "OR1M OA 09", body: "<p>Al terminar la educación media hay distintos <b>caminos</b>:</p><ul><li>Educación superior: universidad, instituto profesional (IP) o centro de formación técnica (CFT).</li><li>Formación técnico-profesional y oficios.</li><li>Mundo del trabajo directo.</li></ul><p>Reconocé tus intereses y habilidades para elegir mejor.</p>" },
      { id: "l_la3", course: "c_lab", title: "Cómo armar tu CV", mins: 22, oa: "OR1M OA 09", body: "<p>Un buen <b>CV</b> es claro y breve. Incluye:</p><ul><li>Datos de contacto</li><li>Perfil personal (2-3 líneas)</li><li>Experiencia y formación</li><li>Habilidades</li></ul><p>Usá verbos de acción y adaptá el CV a cada puesto.</p>" },
      { id: "l_la4", course: "c_lab", title: "La entrevista laboral", mins: 26, oa: "OR1M OA 09", body: "<p>Claves para una entrevista:</p><ul><li>Investigá la empresa antes.</li><li>Llegá puntual y con presentación cuidada.</li><li>Escuchá y respondé con ejemplos concretos.</li><li>Prepará 2 preguntas para el entrevistador.</li></ul>" },
      { id: "l_la5", course: "c_lab", title: "Habilidades para el trabajo y trabajo en equipo", mins: 23, oa: "OR1M OA 05", body: "<p>Las <b>habilidades blandas</b> son muy valoradas en el trabajo:</p><ul><li><b>Comunicación</b> clara y respetuosa.</li><li><b>Trabajo en equipo</b> y colaboración.</li><li><b>Responsabilidad</b> y puntualidad.</li><li>Resolución de conflictos buscando acuerdos.</li></ul>" },
      { id: "l_la6", course: "c_lab", title: "Vida saludable y manejo del estrés", mins: 21, oa: "OR1M OA 04", body: "<p>El bienestar personal sostiene tus metas. Hábitos saludables:</p><ul><li>Alimentación equilibrada y actividad física.</li><li>Buen descanso y uso positivo del tiempo libre.</li><li>Manejo del <b>estrés</b>: organización, pausas y pedir ayuda a tus <b>redes de apoyo</b>.</li></ul>" },
    ],
    quizzes: [
      { id: "q1", course: "c_mat", title: "Autoevaluación: Funciones y álgebra", questions: [
        { q: "¿Qué representa la 'm' en f(x)=mx+b?", opts: ["La pendiente", "La ordenada al origen", "El eje X"], correct: 0 },
        { q: "Si m es negativa, la función...", opts: ["Crece", "Decrece", "Es constante"], correct: 1 },
        { q: "(a+b)(a−b) es igual a...", opts: ["a² + b²", "a² − b²", "a² − 2ab + b²"], correct: 1 },
        { q: "En el sistema x+y=10, x−y=2, el valor de x es...", opts: ["4", "6", "8"], correct: 1 },
      ]},
      { id: "q_ma2", course: "c_mat", title: "Quiz: Racionales y potencias", questions: [
        { q: "1/2 + 1/3 es igual a...", opts: ["2/5", "5/6", "1/6"], correct: 1 },
        { q: "aᵐ · aⁿ es igual a...", opts: ["aᵐ⁺ⁿ", "aᵐ⁻ⁿ", "aᵐ·ⁿ"], correct: 0 },
        { q: "a⁰ es igual a...", opts: ["0", "1", "a"], correct: 1 },
      ]},
      { id: "q2", course: "c_prog", title: "Autoevaluación: Variables y lógica", questions: [
        { q: "¿Cómo se declara una constante en JS?", opts: ["const", "var fija", "let final"], correct: 0 },
        { q: "El valor true / false es de tipo...", opts: ["String", "Booleano", "Número"], correct: 1 },
        { q: "Dividir un problema en partes más pequeñas se llama...", opts: ["Abstracción", "Descomposición", "Iteración"], correct: 1 },
        { q: "¿Qué estructura repite instrucciones?", opts: ["El bucle (for/while)", "El condicional if", "La variable"], correct: 0 },
      ]},
      { id: "q3", course: "c_lab", title: "Autoevaluación: Proyecto de vida y empleo", questions: [
        { q: "Un buen CV debe ser...", opts: ["Largo y detallado", "Claro y breve", "Sin habilidades"], correct: 1 },
        { q: "Antes de una entrevista conviene...", opts: ["Investigar la empresa", "Llegar tarde", "No preparar nada"], correct: 0 },
        { q: "Una habilidad blanda muy valorada es...", opts: ["El trabajo en equipo", "Escribir rápido", "Saber de memoria"], correct: 0 },
        { q: "Un CFT ofrece...", opts: ["Formación técnica", "Solo posgrados", "Educación básica"], correct: 0 },
      ]},
      { id: "q4", course: "c_cs", title: "Autoevaluación: Biología y química", questions: [
        { q: "La unidad básica de la vida es...", opts: ["El átomo", "La célula", "El tejido"], correct: 1 },
        { q: "¿Qué célula NO tiene núcleo definido?", opts: ["Procariota", "Eucariota", "Vegetal"], correct: 0 },
        { q: "Según Darwin, sobreviven los individuos...", opts: ["Más grandes", "Mejor adaptados", "Más rápidos"], correct: 1 },
        { q: "La ley de conservación de la materia dice que los átomos...", opts: ["Se destruyen", "Se crean", "No se crean ni destruyen"], correct: 2 },
      ]},
      { id: "q_cs2", course: "c_cs", title: "Quiz: Ecosistemas y ondas", questions: [
        { q: "El proceso por el que las plantas captan energía solar es...", opts: ["Respiración", "Fotosíntesis", "Digestión"], correct: 1 },
        { q: "Una onda transporta...", opts: ["Materia", "Energía", "Átomos"], correct: 1 },
        { q: "El nivel que agrupa individuos de una misma especie es la...", opts: ["Comunidad", "Población", "Biósfera"], correct: 1 },
      ]},
      { id: "q_hi1", course: "c_his", title: "Quiz: Siglo XIX e industrialización", questions: [
        { q: "La Revolución Industrial se basó en...", opts: ["El trabajo manual", "Las máquinas y el vapor", "La agricultura de subsistencia"], correct: 1 },
        { q: "El liberalismo defiende...", opts: ["La monarquía absoluta", "Las libertades individuales", "La ausencia de leyes"], correct: 1 },
        { q: "El imperialismo europeo buscaba...", opts: ["Materias primas y mercados", "Aislarse del mundo", "Reducir el comercio"], correct: 0 },
      ]},
      { id: "q_hi2", course: "c_his", title: "Quiz: Economía y ciudadanía", questions: [
        { q: "El problema económico nace de la...", opts: ["Abundancia", "Escasez", "Igualdad"], correct: 1 },
        { q: "El precio en un mercado surge de...", opts: ["La oferta y la demanda", "El clima", "El gobierno solamente"], correct: 0 },
        { q: "Participar votando es un derecho...", opts: ["Civil", "Político", "Comercial"], correct: 1 },
      ]},
      { id: "q5", course: "c_ing", title: "Quiz: Present simple & skills", questions: [
        { q: "She ___ in a shop.", opts: ["work", "works", "working"], correct: 1 },
        { q: "'Nice to meet you' significa...", opts: ["Un gusto conocerte", "Nos vemos", "¿Cómo estás?"], correct: 0 },
        { q: "Negación correcta:", opts: ["I no work", "I don't work", "I not work"], correct: 1 },
        { q: "Leer rápido para captar la idea general es...", opts: ["Skimming", "Scanning", "Editing"], correct: 0 },
      ]},
      { id: "q6", course: "c_dig", title: "Quiz: Competencias digitales", questions: [
        { q: "Para hacer un presupuesto con sumas conviene usar...", opts: ["Procesador de texto", "Planilla de cálculo", "Presentación"], correct: 1 },
        { q: "Un email laboral debe tener...", opts: ["Asunto claro y firma", "Solo emojis", "Ningún saludo"], correct: 0 },
        { q: "El engaño para robar datos por correo se llama...", opts: ["Phishing", "Streaming", "Hashtag"], correct: 0 },
        { q: "Antes de confiar en una web conviene revisar...", opts: ["El autor y la fecha", "Solo el color", "La cantidad de imágenes"], correct: 0 },
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
