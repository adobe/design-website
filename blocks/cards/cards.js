import {
  createOptimizedPicture, lookupPages,
} from '../../scripts/scripts.js';
import colormap from '../../scripts/colormap.js';

function createCard(row) {
  const card = document.createElement('article');
  card.classList.add('cmp-cards-card');

  const cardDescription = `${row.description ? `<p class="cmp-cards-card__description">${row.description}</p>` : ''}`;
  const cardBGColor = row.color !== '' ? row.color : '#fff';
  const textColor = colormap[cardBGColor];

  if (textColor === 'black') {
    card.classList.add('dark-text');
  } else {
    card.classList.add('light-text');
  }

  card.innerHTML = `
    <div class="cmp-cards-card__body">
      <h2 class="cmp-cards-card__title">
        <a href="${row.path}">${row.title}</a>
      </h2>
      ${cardDescription}
    </div>
  `;

  card.style.backgroundColor = cardBGColor;
  card.prepend(createOptimizedPicture(row.image, row.title));
  card.querySelector('picture').classList.add('cmp-stories-card__media');
  return (card);
}

export default async function decorate(block) {
  const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  block.textContent = '';
  const cards = await lookupPages(pathnames);
  cards.forEach((row) => {
    block.append(createCard(row));
  });
  const cardsContainerInner = document.querySelector('.cards-container').firstChild;
  cardsContainerInner.classList.add('cmp-cards__inner-wrap');
}
