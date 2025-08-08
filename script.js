
const curriculum = document.getElementById("curriculum");
const creditDisplay = document.getElementById("creditCount");

// Datos: cada materia con nombre, créditos, requisitos, id único y tipo
const semesters = [
  {
    title: "SEMESTRE I",
    subjects: [
      { id: "procesos", name: "Procesos Mentales", credits: 4 },
      { id: "ninez", name: "Psicología de la Niñez y Adolescencia", credits: 5 },
      { id: "biologicas", name: "Bases Biológicas del Comportamiento", credits: 5 },
      { id: "social", name: "Psicología Social y Ambiental", credits: 4 },
      { id: "psicomedicion", name: "Fundamentos de la Psicomedición", credits: 5 },
      { id: "teoriasClasicas", name: "Teorías y Sistemas Clásicos en Psicología", credits: 4 },
      { id: "epistemologia", name: "Epistemología", credits: 4 },
      { id: "competenciasDigitales", name: "Competencias Digitales en Psicología", credits: 4 },
      { id: "habilitaEmocional", name: "HABILITA – EMOCIONAL: Calidad de Vida y Bienestar / Educación Emocional Integral / Taller de Habilidades Socioemocionales", credits: 3 }
    ]
  },
  {
    title: "SEMESTRE II",
    subjects: [
      { id: "teoriasContemporaneas", name: "Teorías y Sistemas Contemporáneos", credits: 4 },
      { id: "entrevista", name: "Fundamentos de la Entrevista", credits: 5 },
      { id: "estadistica1", name: "Estadística Descriptiva", credits: 5 },
      { id: "adultez", name: "Psicología de la Adultez", credits: 4 },
      { id: "psicofisiologia", name: "Psicofisiología", credits: 5 },
      { id: "personalidad", name: "Teorías de la Personalidad", credits: 4 },
      { id: "organizacional", name: "Psicología Organizacional", credits: 4 },
      { id: "educativa", name: "Psicología Educativa", credits: 4 },
      { id: "habilitaComunicativa", name: "HABILITA – COMUNICATIVA: Comunicación Asertiva / Ciencia / Mundo Contemporáneo", credits: 3 }
    ]
  },
  {
    title: "SEMESTRE III",
    subjects: [
      { id: "estadistica2", name: "Estadística Inferencial", credits: 4 },
      { id: "neuropsicologia", name: "Neuropsicología", credits: 4 },
      { id: "tecnicasEntrevista", name: "Técnicas de la Entrevista", credits: 4, requires: ["entrevista"] },
      { id: "psicoanalisis", name: "Teoría Psicoanalítica", credits: 4 },
      { id: "trastornos", name: "Trastornos del Desarrollo", credits: 5 },
      { id: "evaluacionEducativa", name: "Evaluación Psicológica Educativa", credits: 6 },
      { id: "intervencionEducativa", name: "Intervención en el Ámbito Educativo", credits: 4 },
      { id: "psicologiaClinica", name: "Psicología Clínica", credits: 4 },
      { id: "habilitaConciencia", name: "HABILITA – CONCIENCIA SOCIAL: Emprendimiento / Humanismo / Pensamiento Crítico", credits: 3 }
    ]
  }
];

// Estado guardado en localStorage
let completed = JSON.parse(localStorage.getItem("materias_aprobadas") || "[]");

// Generador visual
function render() {
  curriculum.innerHTML = "";
  let totalCredits = 0;

  semesters.forEach(sem => {
    const block = document.createElement("section");
    block.className = "semester";
    block.innerHTML = `<h2>${sem.title}</h2>`;

    sem.subjects.forEach(sub => {
      const div = document.createElement("div");
      div.className = "subject";
      if (completed.includes(sub.id)) div.classList.add("completed");

      const locked = sub.requires?.some(req => !completed.includes(req));
      if (locked) div.classList.add("locked");

      div.innerHTML = `
        <span>${sub.name} (${sub.credits} créditos)</span>
        <button ${locked ? "disabled" : ""}>${completed.includes(sub.id) ? "✓" : "+"}</button>
      `;

      div.querySelector("button").onclick = () => {
        if (completed.includes(sub.id)) {
          completed = completed.filter(id => id !== sub.id);
        } else {
          completed.push(sub.id);
        }
        localStorage.setItem("materias_aprobadas", JSON.stringify(completed));
        render();
      };

      if (completed.includes(sub.id)) totalCredits += sub.credits;
      block.appendChild(div);
    });

    curriculum.appendChild(block);
  });

  creditDisplay.textContent = totalCredits;
}

render();
