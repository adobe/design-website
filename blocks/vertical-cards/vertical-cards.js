import {
  createOptimizedPicture, lookupPages, getMetadata,
} from '../../scripts/scripts.js';

function createCard(row) {
  const card = document.createElement('article');
  card.classList.add('cmp-vertical-card');

  const cardDescription = `${row.description ? `<p class="cmp-vertical-card__description">${row.description}</p>` : ''}`;
  const url = row.path;
  const cardTitle = `<a href="${url}">${row.title}</a>`;

  const imageLink = document.createElement('a');
  imageLink.href = url;
  imageLink.append(createOptimizedPicture(row.image, row.title));

  card.innerHTML = `
    <div class="cmp-vertical-card__body">
      <h2 class="cmp-vertical-card__title">${cardTitle}</h2>
      ${cardDescription}
    </div>
  `;

  card.prepend(imageLink);
  card.querySelector('picture').classList.add('cmp-vertical-card__media');
  return (card);
}

function decorateInclusiveDesignPage(block) {
  const cardsParent = block.parentNode;
  cardsParent.classList.add('cmp-inclusive__inner-wrap');
  const pageTitleWrap = document.createElement('div');
  pageTitleWrap.classList.add('cmp-inclusive__title-wrap');

  const pageTitle = document.querySelector('h1');
  const pageTitleClone = pageTitle.cloneNode(true);
  pageTitleClone.classList.add('page-title');

  pageTitleWrap.append(pageTitleClone);
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
}

export default async function decorate(block) {
  const pageTitle = document.querySelector('h1');
  pageTitle.classList.add('page-title');

  const pageSubTitle = pageTitle.nextElementSibling ? pageTitle.nextElementSibling : '';
  if (pageSubTitle.tagName === 'H2') pageSubTitle.classList.add('page-subtitle');

  const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  block.textContent = '';
  const cards = await lookupPages(pathnames);
  cards.forEach((row) => {
    block.append(createCard(row));
  });
}
