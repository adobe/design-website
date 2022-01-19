export default async function decorate(block) {
  const articleComponent = block.parentNode.parentNode;
  const articleInnerWrap = articleComponent.firstChild;
  const articleTitle = articleComponent.querySelector('h1');
  const articleSubTitle = articleTitle.nextElementSibling;

  const ledeBlock = block;

  ledeBlock.classList.add('cmp-lede__intro');

  articleComponent.classList.add('cmp-lede');
  articleInnerWrap.classList.add('cmp-lede__inner-wrap', 'grid-container');
  articleTitle.classList.add('cmp-lede__title');

  if (articleSubTitle.tagName === 'H2') {
    articleSubTitle.classList.add('cmp-lede__sub-title');
  }

  const pageBgColor = document.head.querySelector('meta[name="color"]').content;
  document.body.style.backgroundColor = `var(--color-base-${pageBgColor})`;
}
