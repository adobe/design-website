import { createOptimizedPicture, lookupPages, readBlockConfig } from '../../scripts/scripts.js';

function createCard(row) {
  const card = document.createElement('article');
  card.classList.add('cmp-stories-card');

  const imageLink = document.createElement('a');
  imageLink.href = row.path;
  imageLink.append(createOptimizedPicture(row.image, row.title));

  const cardIntro = `${row.subtitle ? `<p class="cmp-stories-card__intro">${row.subtitle}</p>` : ''}`;
  const cardAuthor = `${row.author ? `<p class="cmp-stories-card__author">by ${row.author}</p>` : ''}`;
  const cardAuthorTitle = `${row.authorTitle ? `<p class="cmp-stories-card__author-title">${row.authorTitle}</p>` : ''}`;
  const cardTag = row.tag !== '' ? `${row.tag}` : '';

  card.innerHTML = `
    <div class="cmp-stories-card__body">
      <span class="cmp-stories-card__tag">${cardTag}</span>
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
  card.prepend(imageLink);
  card.querySelector('picture').classList.add('cmp-stories-card__media');
  return (card);
}

export default async function decorate(block) {
  const config = readBlockConfig(block);
  const pathnames = config.featured ? config.featured.map((link) => new URL(link).pathname) : [];
  block.textContent = '';

  const stories = await lookupPages(pathnames);
  stories.forEach((row) => {
    block.append(createCard(row));
  });
  const allStories = window.pageIndex.data.stories.data;
  const remaining = allStories.filter((e) => !pathnames.includes(e.path) && e.path !== '/stories/');

  for (let i = 0; i < Math.min(+config.limit - stories.length, remaining.length); i += 1) {
    const row = remaining[i];
    block.append(createCard(row));
  }

  const pageTitle = document.querySelector('h1');
  pageTitle.classList.add('page-title');

  const storyFeedContainerInner = document.querySelector('.story-feed-container').firstChild;
  storyFeedContainerInner.classList.add('cmp-stories__inner-wrap');

  const pageTitleWrap = document.createElement('div');
  pageTitleWrap.classList.add('cmp-page__title-wrap');

  pageTitleWrap.append(pageTitle);
  storyFeedContainerInner.prepend(pageTitleWrap);
}
