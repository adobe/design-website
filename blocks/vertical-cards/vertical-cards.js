import {
  createOptimizedPicture, lookupPages,
} from '../../scripts/scripts.js';
import colormap from '../../scripts/colormap.js';

function createCard(row) {
  const card = document.createElement('article');
  card.classList.add('cmp-vertical-card');

  const cardDescription = `${row.description ? `<p class="cmp-vertical-card__description">${row.description}</p>` : ''}`;
  const url = row.path;
  const cardTitle = `<a href="${url}">${row.title}</a>`;
  const cardBGColor = row.color !== '' ? row.color : '#fff';
  const textColor = colormap[cardBGColor];

  if (textColor === 'black') {
    card.classList.add('dark-text');
  } else {
    card.classList.add('light-text');
  }

  const imageLink = document.createElement('a');
  imageLink.href = url;
  imageLink.append(createOptimizedPicture(row.image, row.title));

  card.innerHTML = `
    <div class="cmp-vertical-card__body">
      <h2 class="cmp-vertical-card__title">${cardTitle}</h2>
      ${cardDescription}
    </div>
  `;

  card.style.backgroundColor = cardBGColor;
  card.prepend(imageLink);
  card.querySelector('picture').classList.add('cmp-vertical-card__media');
  return (card);
}

export default async function decorate(block) {
  const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  [...block.querySelectorAll('div')].forEach(container => {
    if (container.querySelectorAll('a').length) {
      container.remove();
    }
  })

  const cards = await lookupPages(pathnames);

  cards.forEach((row) => {
    block.append(createCard(row));
  });
}
