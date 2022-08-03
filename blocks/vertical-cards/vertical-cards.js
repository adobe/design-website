import {
  createOptimizedPicture, lookupPages,
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
