export default async function decorate(block) {
  // Get the block’s children elements
  const childern = block.childNodes;

  // Modified version of https://stackoverflow.com/questions/31259295/javascript-allow-only-specific-html-tags
  const stripTags = (content) => {
    const foundTags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
    // Only links, bold, and italic tags allowed
    const allowedTags = '<a><strong><em>';
    const newContent = ($0, $1) => (allowedTags.indexOf(`<${$1}>`) > -1 ? $0 : '');
    return content.replace(foundTags, newContent);
  };

  // iterate over all child nodes
  childern.forEach((element) => {
    element.innerHTML = stripTags(element.innerHTML.toString());
  });

  // Create the new h2 element
  const attributedHeadingContainer = document.createElement('h2');
  block.parentNode.insertBefore(attributedHeadingContainer, block);
  attributedHeadingContainer.className = block.className;
  attributedHeadingContainer.innerHTML = block.innerHTML;

  // Remove the original block
  block.remove();
}
