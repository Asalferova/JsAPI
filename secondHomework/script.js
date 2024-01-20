"use strict";
// Вашей задачей является создание веб-слайдера для отображения изображений на веб-странице.

// Создайте интерфейс веб-страницы, который включает в себя следующие элементы:
// a. Контейнер для отображения текущего изображения.
// b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
// c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.

// Для создания элементов интерфейса используйте HTML.
// При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
// При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
// При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.

// Слайдер должен циклически переключаться между изображениями, то есть после последнего изображения должно отображаться первое, и наоборот.

// Добавьте стилизацию для слайдера и элементов интерфейса с использованием CSS для улучшения внешнего вида.

const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
let imgElements = document.querySelectorAll(".slider-image");
const sliderDots = document.querySelector(".slider-dots");

function switchImage(element, index) {
  const imgList = [...element.querySelectorAll("img")];
  const activeImg = element.querySelector(".active");
  const dots = document.querySelectorAll(".dot");

  if (activeImg) {
    activeImg.classList.remove("active");
    dots.forEach((dot) => dot.classList.remove("active"));
  }

  imgList[index].classList.add("active");
  dots[index].classList.add("active");
}

prevButton.addEventListener("click", function (e) {
  imgElements.forEach((element) => {
    const imgList = [...element.querySelectorAll("img")];
    const activeIndex = imgList.indexOf(element.querySelector(".active"));
    const prevIndex = activeIndex === 0 ? imgList.length - 1 : activeIndex - 1;

    switchImage(element, prevIndex);
  });
});

nextButton.addEventListener("click", function (e) {
  imgElements.forEach((element) => {
    const imgList = [...element.querySelectorAll("img")];
    const activeIndex = imgList.indexOf(element.querySelector(".active"));
    const nextIndex = activeIndex === imgList.length - 1 ? 0 : activeIndex + 1;

    switchImage(element, nextIndex);
  });
});

sliderDots.addEventListener("click", (event) => {
  const targetDot = event.target;
  if (targetDot.classList.contains("dot")) {
    const dotIndex = Array.from(sliderDots.querySelectorAll(".dot")).indexOf(
      targetDot
    );
    imgElements.forEach((element) => switchImage(element, dotIndex));
  }
});

document.querySelectorAll(".slider-image img").forEach(() => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  sliderDots.appendChild(dot);
});

sliderDots.firstElementChild.classList.add("active");
