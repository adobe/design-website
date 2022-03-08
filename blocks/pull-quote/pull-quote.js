export default async function decorate(block) {
  const pullQuoteContainer = block;

  // assume that if the length > 1
  // the quote has attribution
  // otherwise, it's just a quote w/o attribution
  if (pullQuoteContainer.childNodes.length > 1) {
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
  } else {
    const pullQuoteTextContainer = pullQuoteContainer.firstChild;
    pullQuoteTextContainer.classList.add('cmp-pullquote__text');

    const children = pullQuoteTextContainer.childNodes;
    const paragraphEl = document.createElement('p');
    [...children].forEach((child) => {
      paragraphEl.innerHTML = child.textContent;
      pullQuoteTextContainer.append(paragraphEl);
      child.remove();
    });
  }
}
