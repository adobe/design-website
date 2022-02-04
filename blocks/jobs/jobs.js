import { lookupPages } from '../../scripts/scripts.js';

function createJob(job) {
  const jobItem = document.createElement('li');
  jobItem.classList.add('cmp-jobs-list__item');
  jobItem.innerHTML = `
    <a class="cmp-job__link" href="${job.path}">${job.title} (${job.positionType})</a>
    <p class="cmp-job__department">${job.department}</p>
    <p class="cmp-job__location">${job.location}</p>
  `;
  return (jobItem);
}

export default async function decorate(block) {
  const pathnames = [...block.querySelectorAll('a')].map((a) => new URL(a.href).pathname);
  const jobs = await lookupPages(pathnames);
  const jobsList = document.createElement('ul');
  jobsList.classList.add('cmp-jobs-list');
  block.innerHTML = '';
  block.append(jobsList);

  jobs.forEach((job) => {
    jobsList.append(createJob(job));
  });

  const viewAllContainer = document.createElement('div');
  viewAllContainer.classList.add('cmp-jobs-view-all');
  const viewAllLink = document.createElement('a');
  viewAllLink.href = '/jobs/';
  viewAllLink.textContent = 'View our job openings';
  viewAllLink.classList.add('cmp-jobs-view-all__link');
  viewAllContainer.append(viewAllLink);

  block.append(viewAllContainer);
}
