import { createOptimizedPicture, lookupPages } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  block.textContent = '';
  const people = await lookupPages(pathnames);
  people.forEach((row) => {
    const person = document.createElement('a');
    person.href = row.path;
    person.classList.add('people-person');
    person.innerHTML = `<h2>${row.title}</h2>`;
    person.prepend(createOptimizedPicture(row.image, row.title));
    block.append(person);
  });
}
