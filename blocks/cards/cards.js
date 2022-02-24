import {
  createOptimizedPicture, lookupPages, getMetadata,
} from '../../scripts/scripts.js';
import colormap from '../../scripts/colormap.js';

function createCard(row) {
  const card = document.createElement('article');
  card.classList.add('cmp-cards-card');

  const cardDescription = `${row.description ? `<p class="cmp-cards-card__description">${row.description}</p>` : ''}`;
  const cardBGColor = row.color !== '' ? row.color : '#fff';
  const textColor = colormap[cardBGColor];
  const url = row.path;

  if (textColor === 'black') {
    card.classList.add('dark-text');
  } else {
    card.classList.add('light-text');
  }

  card.innerHTML = `
    <div class="cmp-cards-card__body">
      <h2 class="cmp-cards-card__title">
        <a href="${url}">${row.title}</a>
      </h2>
      ${cardDescription}
    </div>
  `;

  card.style.backgroundColor = cardBGColor;
  card.prepend(createOptimizedPicture(row.image, row.title));
  card.querySelector('picture').classList.add('cmp-cards-card__media');
  return (card);
}

/*!
 * Get all following siblings of each element up to but not including the element matched by the selector
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}   elem     The element
 * @param  {String} selector The selector to stop at
 * @param  {String} filter   The selector to match siblings against [optional]
 * @return {Array}           The siblings
 */
/* eslint-disable */
const nextUntil = function (elem, selector, filter) {
  // Setup siblings array
  const siblings = [];

  // Get the next sibling element
  elem = elem.nextElementSibling;

  // As long as a sibling exists
  while (elem) {
    // If we've reached our match, bail
    if (elem.matches(selector)) break;

    // If filtering by a selector, check if the sibling matches
    if (filter && !elem.matches(filter)) {
      elem = elem.nextElementSibling;
      continue;
    }

    // Otherwise, push it to the siblings array
    siblings.push(elem);

    // Get the next sibling element
    elem = elem.nextElementSibling;
  }

  return siblings;
};
/* eslint-enable */

function decorateInclusiveDesignPage(block) {
  const cardsParent = block.parentNode;
  cardsParent.classList.add('cmp-inclusive__inner-wrap');
  const pageTitleWrap = document.createElement('div');
  pageTitleWrap.classList.add('cmp-inclusive__title-wrap');

  const pageTitle = document.querySelector('h1');
  const pageTitleClone = pageTitle.cloneNode(true);
  pageTitleClone.classList.add('page-title');

  // const topGroup = nextUntil(pageTitle, '.cards.block');
  // const topGroupClone = topGroup.slice(0);

  pageTitleWrap.append(pageTitleClone);
  // cardsParent.prepend(pageTitleWrap);

  // const overallContainer = document.querySelector('.section-wrapper');
  // overallContainer.prepend(pageTitleClone);
  pageTitle.remove();

  const childrenToWrap = [...cardsParent.children];
  cardsParent.innerHTML = '';
  cardsParent.append(pageTitleWrap);
  const containerBG = document.createElement('div');
  containerBG.classList.add('cmp-inclusive__bg');
  cardsParent.append(containerBG);
  containerBG.append(...childrenToWrap);

  const heroImage = containerBG.querySelector('p > picture');
  heroImage.parentElement.classList.add('cmp-inclusive__hero-parent');

  const secondaryHeadline = document.querySelector('.cmp-inclusive__hero-parent').nextElementSibling;
  secondaryHeadline.classList.add('cmp-inclusive__headline--secondary');

  const introParagraph = secondaryHeadline.nextElementSibling;
  introParagraph.classList.add('cmp-inclusive__intro');

  const tertiaryHeadline = block.previousSibling;
  tertiaryHeadline.classList.add('cmp-inclusive__headline--tertiary');

  // const topStart = document.querySelector('h1');
  // const topGroupContainer = document.createElement('div');
  // topGroupContainer.classList.add('top-group-container');

  // topGroupContainer.append(...topGroup);
  // block.append(topGroupContainer);
  // topGroup.forEach((elem) => elem.remove());

  // const collaboratorsStart = document.querySelector('.cards.block').nextElementSibling;
  // const collabGroup = nextUntil(collaboratorsStart, '');
}

export default async function decorate(block) {
  const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  block.textContent = '';
  const cards = await lookupPages(pathnames);
  cards.forEach((row) => {
    block.append(createCard(row));
  });

  const isInclusiveDesignPage = getMetadata('theme') === 'inclusive-design';

  if (!isInclusiveDesignPage) {
    const cardsContainerInner = document.querySelector('.cards-container').firstChild;
    cardsContainerInner.classList.add('cmp-cards__inner-wrap');
  } else {
    decorateInclusiveDesignPage(block);
  }
}
