import { Background } from '../../scripts/background.js';
import {
  $wrap, $element, decorateDivisions, decorateTagLink, propsFromBlockLink,
} from '../../scripts/helpers.js';
import { addArrowButton } from '../button/button.js';

const SLIDE_TIME = 7000;
const ANIMATION_TIME = 250;

const carouselProperties = {
  slides: [],
};

// Function for testing building of carousel while I cant change the doc
function convertSlideToUseProperties(slide) {
  const imageSection = slide.querySelector('div:nth-child(1)');
  const rawSection = slide.querySelector('div:nth-child(2)');
  const propSection = slide.querySelector('div:nth-child(3)');

  if (!imageSection || !rawSection || !propSection) return;

  if (!rawSection.innerHTML) return;

  const tag = rawSection.querySelector(':nth-child(1)');
  const hed = rawSection.querySelector(':nth-child(2)');
  const dek = rawSection.querySelector(':nth-child(3)');
  const author = rawSection.querySelector(':nth-child(4)');
  const position = rawSection.querySelector(':nth-child(5)');

  propSection.append($element('p', `Tag: ${tag.innerHTML.replaceAll('#', ' ').toUpperCase()}`));
  propSection.append($element('p', `hed: ${hed.innerHTML}`));
  propSection.append($element('p', `dek: ${dek.innerHTML}`));
  propSection.append($element('p', `author: ${author.innerHTML}`));
  if (position) {
    propSection.append($element('p', `position: ${position.innerHTML}`));
  }

  rawSection.remove();
}

export default async function decorate($block) {
  $block.classList.add('full-bleed');

  // Adds everything for the scroll tip
  const scrollHintContainer = $element('.scroll-tip-container');
  const scrollHintContent = $element('h2.scroll-tip-content', 'Scroll Down');
  const scrollHintChevron = $element('.chevron-down');

  $wrap(scrollHintContainer, [scrollHintContent, scrollHintChevron]);
  $block.parentNode.insertBefore(scrollHintContainer, $block.nextSibling);

  const $carousel = $block.querySelectorAll(':scope > div');
  let firstSlide = true;
  for (const slide of $carousel) {
    /*
     * Helper function for changing the doc content while we are still have old structure
     * Remove once we update the doc
     */
    convertSlideToUseProperties(slide);

    // Get Properties
    // eslint-disable-next-line no-await-in-loop
    const props = await propsFromBlockLink(slide, {
      path: 'path',
      hed: 'title',
      dek: 'description',
      image: 'image',
      background: { field: 'color', default: 'red' },
      textcolor: { field: 'textcolor', default: 'white' },
      tag: { field: 'tags', default: '' },
    });
    const { properties } = decorateDivisions(slide, null, { level: 'child' });
    Object.assign(props, properties);
    carouselProperties.slides.push(props);

    slide.classList.add('carousel__item');
    if (firstSlide) {
      slide.classList.add('carousel__item--visible', 'firstChild');
      firstSlide = false;
    }

    // Add Image
    const imageSide = slide.querySelector('div:nth-child(1)');
    imageSide.classList.add('image');
    if (!imageSide.innerHTML && !!props.image) {
      imageSide.append($element('picture', [
        $element('source', [
          $element('img', { attr: { src: props.image } }),
        ]),
      ]));
    }

    // Add Slide Details
    const HED_TEXT_LIMIT = 50;
    const DEK_TEXT_LIMIT = 75;

    const rightSide = $element('.number');
    if (props.tag) rightSide.append(decorateTagLink($element('p.tag', ['#', $element('span.tag', props.tag)]), props.tag.replaceAll(' ', '-')));

    if (props.hed) {
      const hedText = props.hed.length < HED_TEXT_LIMIT ? props.hed : `${props.hed.substring(0, HED_TEXT_LIMIT - 3)}...`;
      rightSide.append($element('h2.hed', hedText));
    }
    if (props.dek) {
      const dekText = props.dek.length < DEK_TEXT_LIMIT ? props.dek : `${props.dek.substring(0, DEK_TEXT_LIMIT - 3)}...`;
      rightSide.append($element('h3.dek', dekText));
    }
    if (props.author) rightSide.append($element('p.byline', props.author));
    if (props.position) rightSide.append($element('p', props.position));

    const articleLink = $element('a.stories-link.carousel-link', { attr: { href: props.path || '/stories/' } });

    articleLink.append(imageSide);
    articleLink.append(rightSide);

    slide.append(articleLink);
  }

  const actions = $element('.carousel__actions');

  const prevDiv = addArrowButton('prev');
  const nextDiv = addArrowButton('next');

  actions.append(prevDiv);
  actions.append(nextDiv);

  $block.append(actions);

  let slidePosition = 0;
  const slides = document.getElementsByClassName('carousel__item');
  const prev = document.getElementsByClassName('carousel__button--next');
  const next = document.getElementsByClassName('carousel__button--prev');
  const totalSlides = slides.length;

  function applyColor(slideIndex) {
    Background.setColor(carouselProperties.slides[slideIndex].background);
  }

  function applySlide() {
    applyColor(slidePosition);
  }

  function updateSlidePosition() {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i].classList.contains('carousel__item--visible')) {
        slides[i].classList.add('opacity-zero');
        setTimeout(() => {
          slides[i].classList.remove('carousel__item--visible', 'visible-animation-rev', 'visible-animation');
          slides[i].classList.remove('opacity-zero');
        }, ANIMATION_TIME);
      }

      if (i === slidePosition) {
        setTimeout(() => {
          slides[i].classList.add('carousel__item--visible', 'visible-animation');
        }, ANIMATION_TIME);
      }
    }
    applySlide();
  }
  function updateSlidePositionRev() {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i].classList.contains('carousel__item--visible')) {
        slides[i].classList.add('opacity-zero-rev');
        setTimeout(() => {
          slides[i].classList.remove('carousel__item--visible', 'visible-animation-rev', 'visible-animation');
          slides[i].classList.remove('opacity-zero-rev');
        }, ANIMATION_TIME);
      }

      if (i === slidePosition) {
        setTimeout(() => {
          slides[i].classList.add('carousel__item--visible', 'visible-animation-rev');
        }, ANIMATION_TIME);
      }
    }

    applySlide();
  }

  function moveToNextSlide() {
    if (slidePosition === totalSlides - 1) {
      slidePosition = 0;
    } else {
      slidePosition += 1;
    }
    updateSlidePosition();
  }

  function moveToPrevSlide() {
    if (slidePosition === 0) {
      slidePosition = totalSlides - 1;
    } else {
      slidePosition -= 1;
    }
    updateSlidePositionRev();
  }

  let autoInterval = setInterval(() => {
    moveToPrevSlide();
  }, SLIDE_TIME);

  function stopAutoMode() {
    if (autoInterval) {
      clearInterval(autoInterval);
      autoInterval = null;
    }
  }

  let timeout = null;

  function clickTimeout() {
    timeout = window.setTimeout(() => {
      window.clearTimeout(timeout);
      timeout = null;
    }, ANIMATION_TIME);
  }

  next[0].addEventListener('click', () => {
    if (timeout) return;

    clickTimeout();
    stopAutoMode();
    moveToNextSlide();
  });

  prev[0].addEventListener('click', () => {
    if (timeout) return;

    clickTimeout();
    stopAutoMode();
    moveToPrevSlide();
  });

  applySlide();
}
