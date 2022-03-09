import { getMetadata, toClassName } from '../../scripts/scripts.js';

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
    <span>#${articleTagData}</span>
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
  const resp = await fetch(`/authors/${(toClassName(articleAuthorData))}.plain.html`);
  const html = await resp.text();

  // create & decorate "attribution" piece first
  const articleAttributionContainer = document.createElement('div');
  articleAttributionContainer.classList.add('cmp-lede__attribution');
  articleAttributionContainer.innerHTML = html;

  const authorName = (articleAttributionContainer.querySelector('h1') !== null)
    ? `<p class="cmp-lede__author">${articleAttributionContainer.querySelector('h1').textContent}</p>` : '';

  const authorTitle = (articleAttributionContainer.querySelector('h2') !== null)
    ? `<p class="cmp-lede__author-title">${articleAttributionContainer.querySelector('h2').textContent}</p>` : '';

  const authorPhoto = (articleAttributionContainer.querySelector('picture') !== null)
    ? articleAttributionContainer.querySelector('picture').outerHTML : '';

  articleAttributionContainer.innerHTML = `
    ${authorName}
    ${authorTitle}
    ${authorPhoto}
  `;

  // only create & decorate "author details" block if the author IS NOT 'adobe design'
  const authorDetailsName = getMetadata('author');
  if (authorDetailsName !== null && authorDetailsName.toLowerCase() !== 'adobe design') {
    const authorDetailsBlock = document.createElement('div');
    authorDetailsBlock.classList.add('cmp-author-details');
    authorDetailsBlock.innerHTML = html;

    const bioParagraphs = [...authorDetailsBlock.querySelectorAll('div > p')].filter((graph) => graph.firstChild.tagName !== 'PICTURE');

    const authorDetailsTitle = (authorDetailsBlock.querySelector('h2') !== null)
      ? `<p class="cmp-author-details__title">${authorDetailsBlock.querySelector('h2').textContent}</p>` : '';

    const authorDetailsPhoto = (authorDetailsBlock.querySelector('picture') !== null)
      ? authorDetailsBlock.querySelector('picture').outerHTML : '';

    const publishedDate = document.createElement('p');
    publishedDate.classList.add('cmp-author-details__pub-date');
    publishedDate.innerHTML = getMetadata('publication-date');

    authorDetailsBlock.innerHTML = `
      <div class="cmp-author-details__meta">
        ${authorDetailsPhoto}
        <p class="cmp-author-details__name">${authorDetailsName}</p>
        ${authorDetailsTitle}
      </div>
      <div class="cmp-author-details__bio"></div>
    `;
    const bioContainer = authorDetailsBlock.querySelector('.cmp-author-details__bio');
    bioParagraphs.forEach((paragraph) => bioContainer.append(paragraph));
    bioContainer.append(publishedDate);
    articleBackground.append(authorDetailsBlock);
  }

  // give unique DOM order to profile pages only!
  // this moves the profile "hero" image in the DOM so that it is a sibling of
  // the title-wrap and the article-bg
  //
  // <div class="cmp-lede__inner-wrap">
  //   <div class="cmp-lede__article-title-wrap"></div>
  //   <p class="cmp-lede__media-parent cmp-lede__hero-parent"></p> **** NEW POSIITON ****
  //   <div class="cmp-lede__article-bg"></div>
  // </div>
  //
  if (isProfile) {
    const heroClone = heroImageContainer.cloneNode(true);
    articleInnerWrap.insertBefore(heroClone, articleBackground);
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
