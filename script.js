document.addEventListener('DOMContentLoaded', function() {
    const lessonForm = document.getElementById('lessonForm');
    const titleInput = document.getElementById('titleInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const dateInput = document.getElementById('dateInput');
    const timeInput = document.getElementById('timeInput');
    const titleError = document.getElementById('titleError');
    const dateError = document.getElementById('dateError');
    const timeError = document.getElementById('timeError');
    const lessonList = document.getElementById('lessonList');
    const doneLessonList = document.getElementById('doneLessonList');

    // Carica le lezioni salvate al caricamento della pagina
    loadLessons();

    // Aggiungi evento di submit al form
    lessonForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const date = dateInput.value || new Date(new Date().getTime() + (60 * 60 * 1000)).toISOString().split('T')[0];
        const time = timeInput.value || new Date(new Date().getTime() + (60 * 60 * 1000)).toISOString().split('T')[1].slice(0, 5);
        
        // Resetta i messaggi di errore
        titleError.textContent = '';
        dateError.textContent = '';
        timeError.textContent = '';

        if (title === '') {
            titleError.textContent = 'Inserisci il titolo della lezione.';
            return;
        }

        const lesson = {
            title: title,
            description: description,
            date: date,
            time: time,
            done: false
        };
        addLesson(lesson);
        saveLesson(lesson);
        titleInput.value = '';
        descriptionInput.value = '';
        dateInput.value = '';
        timeInput.value = '';
    });

    // Aggiungi una lezione alla tabella
    function addLesson(lesson) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="form-check-input doneCheckbox" id="doneCheckbox_${lesson.date}_${lesson.time}" ${lesson.done ? 'checked' : ''}></td>
            <td>${lesson.title}</td>
            <td>${lesson.description}</td>
            <td>${lesson.date}</td>
            <td>${lesson.time}</td>
        `;
        if (lesson.done) {
            doneLessonList.appendChild(row);
        } else {
            lessonList.appendChild(row);
        }
        
        const doneCheckbox = row.querySelector('.doneCheckbox');
        doneCheckbox.addEventListener('change', function() {
            lesson.done = !lesson.done;
            if (lesson.done) {
                doneLessonList.appendChild(row);
            } else {
                lessonList.appendChild(row);
            }
            saveLessonStatus(lesson);
        });
    }

    // Salva una lezione nel localStorage
    function saveLesson(lesson) {
        let lessons = localStorage.getItem('lessons');
        lessons = lessons ? JSON.parse(lessons) : [];
        lessons.push(lesson);
        localStorage.setItem('lessons', JSON.stringify(lessons));
    }

    // Salva lo stato di completamento di una lezione nel localStorage
    function saveLessonStatus(lesson) {
        let lessons = localStorage.getItem('lessons');
        lessons = lessons ? JSON.parse(lessons) : [];
        const index = lessons.findIndex(item => item.date === lesson.date && item.time === lesson.time);
        if (index !== -1) {
            lessons[index].done = lesson.done;
            localStorage.setItem('lessons', JSON.stringify(lessons));
        }
    }

    // Carica le lezioni salvate
    function loadLessons() {      
        let lessons = localStorage.getItem('lessons');
        lessons = lessons ? JSON.parse(lessons) : [];
        lessons.forEach(lesson => addLesson(lesson));
    }
});
