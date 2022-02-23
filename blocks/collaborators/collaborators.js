import { createOptimizedPicture, getMetadata, lookupPages } from '../../scripts/scripts.js';

export default async function decorate(block) {
  console.log(block);
  const collaborators = block.querySelectorAll(':scope > div');
  collaborators.forEach((collab) => {
    collab.classList.add('cmp-collaborator');
  });
  // const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  // block.textContent = '';
  // const people = await lookupPages(pathnames);
  // people.forEach((row) => {
  //   const person = document.createElement('article');
  //   person.href = row.path;
  //   person.classList.add('cmp-person');

  //   const personTitle = `${row.subtitle ? `<p class="cmp-person__title">${row.subtitle}</p>` : ''}`;

  //   person.innerHTML = `
  //     <div class="cmp-person__body">
  //       <span class="cmp-person__tag">#Our People</span>
  //       <h2 class="cmp-person__name">
  //         <a href="${row.path}">${row.title}</a>
  //       </h2>
  //       ${personTitle}
  //     </div>
  //   `;

  //   person.prepend(createOptimizedPicture(row.image, row.title));
  //   block.append(person);
  // });
}
