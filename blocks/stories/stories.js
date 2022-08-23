import {
  createOptimizedPicture, lookupPages,
} from '../../scripts/scripts.js';
import colormap from '../../scripts/colormap.js';
import formatCardByline from '../../scripts/format-card-byline.js';
import getAuthorTitles from '../../scripts/get-author-titles.js';
import tagLink from '../../scripts/tag-link.js';

function createCard(row) {
  const card = document.createElement('article');
  card.classList.add('cmp-stories-card');

  const imageLink = document.createElement('a');
  imageLink.href = row.path;
  imageLink.append(createOptimizedPicture(row.image, row.title));

  const cardSubTitle = `${row.subtitle ? `<p class="cmp-stories-card__intro">${row.subtitle}</p>` : ''}`;
  const cardByline = formatCardByline(row);
  const cardBGColor = row.color !== '' ? row.color : '#fff';
  const textColor = colormap[cardBGColor];
  const cardTag = row.tag !== '' ? `${row.tag}` : '';

  if (textColor === 'black') {
    card.classList.add('dark-text');
  } else {
    card.classList.add('light-text');
  }

  card.innerHTML = `
    <div class="cmp-stories-card__body">
      <a href="${tagLink(row.path)}" class="cmp-stories-card__tag">${cardTag}</a>
      <h2 class="cmp-stories-card__title">
        <a href="${row.path}">${row.title}</a>
      </h2>
      ${cardSubTitle}
      <div class="cmp-stories-card__attribution">
        ${cardByline}
      </div>
    </div>
  `;

  card.style.backgroundColor = cardBGColor;
  card.prepend(imageLink);
  card.querySelector('picture').classList.add('cmp-stories-card__media');
  return (card);
}

export default async function decorate(block) {
  const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  block.textContent = '';
  const stories = await lookupPages(pathnames);
  stories.forEach(async (row) => {
    row.authorTitle = await getAuthorTitles(row);
    block.append(createCard(row));
  });
}
