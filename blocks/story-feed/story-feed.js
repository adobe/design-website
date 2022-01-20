import { createOptimizedPicture, lookupPages, readBlockConfig } from '../../scripts/scripts.js';

function createCard(row) {
  const card = document.createElement('a');
  card.href = row.path;
  card.classList.add('stories-card');
  card.innerHTML = `<h2>${row.title}</h2>`;
  card.prepend(createOptimizedPicture(row.image, row.title));
  return (card);
}

export default async function decorate(block) {
  const config = readBlockConfig(block);
  const pathnames = config.featured ? config.featured.map((link) => new URL(link).pathname) : [];
  block.textContent = '';
  const stories = await lookupPages(pathnames);
  stories.forEach((row) => {
    block.append(createCard(row));
  });
  const allStories = window.pageIndex.data.stories.data;
  const remaining = allStories.filter((e) => !pathnames.includes(e.path));
  for (let i = stories.length; i < Math.min(+config.limit, remaining.length); i += 1) {
    const row = remaining[i];
    block.append(createCard(row));
  }
}
