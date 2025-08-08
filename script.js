
function guardarEstado() {
  const materias = document.querySelectorAll(".materia");
  const estado = {};
  materias.forEach(mat => {
    estado[mat.dataset.id] = mat.dataset.aprobada;
  });
  localStorage.setItem("estadoMalla", JSON.stringify(estado));
}

function cargarEstado() {
  const estado = JSON.parse(localStorage.getItem("estadoMalla") || "{}");
  for (const id in estado) {
    const el = document.querySelector(`.materia[data-id='${id}']`);
    if (el) el.setAttribute("data-aprobada", estado[id]);
  }
}

function crearMateria(id, nombre, creditos, opciones = []) {
  const div = document.createElement("div");
  div.className = "materia";
  div.dataset.id = id;
  div.dataset.aprobada = "false";
  div.innerHTML = nombre + `<span class='creditos'>${creditos} créditos</span>`;
  if (opciones.length) {
    const select = document.createElement("select");
    opciones.forEach(op => {
      const option = document.createElement("option");
      option.textContent = op;
      select.appendChild(option);
    });
    div.appendChild(select);
  }
  div.addEventListener("click", () => {
    if (event.target.tagName !== "SELECT") {
      div.dataset.aprobada = div.dataset.aprobada === "true" ? "false" : "true";
      guardarEstado();
      actualizarCreditos();
    }
  });
  return div;
}

function actualizarCreditos() {
  const materias = document.querySelectorAll(".materia[data-aprobada='true']");
  let total = 0;
  materias.forEach(mat => {
    total += parseInt(mat.querySelector(".creditos").textContent);
  });
  document.getElementById("creditos-total").textContent = "Créditos aprobados: " + total;
}

function renderizarMalla() {
  const contenedor = document.getElementById("malla-container");
  for (let i = 1; i <= 9; i++) {
    const semestreDiv = document.createElement("div");
    semestreDiv.className = "semestre";
    const titulo = document.createElement("h2");
    titulo.textContent = "SEMESTRE " + i;
    semestreDiv.appendChild(titulo);
    for (let j = 1; j <= 5; j++) {
      const materia = crearMateria(`s${i}m${j}`, `Materia ${j}`, 8);
      semestreDiv.appendChild(materia);
    }
    contenedor.appendChild(semestreDiv);
  }
  const creditosTotales = document.createElement("div");
  creditosTotales.id = "creditos-total";
  creditosTotales.style.margin = "2em";
  contenedor.appendChild(creditosTotales);
  cargarEstado();
  actualizarCreditos();
}

document.addEventListener("DOMContentLoaded", renderizarMalla);
