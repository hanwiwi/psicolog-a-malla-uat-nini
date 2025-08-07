const semestres = [
  {
    nombre: "Semestre I",
    materias: [
      { nombre: "Procesos Mentales", creditos: 4, id: "procesos-mentales" },
      { nombre: "Psicología de la Niñez y Adolescencia", creditos: 5, id: "ninez-adolescencia" },
      { nombre: "Bases Biológicas del Comportamiento", creditos: 5, id: "biologicas" },
      { nombre: "Psicología Social y Ambiental", creditos: 4, id: "social-ambiental" },
      { nombre: "Fundamentos de la Psicomedición", creditos: 5, id: "psicomedicion" },
      { nombre: "Teorías y Sistemas Clásicos en Psicología", creditos: 4, id: "clasicos" },
      { nombre: "Epistemología", creditos: 4, id: "epistemologia" },
      { nombre: "Competencias Digitales en Psicología", creditos: 4, id: "competencias-digitales" },
      {
        nombre: "HABILITA – Emocional",
        creditos: 3,
        id: "habilita-emocional",
        opciones: [
          "Calidad de Vida y Bienestar",
          "Educación Emocional Integral",
          "Taller de Habilidades Socioemocionales"
        ]
      },
    ],
  },
  {
    nombre: "Semestre II",
    materias: [
      { nombre: "Teorías y Sistemas Contemporáneos en Psicología", creditos: 4, id: "contemporaneos", requisitos: ["clasicos"] },
      { nombre: "Fundamentos de la Entrevista", creditos: 5, id: "entrevista", requisitos: ["procesos-mentales"] },
      { nombre: "Estadística Descriptiva", creditos: 5, id: "estadistica-desc" },
      { nombre: "Psicología de la Adultez", creditos: 4, id: "adultez" },
      { nombre: "Psicofisiología", creditos: 5, id: "psicofisiologia" },
      { nombre: "Teorías de la Personalidad", creditos: 4, id: "personalidad" },
      { nombre: "Psicología Organizacional", creditos: 4, id: "organizacional" },
      { nombre: "Psicología Educativa", creditos: 4, id: "educativa" },
      {
        nombre: "HABILITA – Comunicativa",
        creditos: 3,
        id: "habilita-comunicativa",
        opciones: [
          "Competencia Comunicativa y Mundo Contemporáneo",
          "Comunicación Asertiva",
          "Comunicación de la Ciencia"
        ]
      },
    ],
  },
];

const mallaContainer = document.getElementById("malla-container");
const totalCreditosSpan = document.getElementById("total-creditos");
let materiasAprobadas = new Set(JSON.parse(localStorage.getItem("materiasAprobadas")) || []);

function guardarProgreso() {
  localStorage.setItem("materiasAprobadas", JSON.stringify(Array.from(materiasAprobadas)));
}

function renderMalla() {
  mallaContainer.innerHTML = "";
  let totalCreditos = 0;

  semestres.forEach((semestre) => {
    let creditosSemestre = 0;

    const semestreDiv = document.createElement("div");
    semestreDiv.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = semestre.nombre;
    semestreDiv.appendChild(titulo);

    const materiasDiv = document.createElement("div");
    materiasDiv.className = "materias";

    semestre.materias.forEach((materia) => {
      const bloqueada =
        materia.requisitos &&
        !materia.requisitos.every((req) => materiasAprobadas.has(req));

      const div = document.createElement("div");
      div.className = "materia";
      if (materiasAprobadas.has(materia.id)) {
        div.classList.add("aprobada");
        creditosSemestre += materia.creditos;
        totalCreditos += materia.creditos;
      } else if (bloqueada) {
        div.classList.add("bloqueada");
      }

      div.innerHTML = `
        <strong>${materia.nombre}</strong>
        <div class="creditos">${materia.creditos} créditos</div>
        ${materia.requisitos ? `<div class="requisitos">Requiere: ${materia.requisitos.map(req => getNombreMateria(req)).join(", ")}</div>` : ""}
        ${materia.opciones ? `<div class="requisitos">Opciones: ${materia.opciones.join(", ")}</div>` : ""}
      `;

      if (!bloqueada) {
        div.addEventListener("click", () => {
          if (materiasAprobadas.has(materia.id)) {
            materiasAprobadas.delete(materia.id);
          } else {
            materiasAprobadas.add(materia.id);
          }
          guardarProgreso();
          renderMalla();
        });
      }

      materiasDiv.appendChild(div);
    });

    const creditosTotales = document.createElement("div");
    creditosTotales.className = "creditos-totales";
    creditosTotales.textContent = `Créditos aprobados este semestre: ${creditosSemestre}`;

    semestreDiv.appendChild(materiasDiv);
    semestreDiv.appendChild(creditosTotales);

    mallaContainer.appendChild(semestreDiv);
  });

  totalCreditosSpan.textContent = totalCreditos;
}

function getNombreMateria(id) {
  for (const semestre of semestres) {
    for (const materia of semestre.materias) {
      if (materia.id === id) return materia.nombre;
    }
  }
  return "???";
}

renderMalla();
