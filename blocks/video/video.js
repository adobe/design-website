import { buildFigure } from '../../scripts/scripts.js';

export default function decorate(block) {
  if (block.classList.contains('is-loaded')) {
    return;
  }
  const poster = block.querySelector('img') ? `poster="${block.querySelector('img').src}"` : '';
  const a = block.querySelector('a');
        a.target = "_blank";
  const videoSrc = a.href;
  const video = document.createElement('div');
  const figure = buildFigure(block.firstChild.firstChild);
  video.classList.add('video-wrapper');
  video.innerHTML = `<video controls preload="none" ${poster}>
    <source src="${videoSrc}" type="video/mp4">
  </video>`;
  block.innerHTML = '<figure class="figure"></figure>';
  block.firstChild.prepend(video);
  block.firstChild.append(figure.querySelector('figcaption'));
  block.classList.add('is-loaded');
}