export default async function decorate(block) {
  const pullQuoteContainer = block;
  const pullQuoteContentItems = pullQuoteContainer.querySelectorAll(':scope > div:first-of-type');
  const pullQuoteAttributionItems = pullQuoteContainer.querySelectorAll(':scope > div:last-of-type');

  // TODO:
  // 1. does this fail if there are links in the pull quote?
  // 2. how does the color data come through?
  //    Is it assigned in the CMS or programatically determined?
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
