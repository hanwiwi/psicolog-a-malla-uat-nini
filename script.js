
const materias = {
    'SEMESTRE I': [
        { nombre: 'PROCESOS MENTALES', creditos: 4 },
        { nombre: 'PSICOLOGIA DE LA NIÑEZ Y LA ADOLESCENCIA', creditos: 5 },
        { nombre: 'BASES BIOLOGICAS DEL COMPORTAMIENTO', creditos: 5 },
        { nombre: 'PSICOLOGIA SOCIAL Y AMBIENTAL', creditos: 4 },
        { nombre: 'FUNDAMENTOS DE LA PSICOMEDICION', creditos: 5 },
        { nombre: 'TEORIAS Y SISTEMAS CLASICOS EN PSICOLOGIA', creditos: 4 },
        { nombre: 'EPISTEMOLOGIA', creditos: 4 },
        { nombre: 'COMPETENCIAS DIGITALES EN PSICOLOGIA', creditos: 4 },
        {
            nombre: 'HABILITA – EMOCIONAL', creditos: 3, opciones: [
                'CALIDAD DE VIDA Y BIENESTAR',
                'EDUCACIÓN EMOCIONAL INTEGRAL',
                'TALLER DE HABILIDADES SOCIOEMOCIONALES'
            ]
        }
    ],
    'SEMESTRE II': [
        { nombre: 'TEORIAS Y SISTEMAS CONTEMPORANEOS EN PSICOLOGIA', creditos: 4 },
        { nombre: 'FUNDAMENTOS DE LA ENTREVISTA', creditos: 5 },
        { nombre: 'ESTADÍSTICA DESCRIPTIVA', creditos: 5 },
        { nombre: 'PSICOLOGIA DE LA ADULTEZ', creditos: 4 },
        { nombre: 'PSICOFISIOLOGÍA', creditos: 5 },
        { nombre: 'TEORIAS DE LA PERSONALIDAD', creditos: 4 },
        { nombre: 'PSICOLOGÍA ORGANIZACIONAL', creditos: 4 },
        { nombre: 'PSICOLOGÍA EDUCATIVA', creditos: 4 },
        {
            nombre: 'HABILITA – COMUNICATIVA', creditos: 3, opciones: [
                'COMPETENCIA COMUNICATIVA Y MUNDO CONTEMPORANEO',
                'COMUNICACION ASERTIVA',
                'COMUNICACION DE LA CIENCIA'
            ]
        }
    ],
    'SEMESTRE III': [
        { nombre: 'ESTADÍSTICA INFERENCIAL', creditos: 4 },
        { nombre: 'NEUROPSICOLOGÍA', creditos: 4 },
        { nombre: 'TÉCNICAS DE LA ENTREVISTA', creditos: 4, requisito: 'FUNDAMENTOS DE LA ENTREVISTA' },
        { nombre: 'TEORÍA PSICONANALÍTICA', creditos: 4 },
        { nombre: 'TRASTORNOS DEL DESARROLLO', creditos: 5 },
        { nombre: 'EVALUACIÓN PSICOLÓGICA EDUCATIVA', creditos: 6 },
        { nombre: 'INTERVENCIÓN EN EL ÁMBITO EDUCATIVO', creditos: 4 },
        { nombre: 'PSICOLOGÍA CLÍNICA', creditos: 4 },
        {
            nombre: 'HABILITA – CONCIENCIA SOCIAL', creditos: 3, opciones: [
                'EMPRENDIMIENTO EN ACCION',
                'HUMANISMO, SOCIEDAD E INDIVIDUO',
                'PENSAMIENTO CRITICO'
            ]
        }
    ],
    // Semestres IV a IX omitidos por longitud. Puedes continuar el patrón aquí.
};

function crearMalla() {
    const container = document.getElementById("mallaContainer");
    const estado = JSON.parse(localStorage.getItem("estadoMalla") || "{}");
    let creditosTotales = 0;

    Object.entries(materias).forEach(([semestre, listaMaterias]) => {
        const bloque = document.createElement("section");
        bloque.classList.add("semestre");
        bloque.innerHTML = `<h2>${semestre}</h2>`;

        listaMaterias.forEach((materia) => {
            const materiaDiv = document.createElement("div");
            materiaDiv.classList.add("materia");

            const check = document.createElement("input");
            check.type = "checkbox";
            check.id = materia.nombre;
            check.checked = estado[materia.nombre] || false;
            check.disabled = materia.requisito && !estado[materia.requisito];

            check.addEventListener("change", () => {
                estado[materia.nombre] = check.checked;
                localStorage.setItem("estadoMalla", JSON.stringify(estado));
                location.reload(); // para actualizar dependencias
            });

            const label = document.createElement("label");
            label.htmlFor = materia.nombre;
            label.textContent = materia.nombre;

            const creditos = document.createElement("span");
            creditos.classList.add("creditos");
            creditos.textContent = `${materia.creditos} créditos`;

            materiaDiv.appendChild(check);
            materiaDiv.appendChild(label);
            materiaDiv.appendChild(creditos);
            bloque.appendChild(materiaDiv);

            // Opciones
            if (materia.opciones && check.checked) {
                const opcionesDiv = document.createElement("div");
                opcionesDiv.classList.add("opciones");
                materia.opciones.forEach(opcion => {
                    const opcionLabel = document.createElement("label");
                    const opcionInput = document.createElement("input");
                    opcionInput.type = "radio";
                    opcionInput.name = materia.nombre + "_opciones";
                    opcionInput.disabled = true;
                    opcionLabel.textContent = "☑ " + opcion;
                    opcionesDiv.appendChild(opcionLabel);
                    opcionesDiv.appendChild(document.createElement("br"));
                });
                bloque.appendChild(opcionesDiv);
            }

            if (check.checked) creditosTotales += materia.creditos;
        });

        container.appendChild(bloque);
    });

    document.getElementById("creditosTotales").textContent = creditosTotales;
}

crearMalla();
