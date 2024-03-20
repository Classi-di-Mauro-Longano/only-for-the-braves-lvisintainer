document.addEventListener('DOMContentLoaded', function() {
    const lessonForm = document.getElementById('lessonForm');
    const lessonInput = document.getElementById('lessonInput');
    const lessonList = document.getElementById('lessonList');

    // Carica le lezioni salvate al caricamento della pagina
    loadLessons();

    // Aggiungi evento di submit al form
    lessonForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const lessonText = lessonInput.value.trim();
        if (lessonText !== '') {
            addLesson(lessonText);
            saveLesson(lessonText);
            lessonInput.value = '';
        }
    });

    // Aggiungi una lezione alla lista
    function addLesson(lessonText) {
        const li = document.createElement('li');
        li.textContent = lessonText;
        lessonList.appendChild(li);
    }

    // Salva una lezione nel localStorage
    function saveLesson(lessonText) {
        let lessons = localStorage.getItem('lessons');
        lessons = lessons ? JSON.parse(lessons) : [];
        lessons.push(lessonText);
        localStorage.setItem('lessons', JSON.stringify(lessons));
    }

    // Carica le lezioni salvate
    function loadLessons() {
        let lessons = localStorage.getItem('lessons');
        lessons = lessons ? JSON.parse(lessons) : [];
        lessons.forEach(lesson => addLesson(lesson));
    }
});
