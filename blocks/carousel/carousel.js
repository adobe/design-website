import { gsap } from '../../scripts/gsap/gsap-core.js';
import '../../scripts/gsap/CSSPlugin.js';

import { createOptimizedPicture, lookupPages } from '../../scripts/scripts.js';

class Carousel {
  proxy;

  timer;

  animation;

  slideDelay = 3.5;

  slideDuration = 0.3;

  snapX;

  backgroundContianer;

  constructor(ui) {
    this.backgroundContianer = document.querySelector('.carousel');

    const prevButton = document.createElement('div');
    prevButton.classList.add('carousel-btn');
    prevButton.classList.add('carousel-btn-prev');
    ui.appendChild(prevButton);

    const nextButton = document.createElement('div');
    nextButton.classList.add('carousel-btn');
    nextButton.classList.add('carousel-btn-next');
    ui.appendChild(nextButton);

    nextButton.addEventListener('click', () => {
      this.animateSlides(-1);
      this.timer.kill();
    });

    prevButton.addEventListener('click', () => {
      this.animateSlides(1);
      this.timer.kill();
    });

    this.slides = document.querySelectorAll('.carousel-slide');
    this.progressWrap = gsap.utils.wrap(0, 1);
    this.numSlides = this.slides.length;

    gsap.set(this.slides, {
      // backgroundColor: 'random([red, blue, green, purple, orange, yellow, lime, pink])',
      xPercent: (i) => i * 100,
    });

    this.wrap = gsap.utils.wrap(-100, (this.numSlides - 1) * 100);
    this.timer = gsap.delayedCall(this.slideDelay, () => this.autoPlay());

    this.animation = gsap.timeline({
      paused: true,
      repeat: -1,
    });

    this.animation.to(this.slides, {
      duration: 1,
      xPercent: `+=${this.numSlides * 100}`,
      ease: 'none',
      modifiers: {
        xPercent: this.wrap,
      },
    });

    this.proxy = document.createElement('div');
    this.slideAnimation = gsap.to({}, {});
    this.slideWidth = 0;
    this.wrapWidth = 0;
  }

  init() {
    this.resize();
  }

  updateProgress() {
    const time = this.progressWrap(gsap.getProperty(this.proxy, 'x') / this.wrapWidth);
    this.animation.progress(time);
  }

  animateSlides(direction) {
    const x = this.snapX(gsap.getProperty(this.proxy, 'x') + direction * this.slideWidth);

    this.timer.restart(true);
    this.slideAnimation.kill();

    this.slideAnimation = gsap.to(this.proxy, {
      x,
      duration: this.slideDuration,
      onUpdate: () => this.updateProgress(),
      onComplete: () => {
        const time = this.progressWrap(gsap.getProperty(this.proxy, 'x') / this.wrapWidth);
        const slideIndex = Math.round(time * this.slides.length);
        const slide = this.slides[slideIndex];
        console.log(slideIndex, slide);
        if (slide) {
          const { color } = slide.dataset;
          this.backgroundContianer.style.backgroundColor = color;
        }
      },
    });
  }

  autoPlay() {
    this.animateSlides(-1);
  }

  resize() {
    const norm = (gsap.getProperty(this.proxy, 'x') / this.wrapWidth) || 0;
    this.slideWidth = this.slides[0].offsetWidth;
    this.wrapWidth = this.slideWidth * this.numSlides;
    this.snapX = gsap.utils.snap(this.slideWidth);

    gsap.set(this.proxy, {
      x: norm * this.wrapWidth,
    });

    this.animateSlides(0);
    this.slideAnimation.progress(1);
  }
}

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
    li.dataset.color = row.color;
    li.classList.add('carousel-slide');

    const slideContainer = document.createElement('div');
    slideContainer.classList.add('carousel-slide-container');

    const slideContent = document.createElement('div');
    slideContent.classList.add('carousel-slide-content');

    const slideCopy = document.createElement('div');
    slideCopy.classList.add('carousel-slide-copy');
    slideCopy.innerHTML = `<h2><a href="${row.path}">${row.title}</a></h2>
    <div>${row.subtitle}</div>
    <div>${row.author}</div>`;

    slideContent.append(slideCopy);

    slideContent.append(createOptimizedPicture(row.image, row.title, !i));

    slideContainer.append(slideContent);
    li.append(slideContainer);

    ul.append(li);
  });

  const container = document.createElement('div');
  container.classList.add('carousel-group');
  container.append(ul);

  const ui = document.createElement('div');
  ui.classList.add('carousel-ui');

  const uiInner = document.createElement('div');
  uiInner.classList.add('carousel-ui-inner');
  ui.append(uiInner);

  container.append(ui);

  block.append(container);

  const gradient = document.createElement('div');
  gradient.classList.add('carousel-gradient');
  block.append(gradient);

  const carousel = new Carousel(uiInner);

  // after appended..
  setTimeout(() => {
    carousel.init();
  }, 100);
}
