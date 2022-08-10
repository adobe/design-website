import setBodyColor from '../../scripts/body-color.js';
import { createOptimizedPicture, lookupPages, loadScript } from '../../scripts/scripts.js';
import tagLink from '../../scripts/tag-link.js';

class Carousel {
  initialized = false;

  proxy;

  timer;

  animation;

  slideDelay = 8.5;

  slideDuration = 1;

  snapX;

  backgroundContianer;

  gsap;

  constructor(ui) {
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
  }

  init() {
    if (this.initialized) {
      return;
    }

    const { gsap } = window;

    const slideHolder = document.querySelector('.carousel-group');
    slideHolder.classList.remove('hidden');

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
    this.colorAnimation = gsap.to({}, {});
    this.slideWidth = 0;
    this.wrapWidth = 0;

    this.initialized = true;

    this.resize();
  }

  updateProgress() {
    const { gsap } = window;
    const time = this.progressWrap(gsap.getProperty(this.proxy, 'x') / this.wrapWidth);
    this.animation.progress(time);
  }

  animateSlides(direction) {
    const { gsap } = window;
    const x = this.snapX(gsap.getProperty(this.proxy, 'x') + direction * this.slideWidth);

    this.timer.restart(true);

    this.slideAnimation.kill();
    this.slideAnimation = gsap.to(this.proxy, {
      x,
      duration: this.slideDuration,
      ease: 'power2.out',
      onUpdate: () => this.updateProgress(),
    });

    this.colorAnimation.kill();
    this.colorAnimation = gsap.delayedCall(0, () => {
      const time = this.progressWrap(x / this.wrapWidth);
      const slideIndex = Math.round(time * this.slides.length);
      const slide = this.slides[slideIndex];
      if (slide) {
        const { color } = slide.dataset;
        setBodyColor(color);
        document.documentElement.style.setProperty('--header-color', color);
      }
    });
  }

  autoPlay() {
    this.animateSlides(-1);
  }

  resize() {
    const { gsap } = window;
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

async function loadCarousel(carousel) {
  const GSAP_URL = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js';
  const GSAP_CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/CSSRulePlugin.min.js';

  loadScript(GSAP_URL, () => {
    loadScript(GSAP_CSS_URL, () => {
      const slides = document.querySelectorAll('.carousel-slide');
      const interval = setInterval(() => {
        if (slides[0].offsetWidth > 0) {
          clearInterval(interval);
          carousel.init();
        }
      }, 10);
    });
  });
}

export default async function decorate(block) {
  const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  block.textContent = '';

  const stories = await lookupPages(pathnames);

  const container = document.createElement('div');
  container.classList.add('carousel-group', 'hidden');
  block.append(container);

  const ul = document.createElement('ul');
  ul.classList.add('carousel-slides');
  ul.style.width = `${stories.length * 100}%`;
  container.append(ul);

  const ui = document.createElement('div');
  ui.classList.add('carousel-ui');
  container.append(ui);

  const uiInner = document.createElement('div');
  uiInner.classList.add('carousel-ui-inner');
  ui.append(uiInner);

  const scrollDown = document.createElement('div');
  scrollDown.classList.add('carousel-indicator-scroll');
  scrollDown.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20.702" height="12.413" viewBox="0 0 20.702 12.413">
  <g id="Chevron" transform="translate(-154.009 -37.009)">
    <rect id="Frame" width="20" height="12" transform="translate(154.219 37.331)" fill="currentColor" opacity="0"/>
    <path id="Shape" d="M20.708,2.087A2.074,2.074,0,0,0,17.168.615L10.361,7.429,3.553.615A2.078,2.078,0,1,0,.615,3.553l8.28,8.259a2.074,2.074,0,0,0,2.932,0l8.28-8.259A2.074,2.074,0,0,0,20.708,2.087Z" transform="translate(154.003 37.003)" fill="currentColor"/>
  </g>
</svg>
`;
  uiInner.appendChild(scrollDown);

  const carousel = new Carousel(uiInner);

  stories.forEach((row, i) => {
    const li = document.createElement('li');
    const bgColor = row.color !== '' ? row.color : '#fff';

    li.dataset.color = bgColor;
    li.classList.add('carousel-slide');

    if (i === 0) {
      setBodyColor(bgColor);
      document.documentElement.style.setProperty('--header-color', bgColor);
    }

    const slideContainer = document.createElement('div');
    slideContainer.classList.add('carousel-slide-container');

    const slideContent = document.createElement('div');
    slideContent.classList.add('carousel-slide-content');

    const tag = row.tag ? `${row.tag}` : '';

    const slideCopy = document.createElement('div');
    slideCopy.classList.add('carousel-slide-copy');
    slideCopy.innerHTML = `
    <a href="${tagLink(row.path)}" class="cmp-stories-card__tag">${tag}</a>
    <h2 class="carousel-stories-card__title"><a href="${row.path}">${row.title}</a></h2>
    <div class="cmp-stories-card__intro">${row.subtitle}</div>
    <div class="cmp-stories-card__author">by ${row.author}</div>
    <div>${row.authorTitle}</div>`;

    slideContent.append(slideCopy);

    const pictureHolder = document.createElement('div');
    pictureHolder.classList.add('carousel-picture-holder');
    slideContent.append(pictureHolder);

    const pictureLink = document.createElement('a');
    pictureLink.setAttribute('href', `${row.path}`);
    pictureHolder.append(pictureLink);

    pictureLink.append(createOptimizedPicture(row.image, row.title, !i));

    slideContainer.append(slideContent);
    li.append(slideContainer);

    ul.append(li);
  });

  const gradient = document.createElement('div');
  gradient.classList.add('carousel-gradient');
  block.append(gradient);

  gradient.innerHTML = `<svg class="carousel-gradient-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
  <defs>
      <linearGradient id="Gradient" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="white"/>
        <stop offset="100%" stop-color="black"/>
      </linearGradient>
      <mask id="mask">
        <rect x="0" y="0" width="100" height="100" fill="url(#Gradient)"/>
      </mask>
  </defs>
  <rect class="svg-bg" x="0" y="0" width="100" height="100" fill="red" mask="url(#mask)"/>
</svg>`;

  let didScroll = false;

  function checkScrollIndicator() {
    if (didScroll) {
      return;
    }

    const contianer = document.querySelector('.stories-container');
    const rect = contianer.getBoundingClientRect();
    const indicator = document.querySelector('.carousel-indicator-scroll');

    if (rect.top < window.innerHeight) {
      indicator.classList.remove('show');
    } else {
      indicator.classList.add('show');
    }
  }

  function hideScrollIndicator() {
    if (!didScroll) {
      const indicator = document.querySelector('.carousel-indicator-scroll');
      indicator.classList.remove('show');
    }

    didScroll = true;
  }

  window.addEventListener('resize', checkScrollIndicator);
  window.addEventListener('scroll', hideScrollIndicator);

  setTimeout(() => {
    loadCarousel(carousel);
    checkScrollIndicator();
  }, 4000);
}
