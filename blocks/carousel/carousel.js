import { createOptimizedPicture, lookupPages } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  block.textContent = '';
  const stories = await lookupPages(pathnames);
  const ul = document.createElement('ul');
  ul.classList.add('carousel-slides');
  stories.forEach((row, i) => {
    const li = document.createElement('li');
    li.classList.add('carousel-slide');
    li.innerHTML = `<h2><a href="${row.path}">${row.title}</h2>`;
    li.append(createOptimizedPicture(row.image, row.title, !i));
    ul.append(li);
  });
  block.append(ul);
}
