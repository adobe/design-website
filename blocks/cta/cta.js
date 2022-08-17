import { lookupPages } from '../../scripts/scripts.js';

function addJobs(jobs) {
  const makeJobs = document.createElement('div');
  makeJobs.className = 'cmp-cta__jobs';

  jobs.forEach((job) => {
    makeJobs.innerHTML += `
      <div class="cmp-cta__job">
        <a class="cmp-cta__job-title" href="${job.path}">${job.title}</a>
        <p class="cmp-cta__job-location">${job.location}</a>
      </div>
    `;
  });

  return makeJobs.outerHTML;
}

export default async function decorate(block) {
  // Create new section
  const makeCTA = document.createElement('section');
  makeCTA.className = 'cmp-cta';
  let ctaJobs = '';

  // Capture header and button copy
  const headerCopy = block.querySelector('.cta > div:nth-child(1) > div + div').innerText;
  const buttonCopy = block.querySelector('.cta > div:nth-child(2) > div + div').innerText;
  const buttonPath = block.querySelector('.cta > div:nth-child(3) > div + div').innerText;

  // Check for jobs and generate HTML
  const links = [...block.querySelectorAll('a')];
  const pathnames = links.map((a) => new URL(a.href).pathname);
  if (pathnames.length) {
    const jobs = await lookupPages(pathnames);
    ctaJobs = addJobs(jobs);
  }

  // Construct CTA
  makeCTA.innerHTML = `
    <h2 class="cmp-cta__content">${headerCopy}</h2>
    ${ctaJobs}
    <a class="cmp-cta__btn" href=${buttonPath}>${buttonCopy}</a>
  `;

  // Insert above footer on page and remove original block
  document.querySelector('main').appendChild(makeCTA);
  block.remove();
}
