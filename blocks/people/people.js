import { createOptimizedPicture, lookupPages } from '../../scripts/scripts.js';
import tagLink from '../../scripts/tag-link.js';

export default async function decorate(block) {
  const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  block.textContent = '';
  const people = await lookupPages(pathnames);
  people.forEach((row) => {
    const person = document.createElement('article');
    person.classList.add('cmp-person');

    const imageLink = document.createElement('a');
    imageLink.href = row.path;
    imageLink.append(createOptimizedPicture(row.image, row.title));

    const personTitle = `${row.subtitle ? `<p class="cmp-person__title">${row.subtitle}</p>` : ''}`;
    const tag = `${row.tag ? `<a href="${tagLink(row.path)}" class="cmp-person__tag">${row.tag}</a>` : ''}`;

    person.innerHTML = `
      <div class="cmp-person__body">
        ${tag}
        <h2 class="cmp-person__name">
          <a href="${row.path}">${row.title}</a>
        </h2>
        ${personTitle}
      </div>
    `;

    person.prepend(imageLink);
    block.append(person);
  });
}
