import { createOptimizedPicture, lookupPages, readBlockConfig } from '../../scripts/scripts.js';
import tagLink from '../../scripts/tag-link.js';

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
      <a href="${tagLink(row.path)}" class="cmp-stories-card__tag">${cardTag}</a>
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

  // Gets the current page url and finds the last directory in the path
  const storiesURL = window.location.href;
  const storiesURLArray = storiesURL.split('/');
  const storiesURLCount = storiesURLArray.length;
  // Since we’re splitting with the “/” there’s
  // an empty string at the end of the array.
  // Hence the `[storiesURLCount - 2]`:
  const storiesTagPath = storiesURLArray[storiesURLCount - 2];

  const stories = await lookupPages(pathnames);
  stories.forEach((row) => {
    block.append(createCard(row));
  });
  const allStories = window.pageIndex.data.stories.data;
  /* eslint-disable */
  // There is a lot happening with the following `remaining` const
  // It is filtering the stories available to see if they match a
  // tag URL or if this is the root level of `stories` to display all
  const remaining = allStories.filter((e) =>
    /* 1) Check the path exists */!
    pathnames.includes(e.path) &&
    /* 2) Make sure it’s not the root */
    e.path !== '/stories/' &&
    /* 3) Make sure it's not the tag path */
    e.tag !== '' && 
    /* 4) If not the root then check if it has the tag */
    e.path.includes((e.path !== '/stories/') ? `/${storiesTagPath}/` : '' )
  );
  /* eslint-enable */
  remaining.sort((a, b) => b.date - a.date);

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
