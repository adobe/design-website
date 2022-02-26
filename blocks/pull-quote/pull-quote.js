export default async function decorate(block) {
  const pullQuoteContainer = block;
  const pullQuoteContentItems = pullQuoteContainer.querySelectorAll(':scope > div:first-of-type');
  const pullQuoteAttributionItems = pullQuoteContainer.querySelectorAll(':scope > div:last-of-type');

  [...pullQuoteContentItems].forEach((pullQuote) => {
    pullQuote.classList.add('cmp-pullquote__text');
    const childGraphs = pullQuote.childNodes;
    const paragraphEl = document.createElement('p');
    [...childGraphs].forEach((child) => {
      paragraphEl.innerHTML = child.textContent;
      pullQuote.append(paragraphEl);
      child.remove();
    });
  });

  [...pullQuoteAttributionItems].forEach((attribution) => {
    attribution.classList.add('cmp-pullquote__attribution');
    const children = attribution.childNodes;
    const paragraphEl = document.createElement('p');
    [...children].forEach((child) => {
      paragraphEl.innerHTML = child.textContent;
      attribution.append(paragraphEl);
      child.remove();
    });
  });
}
