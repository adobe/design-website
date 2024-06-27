import { getMetadata, toClassName } from '../../scripts/scripts.js';
import tagLink from '../../scripts/tag-link.js';

export default async function decorate(block) {
  const ledeBlock = block;
  const articleComponent = ledeBlock.parentNode.parentNode;
  const articleInnerWrap = articleComponent.firstChild;
  const articleTitle = articleComponent.querySelector('h1');
  const articleSubTitle = articleTitle.nextElementSibling;
  const articleTagData = getMetadata('tag');
  const articleAuthorData = getMetadata('author');
  const isProfile = getMetadata('theme') === 'profile';

  // before anything else, try to wrap most of the DOM elements in a div
  // to provide a solid white background appearance & stay true to the design
  // first three elements should be h1, h2, p (for hero image)
  // articleInnerWrap is the parent
  const articleBackground = document.createElement('div');
  articleBackground.classList.add('cmp-lede__article-bg');

  const articleTitleWrap = document.createElement('div');
  articleTitleWrap.classList.add('cmp-lede__article-title-wrap');

  const childrenToWrap = [...articleInnerWrap.children].slice(2);
  articleInnerWrap.innerHTML = '';
  articleInnerWrap.append(articleTitleWrap);
  articleTitleWrap.append(articleTitle);
  articleTitleWrap.append(articleSubTitle);
  articleBackground.append(...childrenToWrap);
  articleInnerWrap.append(articleBackground);

  ledeBlock.classList.add('cmp-lede__intro');

  const articleTag = document.createElement('p');
  articleTag.innerHTML = `
    <a class="cmp-lede__tag-link" href="${tagLink(window.location.pathname)}">${articleTagData}</a>
  `;
  articleTag.classList.add('cmp-lede__tag');
  articleTitle.parentNode.insertBefore(articleTag, articleTitle.parentNode.firstChild);

  articleComponent.classList.add('cmp-lede');
  articleInnerWrap.classList.add('cmp-lede__inner-wrap');
  articleTitle.classList.add('page-title');

  if (articleSubTitle.tagName === 'H2') {
    articleSubTitle.classList.add('page-subtitle');
  }

  document.querySelectorAll('p > picture').forEach((picture) => {
    picture.parentNode.classList.add('cmp-lede__media-parent');
  });

  const firstImage = articleInnerWrap.querySelector('p picture:first-of-type');
  firstImage.classList.add('cmp-lede__hero');

  const heroImageContainer = firstImage.parentNode;
  heroImageContainer.classList.add('cmp-lede__hero-parent');

  // try to identify the hero image caption/attribution
  const heroCaption = heroImageContainer.nextElementSibling;
  if (heroCaption.tagName === 'P' && heroCaption.tagName !== 'DIV') {
    heroCaption.classList.add('cmp-lede__hero-caption');
  }

  // use the author data for two separate features:
  // 1. the "attribution" shown at the top of each story
  // 2. the "author details" block shown below each story
  const authorData = articleAuthorData.split(', ');

  const respArray = await Promise.all(authorData.map(async (data) => {
    const resp = await fetch(`/authors/${(toClassName(data))}.plain.html`);
    return resp;
  }));
  const htmlArray = await Promise.all(respArray.map(async (resp) => resp.text()));

  // create & decorate "attribution" piece first
  const articleAttributionContainer = document.createElement('div');
  articleAttributionContainer.classList.add('cmp-lede__attribution');

  htmlArray.forEach((author) => {
    const authorContainer = document.createElement('div');
    authorContainer.innerHTML = author;

    const authorTextContent = authorContainer.querySelector('h1').textContent;

    const authorName = (authorTextContent !== null && authorTextContent !== '')
      ? `<p class="cmp-lede__author">${authorContainer.querySelector('h1').textContent}</p>` : '';

    const authorTitle = (authorContainer.querySelector('h2') !== null)
      ? `<p class="cmp-lede__author-title">${authorContainer.querySelector('h2').textContent}</p>` : '';

    articleAttributionContainer.innerHTML += `
    <div>
      ${authorName}
      ${authorTitle}
    </div>
    `;
  });

  // only create & decorate "author details" block if there is an author
  const authorDetailsName = getMetadata('author');
  if (
    authorDetailsName !== null
  ) {
    const articleDetailsBlock = document.createElement('div');
    articleDetailsBlock.classList.add('cmp-author-details');
    const publishedDate = document.createElement('p');
    publishedDate.classList.add('cmp-author-details__pub-date');
    publishedDate.innerHTML = getMetadata('publication-date');

    htmlArray.forEach((author) => {
      const authorContainer = document.createElement('div');
      authorContainer.classList.add('cmp-author-details__author');
      authorContainer.innerHTML = author;
      const authorTextContent = authorContainer.querySelector('h1').textContent;
      const bioParagraphs = [...authorContainer.querySelectorAll('div > p')].filter((graph) => !graph.querySelector('picture'));

      const authorName = (authorTextContent !== null && authorTextContent !== '')
        ? `<p class="cmp-author-details__name">${authorContainer.querySelector('h1').textContent}</p>` : '';

      const authorDetailsTitle = (authorContainer.querySelector('h2') !== null)
        ? `<p class="cmp-author-details__title">${authorContainer.querySelector('h2').textContent}</p>` : '';

      const authorDetailsPhoto = (authorContainer.querySelector('picture') !== null)
        ? authorContainer.querySelector('picture').outerHTML : '';

      authorContainer.innerHTML = `
        <div class="cmp-author-details__meta">
          ${authorDetailsPhoto}
          ${authorName}
          ${authorDetailsTitle.replace(',', ',<br>')}
        </div>
        <div class="cmp-author-details__bio"></div>
      `;

      const bioContainer = authorContainer.querySelector('.cmp-author-details__bio');
      bioParagraphs.forEach((paragraph) => bioContainer.append(paragraph));

      articleDetailsBlock.append(authorContainer);
    });

    articleDetailsBlock.append(publishedDate);
    articleBackground.append(articleDetailsBlock);
  }

  // give unique DOM order to profile pages only!
  if (isProfile) {
    const profileTitleHeroContainer = document.createElement('div');
    profileTitleHeroContainer.classList.add('profile-title-hero-container');

    // if there's a hero caption, shift its DOM position so that it's tied to the hero image
    const heroCap = document.querySelector('.cmp-lede__hero-caption');
    if (heroCap !== null) heroImageContainer.append(heroCap);
    const heroClone = heroImageContainer.cloneNode(true);

    profileTitleHeroContainer.append(articleTitleWrap);
    profileTitleHeroContainer.append(heroClone);
    articleInnerWrap.insertBefore(profileTitleHeroContainer, articleBackground);
    heroImageContainer.remove();
    articleBackground.insertBefore(articleAttributionContainer, articleBackground.firstChild);
  }

  // insert the article attribution after the hero image and its caption (if it has one)
  // but place it before the intro paragraph
  if (!isProfile) {
    heroImageContainer.parentNode.insertBefore(
      articleAttributionContainer, ledeBlock,
    );
  }

  // sanitize link markup
  // some links had data that included an underline tag
  const elementsToSanitize = document.querySelectorAll('a u');
  [...elementsToSanitize].forEach((el) => {
    const parentEl = el.parentNode;
    const content = el.textContent;

    parentEl.append(content);
    el.remove();
  });
}
