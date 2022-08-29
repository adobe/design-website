export default async function decorate(block) {
  const pullQuoteContainer = document.createElement('figure');
  block.parentNode.insertBefore(pullQuoteContainer, block);
  pullQuoteContainer.classList.add('cmp-pull-quote');

  const contentText = block.querySelector('div:nth-child(1)').textContent.trim();
  const pullQuoteContent = document.createElement('blockquote');
  pullQuoteContent.classList.add('cmp-pull-quote__content');
  pullQuoteContent.textContent = contentText;
  pullQuoteContainer.append(pullQuoteContent);

  // Quote attribution optional
  if (block.querySelector('div:nth-child(2)')) {
    const attributionText = block.querySelector('div:nth-child(2)').textContent.trim();
    const pullQuoteAttribution = document.createElement('figcaption');
    pullQuoteAttribution.classList.add('cmp-pull-quote__attribution');
    pullQuoteAttribution.textContent = attributionText;
    pullQuoteContainer.append(pullQuoteAttribution);
  }

  block.remove();
}
