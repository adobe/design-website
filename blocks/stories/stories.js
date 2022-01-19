import { createOptimizedPicture, lookupPages } from '../../scripts/scripts.js';

function createCard(row) {
  // console.log(row.color);
  const card = document.createElement('article');
  card.classList.add('cmp-stories-card');

  const cardIntro = `${row.description ? `<p class="cmp-stories-card__intro">${row.description}</p>` : ''}`;
  const cardAuthor = `${row.author ? `<p class="cmp-stories-card__author">${row.author}</p>` : ''}`;
  const cardAuthorTitle = `${row.authorTitle ? `<p class="cmp-stories-card__author-title">${row.authorTitle}</p>` : ''}`;

  const cardColorClass = row.color !== '' ? `cmp-stories-card--${row.color}` : null;

  if (cardColorClass !== null) {
    card.classList.add(cardColorClass);
  }

  card.innerHTML = `
    <div class="cmp-stories-card__body">
      <span class="cmp-stories-card__tag">#Process</span>
      <h2 class="cmp-stories-card__title">
        <a href="${row.path}">${row.title}</a>
      </h2>
      ${cardIntro}
      <div class="cmp-stories-card__attribution">
        ${cardAuthor}
        ${cardAuthorTitle}
      </div>
    </div>
  `;
  card.prepend(createOptimizedPicture(row.image, row.title));
  card.querySelector('picture').classList.add('cmp-stories-card__media');
  return (card);
}

export default async function decorate(block) {
  const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  block.textContent = '';
  const stories = await lookupPages(pathnames);
  stories.forEach((row) => {
    block.append(createCard(row));
  });
}
