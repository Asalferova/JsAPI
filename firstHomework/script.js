// Необходимо создать веб-страницу с динамическими элементами с расписанием занятий.

// На странице должна быть таблица с расписанием занятий, на основе JSON-данных.
// Каждая строка таблицы должна содержать информацию о занятии, а именно:
// - название занятия
// - время проведения занятия
// - максимальное количество участников
// - текущее количество участников
// - кнопка "записаться"
// - кнопка "отменить запись"

// Если максимальное количество участников достигнуто, либо пользователь уже записан на занятие, сделайте кнопку "записаться" неактивной.
// Кнопка "отменить запись" активна в случае, если пользователь записан на занятие.

// При нажатии на кнопку "записаться" увеличьте количество записанных участников.
// Если пользователь нажимает "отменить запись", уменьшите количество записанных участников.
// Обновляйте состояние кнопок и количество участников в реальном времени.

// Дополнительно (необязательная часть):
// Сохраняйте изменения в LocalStorage, чтобы они сохранялись при перезагрузке страницы.

// Начальные данные (JSON):

const initialJSON = `[
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 8
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6
    }
]`;


const storedLessons = localStorage.getItem('lessons');
let lessons = [];

if (storedLessons) {
  lessons = JSON.parse(storedLessons);
} else {
  lessons = JSON.parse(initialJSON);
}

const lessonsHtml = lessons.map((lesson) => getLessonHtml(lesson)).join('');

const containerEl = document.querySelector('.table-body');
containerEl.innerHTML = lessonsHtml;

containerEl.addEventListener('click', (event) => {
    const lessonEl = event.target.closest('.lesson');
    const lessonId = +lessonEl.dataset.id;
    const lesson = lessons.find((lesson) => lesson.id === lessonId);
    const signUpButton = lessonEl.querySelector('.sign-up');
    const cancelButton = lessonEl.querySelector('.cancel');

    
  
    if (event.target === signUpButton) {
      if (lesson.currentParticipants < lesson.maxParticipants) {
        lesson.currentParticipants++;
        lesson.isUserSignedUp = true;
        updateLessonHtml(lesson, lessonEl);
      }
    }
  
    if (event.target === cancelButton) {
      lesson.currentParticipants--;
      lesson.isUserSignedUp = false;
      updateLessonHtml(lesson, lessonEl);
    }
  });


  lessons.forEach((lesson) => {
    const lessonEl = document.querySelector(`.lesson[data-id="${lesson.id}"]`);
    const signUpButton = lessonEl.querySelector('.sign-up');
    const cancelButton = lessonEl.querySelector('.cancel');
  
    signUpButton.disabled = lesson.isUserSignedUp || lesson.currentParticipants >= lesson.maxParticipants;
    cancelButton.disabled = !lesson.isUserSignedUp;
  });

function updateLessonHtml(lesson, lessonEl) {
    const maxParticipantsEl = lessonEl.querySelector('.max-participants');
    const currentParticipantsEl = lessonEl.querySelector('.current-participants');
    const signUpButton = lessonEl.querySelector('.sign-up');
    const cancelButton = lessonEl.querySelector('.cancel');

    maxParticipantsEl.textContent = lesson.maxParticipants;
    currentParticipantsEl.textContent = lesson.currentParticipants;
    signUpButton.disabled = lesson.isUserSignedUp || lesson.currentParticipants >= lesson.maxParticipants;
    cancelButton.disabled = !lesson.isUserSignedUp;
    saveToLocalStorage(lessons);
}


function saveToLocalStorage(lessons) {
    localStorage.setItem('lessons', JSON.stringify(lessons));
  }

function getLessonHtml(lesson) {
    return `
        <tr class="lesson" data-id="${lesson.id}">
          <th>${lesson.name}</th>
          <th>${lesson.time}</th>
          <th class="max-participants">${lesson.maxParticipants}</th>
          <th class="current-participants">${lesson.currentParticipants}</th>
          <td><button class="sign-up">Записаться</button></td> 
          <td><button class="cancel" disabled>Отменить запись</button></td> 
        </tr>
     `;
}