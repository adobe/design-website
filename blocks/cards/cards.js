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

  const tertiaryHeadline = block.previousSibling;
  tertiaryHeadline.classList.add('cmp-inclusive__headline--tertiary');
}

export default async function decorate(block) {
  document.querySelector('h1').classList.add('page-title');
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
