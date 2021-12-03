import {
  replaceElementType,
} from '../block-helpers.js';

export default function decorate(block) {
  block.querySelectorAll('p').forEach((p) => {
    // Quote <p> to <h2>
    if (p.innerHTML.startsWith('“') && p.innerHTML.endsWith('”')) {
      replaceElementType(p, 'blockquote');
    }
  });
}
