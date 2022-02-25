export default async function decorate(block) {
  const pageTitle = document.querySelector('h1');
  pageTitle.classList.add('cmp-page__title');

  block.parentNode.classList.add('cmp-jobs-list__inner-wrap');

  const pageIntro = pageTitle.nextElementSibling;
  pageIntro.classList.add('cmp-page__intro');
  const pageSubIntro = pageIntro.nextElementSibling;
  pageSubIntro.classList.add('cmp-page__sub-intro');

  block.classList.add('cmp-jobs-list__bg');

  const resp = await fetch('/query-index.json');
  const json = await resp.json();
  const allJobs = json.jobs.data;

  const groupedJobs = {};

  allJobs.forEach((job) => {
    const department = job.path.split('/')[3];
    if (!department) return;
    if (!groupedJobs[department]) groupedJobs[department] = { jobs: [] };
    if (job.path.endsWith('/')) groupedJobs[department].title = job.title;
    else groupedJobs[department].jobs.push(job);
  });

  const jobsContainer = document.createElement('div');
  jobsContainer.classList.add('cmp-all-jobs');
  block.firstChild.firstChild.append(jobsContainer);

  Object.keys(groupedJobs).forEach((key) => {
    const departmentJobs = groupedJobs[key].jobs;
    const jobGroup = document.createElement('div');
    jobGroup.classList.add('cmp-job__group');
    const transformedKey = key.split('-').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    const casedKey = transformedKey.replace('And', 'and');
    const listMarkup = departmentJobs.length > 0 ? '<ul class="cmp-jobs-list"></ul>' : '<p class="cmp-jobs-none">There are no openings right now.</p>';
    jobGroup.innerHTML = `
      <h4 class="cmp-job__group-title">${casedKey}</h4>
      ${listMarkup}
    `;
    jobsContainer.append(jobGroup);

    if (departmentJobs.length > 0) {
      departmentJobs.forEach((job) => {
        const listItem = document.createElement('li');
        listItem.classList.add('cmp-jobs-list__item');
        listItem.innerHTML = `
          <a class="cmp-job__link" href="${job.path}">${job.title}</a>
          <p class="cmp-job__department">${job.department}</p>
          <p class="cmp-job__location">${job.location}</p>
        `;
        jobGroup.querySelector('.cmp-jobs-list').append(listItem);
      });
    }
  });
}
