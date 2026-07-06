/* ===== Brain Schooling — datos semilla y capa de persistencia ===== */
const DB_KEY = "brain_schooling_db_v4";

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

      /* ============================ 2° MEDIO ============================ */
      /* --- Matemática 2° (MA2M) --- */
      { id: "l2_ma1", course: "c_mat", nivel: "2M", title: "Números reales y raíces", mins: 26, oa: "MA2M OA 01", body: "<p>Los <b>números reales (ℝ)</b> incluyen racionales e irracionales (como √2 o π).</p><ul><li>Una <b>raíz</b> <code>√a</code> es el número que elevado al cuadrado da a.</li><li>Se pueden descomponer: <code>√12 = √4·√3 = 2√3</code>.</li><li>Propiedades: <code>√a·√b = √(ab)</code>.</li></ul>" },
      { id: "l2_ma2", course: "c_mat", nivel: "2M", title: "Función y ecuación cuadrática", mins: 30, oa: "MA2M OA 03", body: "<p>La <b>función cuadrática</b> tiene la forma <code>f(x)=ax²+bx+c</code> y su gráfico es una <b>parábola</b>.</p><ul><li>El signo de <b>a</b> indica si abre hacia arriba o abajo.</li><li>Las <b>raíces</b> (donde corta el eje X) se hallan con la fórmula general.</li><li>El vértice es el punto máximo o mínimo.</li></ul>" },
      { id: "l2_ma3", course: "c_mat", nivel: "2M", title: "Trigonometría en el triángulo rectángulo", mins: 28, oa: "MA2M OA 08", body: "<p>Las <b>razones trigonométricas</b> relacionan los lados de un triángulo rectángulo con sus ángulos.</p><ul><li><b>seno</b> = cateto opuesto / hipotenusa</li><li><b>coseno</b> = cateto adyacente / hipotenusa</li><li><b>tangente</b> = opuesto / adyacente</li></ul><p>Sirven para calcular alturas y distancias inaccesibles.</p>" },
      /* --- Lengua 2° (LE2M) --- */
      { id: "l2_le1", course: "c_len", nivel: "2M", title: "Análisis de la narrativa", mins: 24, oa: "LE2M OA 03", body: "<p>Profundizamos el análisis narrativo:</p><ul><li><b>Tipos de narrador</b> y su grado de conocimiento.</li><li><b>Tiempo del relato</b>: raconto, flashback, in media res.</li><li><b>Estilo</b>: directo, indirecto e indirecto libre.</li></ul>" },
      { id: "l2_le2", course: "c_len", nivel: "2M", title: "Literatura del Siglo de Oro", mins: 23, oa: "LE2M OA 06", body: "<p>El <b>Siglo de Oro</b> español (s. XVI–XVII) fue un período de esplendor literario.</p><ul><li>Autores como Cervantes, Lope de Vega y Quevedo.</li><li>Formas: la novela moderna (Don Quijote), el teatro y la poesía barroca.</li></ul>" },
      { id: "l2_le3", course: "c_len", nivel: "2M", title: "Escribir un ensayo argumentativo", mins: 26, oa: "LE2M OA 14", body: "<p>El <b>ensayo argumentativo</b> defiende una postura con razones.</p><ol><li>Introducción con la tesis.</li><li>Desarrollo: un argumento y su evidencia por párrafo.</li><li>Contraargumento y refutación.</li><li>Conclusión.</li></ol>" },
      /* --- Programación 2° --- */
      { id: "l2_pr1", course: "c_prog", nivel: "2M", title: "Algoritmos y diagramas de flujo", mins: 25, oa: "TE2M OA 01", body: "<p>Un <b>diagrama de flujo</b> representa un algoritmo con símbolos.</p><ul><li>Óvalo: inicio/fin.</li><li>Rectángulo: acción.</li><li>Rombo: decisión (sí/no).</li></ul><p>Ayuda a planificar antes de programar.</p>" },
      { id: "l2_pr2", course: "c_prog", nivel: "2M", title: "Funciones y modularidad", mins: 27, oa: "TE2M OA 02", body: "<p>Una <b>función</b> agrupa instrucciones reutilizables.</p><p><code>function saludar(nombre) { return 'Hola ' + nombre; }</code></p><ul><li>Recibe <b>parámetros</b> y puede <b>retornar</b> un valor.</li><li>La <b>modularidad</b> divide el programa en partes más fáciles de mantener.</li></ul>" },
      { id: "l2_pr3", course: "c_prog", nivel: "2M", title: "Depurar y probar el código", mins: 24, oa: "TE2M OA 03", body: "<p><b>Depurar</b> (debug) es encontrar y corregir errores.</p><ul><li>Errores de <b>sintaxis</b>: el código no funciona.</li><li>Errores de <b>lógica</b>: funciona pero da un resultado incorrecto.</li><li>Probá con distintos casos y usá <code>console.log()</code> para inspeccionar.</li></ul>" },
      /* --- Orientación Pre-Laboral 2° --- */
      { id: "l2_la1", course: "c_lab", nivel: "2M", title: "Autoconocimiento y vocación", mins: 22, oa: "OR2M OA 01", body: "<p>Conocerte es la base de tu proyecto de vida.</p><ul><li>Identificá tus <b>intereses</b>, <b>aptitudes</b> y <b>valores</b>.</li><li>La <b>vocación</b> une lo que te gusta con lo que sabés hacer.</li><li>Explorá áreas y oficios sin miedo a equivocarte.</li></ul>" },
      { id: "l2_la2", course: "c_lab", nivel: "2M", title: "Habilidades socioemocionales", mins: 23, oa: "OR2M OA 02", body: "<p>Las <b>habilidades socioemocionales</b> ayudan en la vida y el trabajo:</p><ul><li>Autorregulación de emociones.</li><li>Empatía y comunicación.</li><li>Perseverancia y adaptación al cambio.</li></ul>" },
      { id: "l2_la3", course: "c_lab", nivel: "2M", title: "Redes de apoyo y decisiones", mins: 21, oa: "OR2M OA 03", body: "<p>Tomar buenas decisiones implica:</p><ul><li>Reconocer opciones y sus consecuencias.</li><li>Buscar información confiable.</li><li>Apoyarte en tus <b>redes</b>: familia, docentes y orientación.</li></ul>" },
      /* --- Ciencias Naturales 2° (CN2M) --- */
      { id: "l2_cs1", course: "c_cs", nivel: "2M", title: "Sistema nervioso y coordinación", mins: 27, oa: "CN2M OA 01", body: "<p>El <b>sistema nervioso</b> coordina las respuestas del cuerpo ante estímulos.</p><ul><li><b>Neuronas</b> transmiten impulsos eléctricos.</li><li>Sistema nervioso central (cerebro y médula) y periférico.</li><li>El <b>arco reflejo</b> es una respuesta rápida e involuntaria.</li></ul>" },
      { id: "l2_cs2", course: "c_cs", nivel: "2M", title: "Herencia y genética de Mendel", mins: 28, oa: "CN2M OA 07", body: "<p><b>Gregor Mendel</b> descubrió las leyes de la herencia.</p><ul><li><b>Genes</b> y <b>alelos</b> (dominante y recesivo).</li><li>Genotipo (información) vs. fenotipo (característica visible).</li><li>Cruzamientos y probabilidad con el cuadro de Punnett.</li></ul>" },
      { id: "l2_cs3", course: "c_cs", nivel: "2M", title: "Las leyes de Newton", mins: 27, oa: "CN2M OA 10", body: "<p>Las <b>tres leyes de Newton</b> explican el movimiento:</p><ul><li><b>1ª (inercia)</b>: un cuerpo mantiene su estado si no actúa una fuerza.</li><li><b>2ª</b>: F = m·a (fuerza = masa × aceleración).</li><li><b>3ª (acción y reacción)</b>: toda fuerza genera una igual y opuesta.</li></ul>" },
      /* --- Historia 2° (HI2M) --- */
      { id: "l2_hi1", course: "c_his", nivel: "2M", title: "El período de entreguerras", mins: 25, oa: "HI2M OA 02", body: "<p>Entre 1918 y 1939 el mundo vivió crisis y tensiones:</p><ul><li>La <b>Gran Depresión</b> de 1929 y el desempleo masivo.</li><li>Ascenso de los <b>totalitarismos</b> (fascismo y nazismo).</li><li>Vanguardias artísticas y cambios culturales.</li></ul>" },
      { id: "l2_hi2", course: "c_his", nivel: "2M", title: "Segunda Guerra Mundial y Guerra Fría", mins: 28, oa: "HI2M OA 03", body: "<p>La <b>Segunda Guerra Mundial</b> (1939–1945) fue el conflicto más letal de la historia, con el Holocausto y la bomba atómica.</p><p>Le siguió la <b>Guerra Fría</b>: la rivalidad ideológica entre EE.UU. y la URSS que dividió al mundo.</p>" },
      { id: "l2_hi3", course: "c_his", nivel: "2M", title: "Chile: dictadura y transición a la democracia", mins: 27, oa: "HI2M OA 16", body: "<p>En 1973 un golpe de Estado inició una <b>dictadura militar</b> en Chile (1973–1990) marcada por violaciones a los <b>derechos humanos</b> y un modelo económico neoliberal.</p><p>El plebiscito de 1988 abrió la <b>transición a la democracia</b>.</p>" },
      /* --- Inglés 2° (IN2M) --- */
      { id: "l2_in1", course: "c_ing", nivel: "2M", title: "Past tenses: telling experiences", mins: 24, oa: "IN2M OA 13", body: "<p>Para narrar en pasado usamos:</p><ul><li><b>Past simple</b>: <i>I visited / She went</i>.</li><li><b>Past continuous</b>: <i>I was reading</i>.</li><li>Verbos regulares (-ed) e irregulares (go→went).</li></ul>" },
      { id: "l2_in2", course: "c_ing", nivel: "2M", title: "Conditionals", mins: 25, oa: "IN2M OA 08", body: "<p>Los <b>conditionals</b> expresan condiciones:</p><ul><li><b>Zero</b>: <i>If you heat ice, it melts.</i></li><li><b>First</b>: <i>If it rains, I will stay home.</i></li><li><b>Second</b>: <i>If I had money, I would travel.</i></li></ul>" },
      { id: "l2_in3", course: "c_ing", nivel: "2M", title: "Reading for main ideas", mins: 23, oa: "IN2M OA 10", body: "<p>Para identificar la idea principal de un texto:</p><ul><li>Fijate en el <b>título</b> y la primera oración de cada párrafo.</li><li>Distinguí idea principal de detalles de apoyo.</li><li>Reconocé <b>word derivations</b> (happy→happiness).</li></ul>" },
      /* --- Competencias Digitales 2° --- */
      { id: "l2_di1", course: "c_dig", nivel: "2M", title: "Planilla de cálculo con fórmulas", mins: 26, oa: "TE2M OA 04", body: "<p>Las <b>fórmulas</b> automatizan cálculos en una planilla:</p><ul><li><code>=SUMA(A1:A10)</code> suma un rango.</li><li><code>=PROMEDIO(...)</code>, <code>=SI(...)</code>.</li><li>Las <b>referencias</b> pueden ser relativas o absolutas ($A$1).</li></ul>" },
      { id: "l2_di2", course: "c_dig", nivel: "2M", title: "Presentaciones efectivas", mins: 22, oa: "TE2M OA 04", body: "<p>Una buena presentación comunica con claridad:</p><ul><li>Una idea por diapositiva; poco texto.</li><li>Imágenes y gráficos que apoyen el mensaje.</li><li>Contraste y tipografía legible.</li></ul>" },
      { id: "l2_di3", course: "c_dig", nivel: "2M", title: "Colaboración en la nube", mins: 21, oa: "TE2M OA 04", body: "<p>Las herramientas en la <b>nube</b> permiten trabajar en equipo:</p><ul><li>Documentos compartidos y edición simultánea.</li><li>Comentarios e historial de versiones.</li><li>Organizar carpetas y permisos.</li></ul>" },

      /* ============================ 3° MEDIO ============================ */
      /* --- Matemática 3° (Formación General) --- */
      { id: "l3_ma1", course: "c_mat", nivel: "3M", title: "Probabilidad condicional y decisiones", mins: 27, oa: "MAT 3°M · Probabilidad", body: "<p>La <b>probabilidad condicional</b> P(A|B) es la probabilidad de A sabiendo que ocurrió B.</p><p>Permite tomar <b>decisiones informadas</b> en situaciones de incertidumbre, como diagnósticos médicos o pronósticos.</p>" },
      { id: "l3_ma2", course: "c_mat", nivel: "3M", title: "Estadística: dispersión y correlación", mins: 26, oa: "MAT 3°M · Estadística", body: "<p>Para describir datos usamos medidas de <b>dispersión</b>:</p><ul><li><b>Rango</b>, <b>varianza</b> y <b>desviación estándar</b>.</li><li>La <b>correlación</b> mide si dos variables se relacionan (positiva, negativa o nula).</li></ul>" },
      { id: "l3_ma3", course: "c_mat", nivel: "3M", title: "Interés compuesto y finanzas", mins: 25, oa: "MA2M OA 06", body: "<p>El <b>interés compuesto</b> genera intereses sobre los intereses acumulados.</p><p>Fórmula: <code>C = C₀·(1+i)ⁿ</code>. Es clave para entender ahorros, créditos y deudas de tarjetas.</p>" },
      /* --- Lengua 3° (Formación General) --- */
      { id: "l3_le1", course: "c_len", nivel: "3M", title: "Interpretación de obras literarias", mins: 25, oa: "LE 3°M · Interpretación", body: "<p>Interpretar una obra es proponer un sentido fundamentado.</p><ul><li>Analizá el <b>contexto</b> de producción y recepción.</li><li>Considerá perspectivas, valores y visiones de mundo.</li><li>Sostené tu lectura con <b>evidencia textual</b>.</li></ul>" },
      { id: "l3_le2", course: "c_len", nivel: "3M", title: "El discurso público", mins: 24, oa: "LE 3°M · Oralidad", body: "<p>El <b>discurso público</b> se dirige a una audiencia amplia sobre temas de interés colectivo.</p><ul><li>Emisor con cierta autoridad; finalidad persuasiva o informativa.</li><li>Estructura: introducción, desarrollo y conclusión.</li><li>Recursos retóricos para convencer.</li></ul>" },
      { id: "l3_le3", course: "c_len", nivel: "3M", title: "Argumentación y debate", mins: 26, oa: "LE 3°M · Argumentación", body: "<p>El <b>debate</b> confronta posturas con argumentos.</p><ul><li>Tipos de argumentos: de autoridad, de causa, por ejemplo, analógico.</li><li>Detectá <b>falacias</b> (argumentos engañosos).</li><li>Escuchá y refutá con respeto.</li></ul>" },
      /* --- Programación 3° (Pensamiento Computacional y Programación) --- */
      { id: "l3_pr1", course: "c_prog", nivel: "3M", title: "Abstracción y organización de datos", mins: 27, oa: "PC OA 01", body: "<p>La <b>abstracción</b> se queda con lo esencial de un problema, ignorando detalles.</p><ul><li>Organizar datos en <b>listas</b> (arrays) y <b>objetos</b>.</li><li>Descomponer una solución en funciones.</li><li>Generalizar para resolver casos similares.</li></ul>" },
      { id: "l3_pr2", course: "c_prog", nivel: "3M", title: "Representar datos: texto, imagen y sonido", mins: 26, oa: "PC OA 02", body: "<p>Todo dato se representa como <b>números</b> en el computador:</p><ul><li><b>Texto</b>: cada carácter tiene un código (ASCII/Unicode).</li><li><b>Imagen</b>: una grilla de píxeles con valores de color (RGB).</li><li><b>Sonido</b>: muestras de una onda a lo largo del tiempo.</li></ul>" },
      { id: "l3_pr3", course: "c_prog", nivel: "3M", title: "Algoritmos para cálculos matemáticos", mins: 27, oa: "PC OA 03", body: "<p>Podemos programar algoritmos que calculen según una <b>regla o patrón</b>.</p><p>Ej: generar la serie de un patrón, calcular promedios o resolver una fórmula iterando con bucles.</p>" },
      /* --- Orientación Pre-Laboral 3° --- */
      { id: "l3_la1", course: "c_lab", nivel: "3M", title: "Derechos y deberes laborales", mins: 23, oa: "Formación Laboral", body: "<p>Todo trabajador tiene <b>derechos</b> protegidos por ley:</p><ul><li>Contrato, jornada y remuneración justa.</li><li>Descanso, vacaciones y seguridad social.</li><li>También deberes: responsabilidad y cumplimiento.</li></ul>" },
      { id: "l3_la2", course: "c_lab", nivel: "3M", title: "Portafolio y postulación", mins: 22, oa: "Formación Laboral", body: "<p>Para postular a un trabajo o práctica:</p><ul><li>Preparás tu <b>CV</b> y una <b>carta de presentación</b>.</li><li>Un <b>portafolio</b> muestra tus trabajos y logros.</li><li>Cuidás tu presencia digital profesional.</li></ul>" },
      { id: "l3_la3", course: "c_lab", nivel: "3M", title: "Introducción al emprendimiento", mins: 24, oa: "Formación Laboral", body: "<p><b>Emprender</b> es crear valor identificando una oportunidad.</p><ul><li>Detectás un problema o necesidad.</li><li>Proponés una solución (producto o servicio).</li><li>Planificás recursos, costos y clientes.</li></ul>" },
      /* --- Ciencias para la Ciudadanía 3° --- */
      { id: "l3_cs1", course: "c_cs", nivel: "3M", title: "Bienestar y salud", mins: 25, oa: "CIC · Bienestar y salud", body: "<p>La <b>salud</b> es un estado de bienestar físico, mental y social.</p><ul><li>Hábitos: alimentación, actividad física y sueño.</li><li>Salud mental y manejo del estrés.</li><li>Prevención y acceso a la información científica.</li></ul>" },
      { id: "l3_cs2", course: "c_cs", nivel: "3M", title: "Ambiente y sostenibilidad", mins: 26, oa: "CIC · Ambiente", body: "<p>La <b>sostenibilidad</b> satisface las necesidades del presente sin comprometer al futuro.</p><ul><li>Cambio climático y huella de carbono.</li><li>Gestión de residuos y economía circular.</li><li>Energías renovables.</li></ul>" },
      { id: "l3_cs3", course: "c_cs", nivel: "3M", title: "Seguridad, prevención y autocuidado", mins: 24, oa: "CIC · Seguridad", body: "<p>La ciencia ayuda a <b>prevenir riesgos</b>:</p><ul><li>Chile es un país sísmico: preparación ante desastres.</li><li>Primeros auxilios y protocolos de emergencia.</li><li>Autocuidado y consumo responsable.</li></ul>" },
      /* --- Educación Ciudadana 3° --- */
      { id: "l3_hi1", course: "c_his", nivel: "3M", title: "Democracia y Estado de derecho", mins: 25, oa: "ECIU 3M · Democracia", body: "<p>La <b>democracia</b> se basa en la soberanía popular y las libertades fundamentales.</p><p>El <b>Estado de derecho</b> significa que todos, incluido el poder, se someten a la ley. Sus pilares: separación de poderes y respeto a la Constitución.</p>" },
      { id: "l3_hi2", course: "c_his", nivel: "3M", title: "Sistema judicial y acceso a la justicia", mins: 24, oa: "ECIU 3M · Justicia", body: "<p>El <b>sistema judicial</b> resuelve conflictos y protege los derechos.</p><ul><li>Tribunales independientes e imparciales.</li><li>El debido proceso y la presunción de inocencia.</li><li>Mecanismos de acceso a la justicia para toda la ciudadanía.</li></ul>" },
      { id: "l3_hi3", course: "c_his", nivel: "3M", title: "Riesgos para la democracia", mins: 24, oa: "ECIU 3M · Riesgos", body: "<p>La democracia enfrenta <b>amenazas</b> que hay que reconocer:</p><ul><li>Desafección y baja participación política.</li><li>Desigualdad, corrupción y desinformación.</li><li>La ciudadanía activa la fortalece.</li></ul>" },
      /* --- Inglés 3° --- */
      { id: "l3_in1", course: "c_ing", nivel: "3M", title: "Modals & future forms", mins: 24, oa: "Inglés 3°M", body: "<p>Los <b>modal verbs</b> expresan posibilidad, obligación o consejo:</p><ul><li><i>can / could</i> (habilidad), <i>must / should</i> (obligación/consejo).</li><li>Futuro: <i>will</i> y <i>be going to</i>.</li></ul>" },
      { id: "l3_in2", course: "c_ing", nivel: "3M", title: "Listening to media & discussions", mins: 23, oa: "Inglés 3°M", body: "<p>Estrategias para comprender audios reales:</p><ul><li>Anticipá el contexto y el propósito.</li><li>Captá <b>key words</b> y el tono del hablante.</li><li>Tolerá no entender cada palabra.</li></ul>" },
      { id: "l3_in3", course: "c_ing", nivel: "3M", title: "Giving a presentation", mins: 24, oa: "Inglés 3°M", body: "<p>Para exponer en inglés:</p><ul><li>Estructura: <i>introduction, body, conclusion</i>.</li><li>Conectores: <i>first, then, however, finally</i>.</li><li>Practicá pronunciación y contacto visual.</li></ul>" },
      /* --- Competencias Digitales 3° --- */
      { id: "l3_di1", course: "c_dig", nivel: "3M", title: "Análisis de datos y gráficos", mins: 26, oa: "Tecnología · Datos", body: "<p>Los <b>datos</b> se convierten en información con gráficos adecuados:</p><ul><li>Gráfico de barras: comparar categorías.</li><li>De líneas: evolución en el tiempo.</li><li>Circular: proporciones de un total.</li></ul>" },
      { id: "l3_di2", course: "c_dig", nivel: "3M", title: "Seguridad de la información", mins: 24, oa: "Tecnología · Seguridad", body: "<p>Proteger la información es clave:</p><ul><li>Contraseñas fuertes y verificación en dos pasos.</li><li>Copias de seguridad (backup).</li><li>Reconocer <b>phishing</b> y software malicioso.</li></ul>" },
      { id: "l3_di3", course: "c_dig", nivel: "3M", title: "Identidad y reputación digital", mins: 22, oa: "Tecnología · Ciudadanía", body: "<p>Tu <b>identidad digital</b> es la imagen que proyectás en línea.</p><ul><li>La <b>huella digital</b> es difícil de borrar.</li><li>Cuidá lo que publicás: puede afectar estudios o empleo.</li><li>Configurá tu privacidad.</li></ul>" },

      /* ============================ 4° MEDIO ============================ */
      /* --- Matemática 4° (Formación General) --- */
      { id: "l4_ma1", course: "c_mat", nivel: "4M", title: "Modelos exponenciales y logarítmicos", mins: 27, oa: "MAT 4°M · Modelos", body: "<p>Muchos fenómenos crecen o decrecen de forma <b>exponencial</b>: población, virus, intereses.</p><ul><li>Función exponencial: <code>f(x)=a·bˣ</code>.</li><li>El <b>logaritmo</b> es la operación inversa y ayuda a despejar el exponente.</li></ul>" },
      { id: "l4_ma2", course: "c_mat", nivel: "4M", title: "Vectores y geometría analítica", mins: 26, oa: "MAT 4°M · Geometría", body: "<p>Un <b>vector</b> tiene magnitud y dirección.</p><ul><li>Se representa en el plano cartesiano por sus componentes (x, y).</li><li>Se suman componente a componente.</li><li>Se usan en física, gráficos y navegación.</li></ul>" },
      { id: "l4_ma3", course: "c_mat", nivel: "4M", title: "Inferencia estadística y muestreo", mins: 26, oa: "MAT 4°M · Inferencia", body: "<p>La <b>inferencia</b> saca conclusiones sobre una población a partir de una <b>muestra</b>.</p><ul><li>La muestra debe ser <b>representativa</b> y aleatoria.</li><li>Los resultados tienen un margen de error.</li><li>Base de encuestas y estudios.</li></ul>" },
      /* --- Lengua 4° (Formación General) --- */
      { id: "l4_le1", course: "c_len", nivel: "4M", title: "Literatura y visiones de mundo", mins: 25, oa: "LE 4°M · Literatura", body: "<p>La literatura expresa distintas <b>visiones de mundo</b> según su época y cultura.</p><ul><li>Compará obras de diferentes contextos.</li><li>Relacioná temas universales: amor, poder, libertad, identidad.</li></ul>" },
      { id: "l4_le2", course: "c_len", nivel: "4M", title: "Análisis crítico de los medios", mins: 24, oa: "LE 4°M · Medios", body: "<p>Los medios construyen representaciones de la realidad.</p><ul><li>Identificá el <b>punto de vista</b> y los intereses detrás.</li><li>Distinguí información de opinión y publicidad.</li><li>Contrastá fuentes y detectá <b>desinformación</b>.</li></ul>" },
      { id: "l4_le3", course: "c_len", nivel: "4M", title: "Escritura académica", mins: 26, oa: "LE 4°M · Escritura", body: "<p>El <b>texto académico</b> comunica ideas con rigor.</p><ul><li>Estructura clara y registro formal.</li><li>Citas y referencias de las fuentes.</li><li>Objetividad y coherencia argumentativa.</li></ul>" },
      /* --- Programación 4° --- */
      { id: "l4_pr1", course: "c_prog", nivel: "4M", title: "Apps para móviles y sensores", mins: 27, oa: "PC OA 05", body: "<p>Se pueden crear <b>aplicaciones</b> para dispositivos móviles y con sensores.</p><ul><li>Sensores: cámara, GPS, acelerómetro.</li><li>Interfaz de usuario y eventos (toques).</li><li>Herramientas visuales como App Inventor.</li></ul>" },
      { id: "l4_pr2", course: "c_prog", nivel: "4M", title: "Datos y análisis con programación", mins: 26, oa: "PC OA 04", body: "<p>La programación permite <b>analizar datos</b> a gran escala.</p><ul><li>Leer y procesar conjuntos de datos.</li><li>Calcular estadísticas y generar gráficos.</li><li>Herramientas de análisis y geometría dinámica.</li></ul>" },
      { id: "l4_pr3", course: "c_prog", nivel: "4M", title: "Uso ético de los datos personales", mins: 24, oa: "PC OA 06", body: "<p>Usar la tecnología de forma <b>responsable</b>:</p><ul><li>Consentimiento y privacidad de los datos.</li><li>Derecho de las personas sobre su información.</li><li>Evitar sesgos y usos discriminatorios.</li></ul>" },
      /* --- Orientación Pre-Laboral 4° --- */
      { id: "l4_la1", course: "c_lab", nivel: "4M", title: "Transición a la vida adulta", mins: 23, oa: "Proyecto de Vida", body: "<p>Terminar la enseñanza media abre nuevas responsabilidades:</p><ul><li>Autonomía personal y económica.</li><li>Organización del tiempo y las metas.</li><li>Tomar decisiones informadas sobre el futuro.</li></ul>" },
      { id: "l4_la2", course: "c_lab", nivel: "4M", title: "Educación superior y financiamiento", mins: 24, oa: "Proyecto de Vida", body: "<p>Opciones para seguir estudiando en Chile:</p><ul><li>Universidad, IP y CFT.</li><li>Prueba de admisión (PAES) y postulación.</li><li>Financiamiento: <b>gratuidad</b>, becas y créditos.</li></ul>" },
      { id: "l4_la3", course: "c_lab", nivel: "4M", title: "Plan de inserción laboral", mins: 23, oa: "Proyecto de Vida", body: "<p>Un <b>plan de inserción</b> ordena tu búsqueda de empleo:</p><ul><li>Definí objetivo y sector.</li><li>Actualizá CV y portafolio.</li><li>Red de contactos y preparación de entrevistas.</li></ul>" },
      /* --- Ciencias para la Ciudadanía 4° --- */
      { id: "l4_cs1", course: "c_cs", nivel: "4M", title: "Tecnología y sociedad", mins: 25, oa: "CIC · Tecnología", body: "<p>La <b>tecnología</b> transforma la vida y plantea desafíos éticos.</p><ul><li>Impacto de la automatización y la IA en el trabajo.</li><li>Brecha digital y acceso.</li><li>Decisiones informadas sobre su uso.</li></ul>" },
      { id: "l4_cs2", course: "c_cs", nivel: "4M", title: "Consumo sostenible y ciclo de vida", mins: 26, oa: "CIC · Ambiente", body: "<p>El <b>ciclo de vida</b> de un producto va de la materia prima al residuo.</p><ul><li>Reducir, reutilizar y reciclar.</li><li>Consumo responsable e informado.</li><li>Estrategias para mitigar el impacto ambiental.</li></ul>" },
      { id: "l4_cs3", course: "c_cs", nivel: "4M", title: "Ciencia para decisiones informadas", mins: 24, oa: "CIC · Ciencia y sociedad", body: "<p>La <b>evidencia científica</b> orienta decisiones personales y públicas.</p><ul><li>Distinguir ciencia de pseudociencia.</li><li>Evaluar riesgos y beneficios.</li><li>Participar en debates con base científica.</li></ul>" },
      /* --- Educación Ciudadana 4° --- */
      { id: "l4_hi1", course: "c_his", nivel: "4M", title: "Participación ciudadana y bien común", mins: 24, oa: "ECIU 4M · Participación", body: "<p>La <b>participación</b> es esencial en democracia:</p><ul><li>Voto, organizaciones sociales y voluntariado.</li><li>El <b>bien común</b> sobre el interés individual.</li><li>Corresponsabilidad en la vida pública.</li></ul>" },
      { id: "l4_hi2", course: "c_his", nivel: "4M", title: "Derechos humanos", mins: 24, oa: "ECIU 4M · DDHH", body: "<p>Los <b>derechos humanos</b> son universales, inalienables e indivisibles.</p><ul><li>Declaración Universal de 1948.</li><li>Instituciones que los protegen.</li><li>Su vigencia y desafíos actuales.</li></ul>" },
      { id: "l4_hi3", course: "c_his", nivel: "4M", title: "Desarrollo sustentable y ciudadanía global", mins: 25, oa: "ECIU 4M · Sustentabilidad", body: "<p>El <b>desarrollo sustentable</b> equilibra lo económico, social y ambiental.</p><ul><li>Objetivos de Desarrollo Sostenible (ODS) de la ONU.</li><li>Ciudadanía global y problemas compartidos.</li><li>Acción local con impacto global.</li></ul>" },
      /* --- Inglés 4° --- */
      { id: "l4_in1", course: "c_ing", nivel: "4M", title: "Reported speech", mins: 24, oa: "Inglés 4°M", body: "<p>El <b>reported speech</b> cuenta lo que otro dijo:</p><ul><li>Directo: <i>She said: 'I am tired'.</i></li><li>Reportado: <i>She said she was tired.</i></li><li>Cambian los tiempos verbales y pronombres.</li></ul>" },
      { id: "l4_in2", course: "c_ing", nivel: "4M", title: "Academic & formal writing", mins: 25, oa: "Inglés 4°M", body: "<p>La escritura formal en inglés:</p><ul><li>Evitá contracciones y lenguaje coloquial.</li><li>Conectores formales: <i>therefore, moreover, in conclusion</i>.</li><li>Estructura clara y vocabulario preciso.</li></ul>" },
      { id: "l4_in3", course: "c_ing", nivel: "4M", title: "The job interview in English", mins: 24, oa: "Inglés 4°M", body: "<p>Prepararte para una <b>entrevista en inglés</b>:</p><ul><li>Frases clave: <i>Tell me about yourself / My strengths are...</i></li><li>Hablá de tu experiencia y metas.</li><li>Preguntá con cortesía sobre el puesto.</li></ul>" },
      /* --- Competencias Digitales 4° --- */
      { id: "l4_di1", course: "c_dig", nivel: "4M", title: "Herramientas digitales para el empleo", mins: 25, oa: "Tecnología · Empleo", body: "<p>El mundo laboral es digital:</p><ul><li>Perfil profesional en línea (tipo LinkedIn).</li><li>Portafolio y CV digital.</li><li>Videollamadas y trabajo remoto.</li></ul>" },
      { id: "l4_di2", course: "c_dig", nivel: "4M", title: "Automatización y productividad", mins: 24, oa: "Tecnología · Productividad", body: "<p>Automatizar tareas ahorra tiempo:</p><ul><li>Plantillas y respuestas automáticas.</li><li>Fórmulas y macros en planillas.</li><li>Organización con calendarios y gestores de tareas.</li></ul>" },
      { id: "l4_di3", course: "c_dig", nivel: "4M", title: "Inteligencia artificial: usos y ética", mins: 26, oa: "Tecnología · IA", body: "<p>La <b>inteligencia artificial</b> ya está en la vida diaria.</p><ul><li>Usos: asistentes, recomendaciones, traducción.</li><li>Límites: errores, sesgos y necesidad de supervisión humana.</li><li>Uso ético y responsable.</li></ul>" },
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
      /* --- 2° medio --- */
      { id: "q2_ma", course: "c_mat", nivel: "2M", title: "Quiz 2°: Cuadráticas y trigonometría", questions: [
        { q: "El gráfico de f(x)=ax²+bx+c es una...", opts: ["Recta", "Parábola", "Circunferencia"], correct: 1 },
        { q: "El seno de un ángulo es...", opts: ["opuesto / hipotenusa", "adyacente / hipotenusa", "opuesto / adyacente"], correct: 0 },
        { q: "√12 simplificado es...", opts: ["2√3", "3√2", "6"], correct: 0 },
      ]},
      { id: "q2_cs", course: "c_cs", nivel: "2M", title: "Quiz 2°: Newton y genética", questions: [
        { q: "La 2ª ley de Newton se expresa como...", opts: ["F = m·a", "E = m·c²", "v = d/t"], correct: 0 },
        { q: "El carácter que se manifiesta se llama...", opts: ["Recesivo", "Dominante", "Neutro"], correct: 1 },
        { q: "La respuesta rápida e involuntaria es el...", opts: ["Arco reflejo", "Pensamiento", "Sueño"], correct: 0 },
      ]},
      { id: "q2_hi", course: "c_his", nivel: "2M", title: "Quiz 2°: Siglo XX", questions: [
        { q: "La Gran Depresión ocurrió en...", opts: ["1929", "1945", "1973"], correct: 0 },
        { q: "La Guerra Fría enfrentó a...", opts: ["EE.UU. y la URSS", "Chile y Perú", "Roma y Cartago"], correct: 0 },
        { q: "El plebiscito de 1988 en Chile abrió la...", opts: ["Dictadura", "Transición a la democracia", "Independencia"], correct: 1 },
      ]},
      /* --- 3° medio --- */
      { id: "q3_pr", course: "c_prog", nivel: "3M", title: "Quiz 3°: Datos y abstracción", questions: [
        { q: "Una imagen digital se compone de...", opts: ["Píxeles con valores de color", "Solo texto", "Ondas de sonido"], correct: 0 },
        { q: "Quedarse con lo esencial de un problema es...", opts: ["Abstracción", "Depuración", "Compilación"], correct: 0 },
        { q: "Una lista o array sirve para...", opts: ["Organizar varios datos", "Apagar el equipo", "Cambiar el color"], correct: 0 },
      ]},
      { id: "q3_hi", course: "c_his", nivel: "3M", title: "Quiz 3°: Educación Ciudadana", questions: [
        { q: "El Estado de derecho significa que...", opts: ["Nadie está sobre la ley", "El rey manda solo", "No hay leyes"], correct: 0 },
        { q: "Un riesgo para la democracia es...", opts: ["La desinformación", "El voto", "La participación"], correct: 0 },
        { q: "La presunción de inocencia es parte del...", opts: ["Debido proceso", "Comercio", "Deporte"], correct: 0 },
      ]},
      /* --- 4° medio --- */
      { id: "q4_cs", course: "c_cs", nivel: "4M", title: "Quiz 4°: Ciencia y sociedad", questions: [
        { q: "El desarrollo sustentable equilibra economía, sociedad y...", opts: ["Ambiente", "Publicidad", "Deporte"], correct: 0 },
        { q: "La regla de las 3R es reducir, reutilizar y...", opts: ["Reciclar", "Repetir", "Rechazar"], correct: 0 },
        { q: "La IA necesita...", opts: ["Supervisión humana", "Nada de control", "Ser secreta"], correct: 0 },
      ]},
      { id: "q4_ma", course: "c_mat", nivel: "4M", title: "Quiz 4°: Modelos e inferencia", questions: [
        { q: "El crecimiento de una población suele modelarse como...", opts: ["Exponencial", "Constante", "Negativo siempre"], correct: 0 },
        { q: "Una muestra debe ser...", opts: ["Representativa y aleatoria", "Lo más pequeña posible", "Elegida a dedo"], correct: 0 },
        { q: "El logaritmo es la operación inversa de la...", opts: ["Potencia", "Suma", "Resta"], correct: 0 },
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
