const SIDE_BY_SIDE_MODIFIER_CLASS = {
  2: 'cmp-multi-image--2-up',
  3: 'cmp-multi-image--3-up',
};

export default function decorate(block) {
  const container = block.querySelector('div');
  const imageBlocks = container.querySelectorAll('div');

  // 2-up or 3-up
  let modifier = SIDE_BY_SIDE_MODIFIER_CLASS[imageBlocks.length];
  if (!modifier) modifier = '';

  // Generate HTML for images
  let createImages = '';
  imageBlocks.forEach((imageBlock) => {
    const image = imageBlock.querySelector('div > :first-child');
    const caption = imageBlock.querySelector('p:last-child');

    let imageHTML = image.innerHTML;
    if (!image.querySelector('picture')) {
      imageHTML = `<picture>${image.innerHTML}</picture>`;
    }

    let captionHTML;
    if (!caption) captionHTML = '';
    else {
      captionHTML = `
        <figcaption class="cmp-multi-image__caption">${caption.innerHTML}</figcaption>
      `;
    }

    const generatedHTML = `
      <figure class="cmp-multi-image__image">
        ${imageHTML}
        ${captionHTML}
      </figure>
    `;
    createImages += generatedHTML;
  });

  // Create wrapper for images
  const createWrapper = document.createElement('div');
  createWrapper.className = `cmp-multi-image ${modifier}`;
  createWrapper.innerHTML = createImages;
  block.parentNode.insertBefore(createWrapper, block);

  // Remove original block
  block.remove();
}
