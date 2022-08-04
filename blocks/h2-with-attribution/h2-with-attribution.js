export default async function decorate(block) {
  
  const quoteContainer = document.createElement('blockquote');
  block.parentNode.insertBefore(quoteContainer, block);
  quoteContainer.classList.add('h2-with-attribution');
  
  const quoteContent = block.querySelector('div:first-child');
  const quoteCitation = block.querySelector('div:last-child:not(:first-child)') ? block.querySelector('div:last-child:not(:first-child)') : null;
  
  // Removes extra <div>
  quoteContent.innerText = quoteContent.innerText; // eslint-disable-line no-self-assign
  
  // Adds usable class
  quoteContent.classList.add('quote-header__content');
  
  if (quoteCitation) {
    quoteCitation.innerText = quoteCitation.innerText; // eslint-disable-line no-self-assign
    quoteCitation.classList.add('quote-header__citation');
  }
  
  quoteContainer.innerHTML = block.innerHTML;
  
 
}
