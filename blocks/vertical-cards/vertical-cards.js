import {
  createOptimizedPicture, lookupPages,
} from '../../scripts/scripts.js';
import colormap from '../../scripts/colormap.js';
import tagLink from '../../scripts/tag-link.js';

function createCard(row) {
  const card = document.createElement('article');
  card.classList.add('cmp-vertical-card');

  const cardDescription = `${row.description ? `<p class="cmp-vertical-card__description">${row.description}</p>` : ''}`;
  const url = row.path;
  const cardTag = row.tag !== '' ? `${row.tag}` : '';
  const cardTitle = `<a href="${url}">${row.title}</a>`;
  const cardAuthor = `${row.author ? `<p class="cmp-vertical-card__author">by ${row.author}</p>` : ''}`;
  const cardAuthorTitle = `${row.authorTitle ? `<p class="cmp-vertical-card__author-title">${row.authorTitle}</p>` : ''}`;
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
      <a href="${tagLink(row.path)}" class="cmp-vertical-card__tag">${cardTag}</a>

      <h2 class="cmp-vertical-card__title">${cardTitle}</h2>
      ${cardDescription}
      
      <div class="cmp-vertical-card__attribution">
        ${cardAuthor}
        ${cardAuthorTitle}
      </div>
    </div>
  `;

  card.style.backgroundColor = cardBGColor;
  card.prepend(imageLink);
  card.querySelector('picture').classList.add('cmp-vertical-card__media');
  return (card);
}

export default async function decorate(block) {
  const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  [...block.querySelectorAll('div')].forEach((container) => {
    if (container.querySelectorAll('a').length) {
      container.remove();
    }
  });

  const cards = await lookupPages(pathnames);

  cards.forEach((row) => {
    block.append(createCard(row));
  });
}
