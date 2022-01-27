import * as gsap from '../../scripts/gsap.js';
import { createOptimizedPicture, lookupPages } from '../../scripts/scripts.js';

class Carousel {
  slideDelay = 1.5;

  slideDuration = 0.3;

  snapX;

  constructor(block) {
    this.block = block;
  }

  init() {
    const prevButton = document.createElement('div');
    prevButton.classList.add('carousel-btn');
    prevButton.classList.add('carousel-btn-prev');
    this.block.appendChild(prevButton);

    const nextButton = document.createElement('div');
    nextButton.classList.add('carousel-btn');
    nextButton.classList.add('carousel-btn-next');
    this.block.appendChild(nextButton);

    nextButton.addEventListener('click', () => {

    });

    prevButton.addEventListener('click', () => {

    });

    this.slides = document.querySelectorAll('.carousel-slide');
    this.progressWrap = gsap.utils.wrap(0, 1);
    this.numSlides = this.slides.length;

    gsap.set(this.slides, {
      backgroundColor: 'random([red, blue, green, purple, orange, yellow, lime, pink])',
      xPercent: (i) => i * 100,
    });

    this.wrap = gsap.utils.wrap(-100, (this.numSlides - 1) * 100);
    this.timer = gsap.delayedCall(this.slideDelay, this.autoPlay);

    this.animation = gsap.to(this.slides, {
      xPercent: `+=${this.numSlides * 100}`,
      duration: 1,
      ease: 'none',
      paused: true,
      repeat: -1,
      modifiers: {
        xPercent: this.wrap,
      },
    });

    this.proxy = document.createElement('div');
    this.slideAnimation = gsap.to({}, {});
    this.slideWidth = 0;
    this.wrapWidth = 0;
    this.resize();
  }

  updateProgress() {
    this.animation.progress(this.progressWrap(gsap.getProperty(this.proxy, 'x') / this.wrapWidth));
  }

  animateSlides(direction) {
    const x = this.snapX(gsap.getProperty(this.proxy, 'x') + direction * this.slideWidth);

    this.timer.restart(true);
    this.slideAnimation.kill();

    this.slideAnimation = gsap.to(this.proxy, {
      x,
      duration: this.slideDuration,
      onUpdate: this.updateProgress,
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

  const carousel = new Carousel(block);
  carousel.init();
}
