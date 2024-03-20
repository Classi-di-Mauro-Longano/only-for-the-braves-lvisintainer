document.addEventListener('DOMContentLoaded', function() {
    const lessonForm = document.getElementById('lessonForm');
    const titleInput = document.getElementById('titleInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const lessonList = document.getElementById('lessonList');

    // Carica le lezioni salvate al caricamento della pagina
    loadLessons();

    // Aggiungi evento di submit al form
    lessonForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        if (title !== '' && description !== '') {
            const lesson = {
                title: title,
                description: description,
                date: new Date().toLocaleDateString()
            };
            addLesson(lesson);
            saveLesson(lesson);
            titleInput.value = '';
            descriptionInput.value = '';
        }
    });

    // Aggiungi una lezione alla lista
    function addLesson(lesson) {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${lesson.title}</strong><br>
            <span>${lesson.description}</span><br>
            <span>Data: ${lesson.date}</span>
        `;
        lessonList.appendChild(li);
    }

    // Salva una lezione nel localStorage
    function saveLesson(lesson) {
        let lessons = localStorage.getItem('lessons');
        lessons = lessons ? JSON.parse(lessons) : [];
        lessons.push(lesson);
        localStorage.setItem('lessons', JSON.stringify(lessons));
    }

    // Carica le lezioni salvate
    function loadLessons() {
        let lessons = localStorage.getItem('lessons');
        lessons = lessons ? JSON.parse(lessons) : [];
        lessons.forEach(lesson => addLesson(lesson));
    }
});
