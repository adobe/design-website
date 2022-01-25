export default async function decorate(block) {
  const ledeBlock = block;
  const articleComponent = ledeBlock.parentNode.parentNode;
  const articleInnerWrap = articleComponent.firstChild;
  const articleTitle = articleComponent.querySelector('h1');
  const articleSubTitle = articleTitle.nextElementSibling;
  const articleTagData = document.head.querySelector('meta[name="tag"]').content;
  const articleAuthorData = document.head.querySelector('meta[name="author"]').content;

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

  // TODO:
  // 1. Does the articleTag include a link? If so, we need that data & need to inject it

  articleComponent.classList.add('cmp-lede');
  articleInnerWrap.classList.add('cmp-lede__inner-wrap');
  articleTitle.classList.add('cmp-lede__title');

  if (articleSubTitle.tagName === 'H2') {
    articleSubTitle.classList.add('cmp-lede__sub-title');
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

  const articleAttributionContainer = document.createElement('div');
  articleAttributionContainer.classList.add('cmp-lede__attribution');

  const articleAuthor = (articleAuthorData !== '') ? `<p class="cmp-lede__author">Author: ${articleAuthorData}</p>` : null;
  articleAttributionContainer.innerHTML = `
    ${articleAuthor}
  `;

  // TODO:
  // 1. Get author's title & inject it
  // 2. Get author's photo & inject it
  // 3. Remove placeholder "author" text before author's name

  // insert the article attribution after the hero image and its caption (if it has one)
  // but place it before the intro paragraph
  heroImageContainer.parentNode.insertBefore(
    articleAttributionContainer, ledeBlock,
  );

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
