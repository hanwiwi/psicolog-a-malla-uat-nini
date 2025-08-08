
const materias = [
  { nombre: "Psicología General", creditos: 8, semestre: 1 },
  { nombre: "Bases Biológicas del Comportamiento", creditos: 8, semestre: 1 },
  { nombre: "Historia de la Psicología", creditos: 6, semestre: 1 },
  { nombre: "Ética Profesional", creditos: 6, semestre: 1 },

  { nombre: "Psicología del Desarrollo I", creditos: 8, semestre: 2, requisitos: ["Psicología General"] },
  { nombre: "Psicología Social", creditos: 8, semestre: 2 },
  { nombre: "Teorías y Sistemas Psicológicos", creditos: 6, semestre: 2 },
  { nombre: "Métodos de Investigación Cuantitativa", creditos: 6, semestre: 2 },

  { nombre: "Psicología del Desarrollo II", creditos: 8, semestre: 3, requisitos: ["Psicología del Desarrollo I"] },
  { nombre: "Psicometría", creditos: 6, semestre: 3, requisitos: ["Métodos de Investigación Cuantitativa"] },
  { nombre: "Psicología Experimental", creditos: 8, semestre: 3 },
  { nombre: "Taller de Redacción Científica", creditos: 4, semestre: 3 },

  { nombre: "Neuropsicología", creditos: 8, semestre: 4, requisitos: ["Bases Biológicas del Comportamiento"] },
  { nombre: "Evaluación Psicológica I", creditos: 6, semestre: 4 },
  { nombre: "Diagnóstico Psicológico", creditos: 8, semestre: 4 },
  { nombre: "Métodos de Investigación Cualitativa", creditos: 6, semestre: 4 },

  { nombre: "Evaluación Psicológica II", creditos: 6, semestre: 5, requisitos: ["Evaluación Psicológica I"] },
  { nombre: "Intervención Psicológica I", creditos: 8, semestre: 5 },
  { nombre: "Optativa Profesionalizante I", creditos: 6, semestre: 5, opciones: ["Psicología Organizacional", "Psicología Educativa", "Psicología Clínica"] },

  { nombre: "Intervención Psicológica II", creditos: 8, semestre: 6, requisitos: ["Intervención Psicológica I"] },
  { nombre: "Optativa Profesionalizante II", creditos: 6, semestre: 6, opciones: ["Psicología Organizacional Avanzada", "Psicología Educativa Avanzada", "Psicoterapia"] },

  { nombre: "Prácticas Profesionales I", creditos: 10, semestre: 7 },
  { nombre: "Habilita I", creditos: 4, semestre: 7, opciones: ["Taller de Creatividad", "Taller de Lenguaje"] },

  { nombre: "Prácticas Profesionales II", creditos: 10, semestre: 8 },
  { nombre: "Habilita II", creditos: 4, semestre: 8, opciones: ["Taller de Lectura Crítica", "Taller de Escritura Académica"] },

  { nombre: "Tesis o Proyecto Terminal", creditos: 12, semestre: 9 }
];

let totalCreditos = 0;

function crearMalla() {
  const app = document.getElementById("app");
  let creditosGuardados = JSON.parse(localStorage.getItem("creditos")) || [];

  let semestres = {};
  materias.forEach(m => {
    if (!semestres[m.semestre]) semestres[m.semestre] = [];
    semestres[m.semestre].push(m);
  });

  for (let s = 1; s <= 9; s++) {
    const div = document.createElement("div");
    div.className = "semestre";
    div.innerHTML = `<h2>SEMESTRE ${s}</h2>`;

    (semestres[s] || []).forEach(m => {
      const mat = document.createElement("div");
      mat.className = "materia";
      mat.innerText = `${m.nombre} (${m.creditos} créditos)`;
      if (creditosGuardados.includes(m.nombre)) {
        mat.classList.add("aprobada");
        totalCreditos += m.creditos;
      }
      mat.onclick = () => toggleMateria(mat, m);
      div.appendChild(mat);

      if (m.opciones && m.opciones.length) {
        const sub = document.createElement("div");
        sub.className = "opciones";
        sub.innerHTML = "Opciones: " + m.opciones.join(", ");
        div.appendChild(sub);
      }
    });

    app.appendChild(div);
  }

  document.getElementById("totalCreditos").innerText = totalCreditos;
}

function toggleMateria(el, materia) {
  let creditosGuardados = JSON.parse(localStorage.getItem("creditos")) || [];

  if (el.classList.contains("aprobada")) {
    el.classList.remove("aprobada");
    creditosGuardados = creditosGuardados.filter(m => m !== materia.nombre);
    totalCreditos -= materia.creditos;
  } else {
    el.classList.add("aprobada");
    creditosGuardados.push(materia.nombre);
    totalCreditos += materia.creditos;
  }

  localStorage.setItem("creditos", JSON.stringify(creditosGuardados));
  document.getElementById("totalCreditos").innerText = totalCreditos;
}

window.onload = crearMalla;
