import { createOptimizedPicture, lookupPages } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  block.textContent = '';
  const stories = await lookupPages(pathnames);
  const ul = document.createElement('ul');
  ul.classList.add('carousel-slides');
  ul.style.width = `${stories.length * 100}%`;
  stories.forEach((row, i) => {
    console.log(row);

    const li = document.createElement('li');
    li.classList.add('carousel-slide');
    // li.style.left = `${i * 100}%`;

    const rowContent = document.createElement('div');
    rowContent.classList.add('carousel-slide-content');
    rowContent.innerHTML = `<h2><a href="${row.path}">${row.title}</h2>`;
    rowContent.append(createOptimizedPicture(row.image, row.title, !i));
    li.append(rowContent);

    ul.append(li);
  });
  block.append(ul);

  // nav buttons
  const leftBtn = document.createElement('div');
  leftBtn.classList.add('carousel-btn');
  leftBtn.classList.add('carousel-btn-left');
  block.appendChild(leftBtn);

  const rightBtn = document.createElement('div');
  rightBtn.classList.add('carousel-btn');
  rightBtn.classList.add('carousel-btn-right');
  block.appendChild(rightBtn);

  let carouselState = 0;

  function updateCarousel() {
    console.log(carouselState);

    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach((slide) => {
      slide.classList.remove('active', 'next', 'prev', 'transition');
    });

    setTimeout(() => {
      for (let i = 0; i < slides.length; i += 1) {
        if (i === carouselState) {
          slides[i].classList.add('active');
        } else if (i === carouselState + 1) {
          slides[i].classList.add('next');
        } else if (i === carouselState - 1) {
          slides[i].classList.add('prev');
        }
      }

      if (carouselState === 0) {
        slides[slides.length - 1].classList.add('prev');
      }

      if (carouselState === slides.length - 1) {
        slides[0].classList.add('next');
      }
    }, 10);
  }

  updateCarousel();

  rightBtn.addEventListener('click', () => {
    carouselState = carouselState < stories.length - 1 ? carouselState + 1 : 0;
    updateCarousel();
  });

  leftBtn.addEventListener('click', () => {
    carouselState = carouselState > 0 ? carouselState - 1 : stories.length - 1;
    updateCarousel();
  });
}
