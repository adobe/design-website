import decodeHTML from '../../scripts/decode-html.js';

export default async function decorate(block) {
  // Find the the embed code and caption if they exist
  const videoEmbed = block.querySelector('div > div:first-child') !== null ? block.querySelector('div > div:first-child').innerText : null;
  const videoCaption = block.querySelector('div > div:nth-child(2)') !== null ? block.querySelector('div > div:nth-child(2)').innerText : null;

  // Decode the encoded embed code
  const makeEmbed = decodeHTML(videoEmbed);

  // Create the figure and populate it with the embed wrapper
  const makeFigure = document.createElement('figure');
  makeFigure.className = 'cmp-media-figure';
  makeFigure.innerHTML = `<div class="cmp-media-figure__embed">${makeEmbed}</div>`;
  makeFigure.querySelector('iframe').className = 'cmp-media-figure__iframe';
  block.parentNode.insertBefore(makeFigure, block);

  // If there is a caption element, then create a figcaption
  // element and add it in the figure beneath the embed wrapper
  if (videoCaption != null) {
    const makeFigcaption = document.createElement('figcaption');
    makeFigcaption.className = 'cmp-media-figure__caption';
    makeFigcaption.innerHTML = videoCaption;
    makeFigure.appendChild(makeFigcaption);
  }

  // And we don’t need that original block anymore, so we remove it
  block.remove();
}
