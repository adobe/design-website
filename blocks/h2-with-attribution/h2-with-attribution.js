function returnTHMLWithRetainedLink(node) {
  let nodeHTML = node.innerText;
  const nodeLink = node.querySelector('a');

  if (nodeLink) {
    // Capture anchor tag within innerHTML
    const linkHTML = node.innerHTML.match(/<a href=.*>.*<\/a>/)[0];
    // Capture link text within anchor tag
    const linkText = linkHTML.match(/(?<=<a href=.*>).*(?=<\/a>)/)[0];
    nodeHTML = nodeHTML.replace(linkText, linkHTML);
  }

  return nodeHTML;
}

export default async function decorate(block) {
  const attributedHeadingContainer = document.createElement('h2');
  block.parentNode.insertBefore(attributedHeadingContainer, block);
  attributedHeadingContainer.classList.add('h2-with-attribution');

  const headingContent = block.querySelector('div:first-child');
  const headingCitation = block.querySelector('div:last-child:not(:first-child)') ? block.querySelector('div:last-child:not(:first-child)') : null;

  const contentHTML = returnTHMLWithRetainedLink(headingContent);
  headingContent.innerHTML = contentHTML;

  if (headingCitation) {
    const citationHTML = returnTHMLWithRetainedLink(headingCitation);
    headingCitation.innerHTML = citationHTML;
  }

  attributedHeadingContainer.innerHTML = block.innerHTML;
  // Removes extra <div>
  block.remove();
}
