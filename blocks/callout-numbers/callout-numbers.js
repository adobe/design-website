export default async function decorate(block) {
  // Create new section
  const makeContainer = document.createElement('section');
  makeContainer.className = 'cmp-callout-numbers';

  // Apply classes to items (should have a number and a description)
  const items = block.querySelectorAll(':scope > div');
  items.forEach((item) => {
    // Only consider data in first two columns
    const [itemNumber, itemDescription] = item.childNodes;
    itemNumber.className = 'cmp-callout-numbers__item-number';
    itemDescription.className = 'cmp-callout-numbers__item-description';
    makeContainer.innerHTML += `<div class="cmp-callout-numbers__item">${item.innerHTML}</div>`;
  });

  block.parentNode.insertBefore(makeContainer, block);
  block.remove();
}
