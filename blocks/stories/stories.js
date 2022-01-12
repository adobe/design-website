import { createOptimizedPicture, lookupPages } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  block.textContent = '';
  const stories = await lookupPages(pathnames);
  stories.forEach((row) => {
    const card = document.createElement('a');
    card.href = row.path;
    card.classList.add('stories-card');
    card.innerHTML = `<h2>${row.title}</h2>`;
    card.prepend(createOptimizedPicture(row.image, row.title));
    block.append(card);
  });
}
