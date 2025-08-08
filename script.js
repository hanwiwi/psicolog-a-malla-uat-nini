
document.addEventListener('DOMContentLoaded', function () {
    let totalCredits = 0;
    const counter = document.getElementById('creditCounter');

    document.querySelectorAll('.course').forEach(course => {
        course.addEventListener('click', () => {
            const credits = parseInt(course.dataset.credits, 10);
            if (!course.classList.contains('completed')) {
                course.classList.add('completed');
                totalCredits += credits;
            } else {
                course.classList.remove('completed');
                totalCredits -= credits;
            }
            counter.textContent = 'Créditos Aprobados: ' + totalCredits;
            localStorage.setItem('creditCounter', totalCredits);
        });
    });

    // Recuperar desde almacenamiento local
    const savedCredits = parseInt(localStorage.getItem('creditCounter'), 10);
    if (!isNaN(savedCredits)) {
        totalCredits = savedCredits;
        counter.textContent = 'Créditos Aprobados: ' + totalCredits;
    }
});
