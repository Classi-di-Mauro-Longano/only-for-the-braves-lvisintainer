document.addEventListener('DOMContentLoaded', function() {
    const lessonForm = document.getElementById('lessonForm');
    const titleInput = document.getElementById('titleInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const dateInput = document.getElementById('dateInput');
    const timeInput = document.getElementById('timeInput');
    const lessonList = document.getElementById('lessonList');

    // Carica le lezioni salvate al caricamento della pagina
    loadLessons();

    // Aggiungi evento di submit al form
    lessonForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const date = dateInput.value;
        const time = timeInput.value;
        if (title !== '' && description !== '' && date !== '' && time !== '') {
            const lesson = {
                title: title,
                description: description,
                date: date,
                time: time
            };
            addLesson(lesson);
            saveLesson(lesson);
            titleInput.value = '';
            descriptionInput.value = '';
            dateInput.value = '';
            timeInput.value = '';
        }
    });

    // Aggiungi una lezione alla tabella
    function addLesson(lesson) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${lesson.title}</td>
            <td>${lesson.description}</td>
            <td>${lesson.date}</td>
            <td>${lesson.time}</td>
        `;
        lessonList.appendChild(row);
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
