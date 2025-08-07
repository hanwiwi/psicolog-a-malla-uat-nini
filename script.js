
const semesters = [
  {
    name: "Semestre I",
    courses: [
      { code: "proc_mentales", name: "Procesos Mentales", credits: 4 },
      { code: "psico_ninez", name: "Psicología de la Niñez y Adolescencia", credits: 5 },
      { code: "bases_bio", name: "Bases Biológicas del Comportamiento", credits: 5 },
    ]
  },
  {
    name: "Semestre II",
    courses: [
      { code: "teorias_contemp", name: "Teorías y Sistemas Contemporáneos", credits: 4, requires: ["proc_mentales"] },
      { code: "entrevista", name: "Fundamentos de la Entrevista", credits: 5 },
    ]
  }
];

let approvedCourses = JSON.parse(localStorage.getItem("approvedCourses")) || [];

function render() {
  const container = document.getElementById("semesters-container");
  container.innerHTML = "";
  let totalCredits = 0;

  semesters.forEach(sem => {
    const section = document.createElement("section");
    section.classList.add("semester");

    const title = document.createElement("h2");
    title.textContent = sem.name;
    section.appendChild(title);

    sem.courses.forEach(course => {
      const div = document.createElement("div");
      div.classList.add("course");

      if (approvedCourses.includes(course.code)) {
        div.classList.add("approved");
        totalCredits += course.credits;
      }

      const name = document.createElement("span");
      name.textContent = `${course.name} (${course.credits} créditos)`;

      const btn = document.createElement("button");
      btn.textContent = approvedCourses.includes(course.code) ? "Aprobado" : "Aprobar";
      btn.disabled = approvedCourses.includes(course.code) || (course.requires && !course.requires.every(r => approvedCourses.includes(r)));

      btn.onclick = () => {
        approvedCourses.push(course.code);
        localStorage.setItem("approvedCourses", JSON.stringify(approvedCourses));
        render();
      };

      div.appendChild(name);
      div.appendChild(btn);
      section.appendChild(div);
    });

    container.appendChild(section);
  });

  document.getElementById("total-credits").textContent = totalCredits;
}

render();
