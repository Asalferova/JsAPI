// Цель: Разработать веб-приложение, которое будет отображать новое случайное изображение из коллекции Unsplash, давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению.

// Разработка веб-приложения:
// Создание приложения:

// • Перейдите на страницу разработчика Unsplash (https://unsplash.com/developers).
// • Нажмите "New Application".
// • Заполните необходимую информацию о приложении (можете использовать http://localhost для тестирования).
// • Получите свой API-ключ после создания приложения.

// • Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
// • Используя JavaScript и ваш API-ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу.
// • Отобразите информацию о фотографе под изображением.
// • Реализуйте функционал "лайка". Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу.

// Дополнительные задачи (по желанию):
// • Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался.
// • Реализуйте возможность просмотра предыдущих "фото дня" с сохранением их в истории просмотров.

const token = "IXj0J5YAosAmm4AE0vOL-NTgEp07U7P6MA7YYHG8lRE";
const photoContainer = document.querySelector("#photo-container");
let viewHistory = localStorage.getItem("viewHistory")
  ? JSON.parse(localStorage.getItem("viewHistory"))
  : [];

async function photos() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${token}&_=${Date.now()}`
  );
  if (!response.ok) {
    throw new Error("Ошибка получения данных");
  }
  const data = await response.json();
  photoContainer.insertAdjacentHTML(
    "beforeend",
    `
          <div class="photo">
          <img  src="${data.urls.small}" alt="${data.alt_description}">
          <div class="info">Name autor: ${data.user.username} <br /> About Autor: ${data.user.bio} <br /> Autor's Instagram: ${data.user.username} ${data.user.instagram_username}</div>
          </div>
          `
  );
  return data;
}

window.addEventListener("load", async function (e) {
  const firstPhoto = await photos();
  viewHistory.push(firstPhoto.id);
  localStorage.setItem("viewHistory", JSON.stringify(viewHistory));

  let likeCount = localStorage.getItem(firstPhoto.id)
    ? Number(localStorage.getItem(firstPhoto.id))
    : 0;
  const likeButton = document.querySelector("#like-button");
  const likeCountElement = document.querySelector("#like-count");
  likeCountElement.textContent = likeCount;

  likeButton.addEventListener("click", function () {
    likeCount++;
    likeCountElement.textContent = likeCount;
    localStorage.setItem(firstPhoto.id, likeCount);
  });
});
