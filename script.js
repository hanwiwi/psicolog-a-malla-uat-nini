
const materias = [
  {
    semestre: "SEMESTRE I",
    materias: [
      { nombre: "Procesos Mentales", creditos: 4 },
      { nombre: "Psicología de la Niñez y Adolescencia", creditos: 5 },
      { nombre: "Bases Biológicas del Comportamiento", creditos: 5 },
      { nombre: "Psicología Social y Ambiental", creditos: 4 },
      { nombre: "Fundamentos de la Psicomedición", creditos: 5 },
      { nombre: "Teorías y Sistemas Clásicos en Psicología", creditos: 4 },
      { nombre: "Epistemología", creditos: 4 },
      { nombre: "Competencias Digitales en Psicología", creditos: 4 },
      {
        nombre: "Habilita – Emocional", creditos: 3,
        opciones: [
          "Calidad de Vida y Bienestar",
          "Educación Emocional Integral",
          "Taller de Habilidades Socioemocionales"
        ]
      }
    ]
  },
  {
    semestre: "SEMESTRE II",
    materias: [
      { nombre: "Teorías y Sistemas Contemporáneos en Psicología", creditos: 4 },
      { nombre: "Fundamentos de la Entrevista", creditos: 5 },
      { nombre: "Estadística Descriptiva", creditos: 5 },
      { nombre: "Psicología de la Adultez", creditos: 4 },
      { nombre: "Psicofisiología", creditos: 5 },
      { nombre: "Teorías de la Personalidad", creditos: 4 },
      { nombre: "Psicología Organizacional", creditos: 4 },
      { nombre: "Psicología Educativa", creditos: 4 },
      {
        nombre: "Habilita – Comunicativa", creditos: 3,
        opciones: [
          "Competencia Comunicativa y Mundo Contemporáneo",
          "Comunicación Asertiva",
          "Comunicación de la Ciencia"
        ]
      }
    ]
  },
  {
    semestre: "SEMESTRE III",
    materias: [
      { nombre: "Estadística Inferencial", creditos: 4 },
      { nombre: "Neuropsicología", creditos: 4 },
      { nombre: "Técnicas de la Entrevista", creditos: 4, requisitos: ["Fundamentos de la Entrevista"] },
      { nombre: "Teoría Psicoanalítica", creditos: 4 },
      { nombre: "Trastornos del Desarrollo", creditos: 5 },
      { nombre: "Evaluación Psicológica Educativa", creditos: 6 },
      { nombre: "Intervención en el Ámbito Educativo", creditos: 4 },
      { nombre: "Psicología Clínica", creditos: 4 },
      {
        nombre: "Habilita – Conciencia Social", creditos: 3,
        opciones: [
          "Emprendimiento en Acción",
          "Emprendimiento en Acción y Conciencia Social",
          "Humanismo, Sociedad e Individuo",
          "Pensamiento Crítico"
        ]
      }
    ]
  }
  // Los semestres IV al IX se agregan en continuación (acortado aquí por longitud)
];

function crearMateria(materia, estadoGuardado) {
  const div = document.createElement("div");
  div.className = "materia bloqueada";
  div.innerText = `${materia.nombre} (${materia.creditos} créditos)`;
  if (!materia.requisitos) div.classList.remove("bloqueada");
  if (estadoGuardado.aprobadas?.includes(materia.nombre)) div.classList.add("aprobada");

  div.addEventListener("click", () => {
    if (div.classList.contains("bloqueada")) return;
    div.classList.toggle("aprobada");
    guardarEstado();
    actualizarCreditos();
    desbloquearMaterias();
  });

  if (materia.opciones) {
    const opcionesDiv = document.createElement("div");
    opcionesDiv.className = "opciones";
    materia.opciones.forEach(op => {
      const opcionBtn = document.createElement("div");
      opcionBtn.className = "opcion";
      opcionBtn.innerText = op;
      if (estadoGuardado.aprobadas?.includes(op)) opcionBtn.classList.add("aprobada");

      opcionBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        opcionBtn.classList.toggle("aprobada");
        guardarEstado();
        actualizarCreditos();
      });
      opcionesDiv.appendChild(opcionBtn);
    });
    div.appendChild(opcionesDiv);
  }

  return div;
}

function desbloquearMaterias() {
  const aprobadas = cargarEstado().aprobadas || [];
  document.querySelectorAll(".materia").forEach(div => {
    const nombre = div.childNodes[0].nodeValue.split(" (")[0];
    const materia = materias.flatMap(s => s.materias).find(m => m.nombre === nombre);
    if (!materia?.requisitos) return div.classList.remove("bloqueada");
    const cumplidos = materia.requisitos.every(r => aprobadas.includes(r));
    div.classList.toggle("bloqueada", !cumplidos);
  });
}

function actualizarCreditos() {
  const estado = cargarEstado();
  let total = 0;
  materias.forEach(sem => {
    sem.materias.forEach(m => {
      if (estado.aprobadas?.includes(m.nombre)) total += m.creditos;
      if (m.opciones) {
        m.opciones.forEach(o => {
          if (estado.aprobadas?.includes(o)) total += m.creditos / m.opciones.length;
        });
      }
    });
  });
  document.getElementById("creditos-totales").innerText = `Créditos Aprobados: ${Math.round(total)}`;
}

function guardarEstado() {
  const aprobadas = [];
  document.querySelectorAll(".materia.aprobada").forEach(div => {
    const nombre = div.childNodes[0].nodeValue.split(" (")[0];
    aprobadas.push(nombre);
  });
  document.querySelectorAll(".opcion.aprobada").forEach(op => {
    aprobadas.push(op.innerText);
  });
  localStorage.setItem("estadoMalla", JSON.stringify({ aprobadas }));
}

function cargarEstado() {
  return JSON.parse(localStorage.getItem("estadoMalla") || "{}");
}

function construirMalla() {
  const container = document.getElementById("malla-container");
  const estado = cargarEstado();
  materias.forEach(sem => {
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";
    semDiv.innerHTML = `<h2>${sem.semestre}</h2>`;
    sem.materias.forEach(m => {
      const mDiv = crearMateria(m, estado);
      semDiv.appendChild(mDiv);
    });
    container.appendChild(semDiv);
  });
  desbloquearMaterias();
  actualizarCreditos();
}

document.addEventListener("DOMContentLoaded", construirMalla);
