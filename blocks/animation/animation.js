import { buildFigure } from '../../scripts/scripts.js';

export default function decorateAnimation(blockEl) {
  const a = blockEl.querySelector('a');
  const parentEl = a.parentNode;
  const href = a.getAttribute('href');
  const url = new URL(href);
  const { hostname } = url;
  let { pathname } = url;

  if (hostname.includes('hlx.blob.core')) {
    // transform links from blob
    const helixId = pathname.split('/')[2];
    const type = href.includes('.mp4') ? 'mp4' : 'gif';
    pathname = `/media_${helixId}.${type}`;
  }

  if (href.includes('.mp4')) {
    const vidEl = `<video playsinline autoplay loop muted>
      <source src=".${pathname}" type="video/mp4" />
    </video>`;
    parentEl.innerHTML = vidEl;
  } else if (href.includes('.gif')) {
    const picEl = `<picture>
      <img src=".${pathname}" />
    </picture>`;
    parentEl.innerHTML = picEl;
  }

  const figEl = buildFigure(blockEl.firstChild.firstChild);
  blockEl.prepend(figEl);
  blockEl.lastChild.remove();
}
