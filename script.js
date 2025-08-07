
const materias = [
    {
        semestre: "SEMESTRE I",
        materias: [
            { id: "procesos", nombre: "Procesos Mentales", creditos: 4 },
            { id: "infancia", nombre: "Psicología de la Niñez y la Adolescencia", creditos: 5 },
            { id: "biologicas", nombre: "Bases Biológicas del Comportamiento", creditos: 5 },
            { id: "social", nombre: "Psicología Social y Ambiental", creditos: 4 },
            { id: "psicomedicion", nombre: "Fundamentos de la Psicomedición", creditos: 5 },
            { id: "teorias_clasicas", nombre: "Teorías y Sistemas Clásicos en Psicología", creditos: 4 },
            { id: "epistemo", nombre: "Epistemología", creditos: 4 },
            { id: "digitales", nombre: "Competencias Digitales en Psicología", creditos: 4 },
            {
                id: "habilita_emocional",
                nombre: "HABILITA – EMOCIONAL",
                creditos: 3,
                opciones: [
                    "Calidad de Vida y Bienestar",
                    "Educación Emocional Integral",
                    "Taller de Habilidades Socioemocionales"
                ]
            }
        ]
    }
];

function crearMalla() {
    const contenedor = document.getElementById("malla-container");
    let totalCreditos = parseInt(localStorage.getItem("creditos") || "0");
    document.getElementById("creditos").innerText = totalCreditos;

    materias.forEach(sem => {
        const semDiv = document.createElement("div");
        semDiv.className = "semestre";
        const h2 = document.createElement("h2");
        h2.innerText = sem.semestre;
        semDiv.appendChild(h2);

        sem.materias.forEach(mat => {
            const matDiv = document.createElement("div");
            matDiv.className = "materia";
            matDiv.id = mat.id;

            const nombre = document.createElement("span");
            nombre.innerText = `${mat.nombre} (${mat.creditos} créditos)`;

            const aprobarBtn = document.createElement("button");
            aprobarBtn.innerText = "Aprobar";
            aprobarBtn.onclick = () => {
                aprobarBtn.disabled = true;
                matDiv.classList.add("aprobada");
                totalCreditos += mat.creditos;
                document.getElementById("creditos").innerText = totalCreditos;
                localStorage.setItem("creditos", totalCreditos);
                localStorage.setItem(mat.id, "aprobada");
            };

            if (localStorage.getItem(mat.id) === "aprobada") {
                matDiv.classList.add("aprobada");
                aprobarBtn.disabled = true;
            }

            matDiv.appendChild(nombre);

            if (mat.opciones) {
                const select = document.createElement("select");
                mat.opciones.forEach(op => {
                    const opt = document.createElement("option");
                    opt.value = op;
                    opt.innerText = op;
                    select.appendChild(opt);
                });
                matDiv.appendChild(select);
            }

            matDiv.appendChild(aprobarBtn);
            semDiv.appendChild(matDiv);
        });

        contenedor.appendChild(semDiv);
    });
}

window.onload = crearMalla;
