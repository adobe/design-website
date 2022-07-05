export default async function decorate(block) {
  const pageTitle = document.querySelector('h1');
  pageTitle.classList.add('page-title');
  const parent = block.parentNode;

  parent.classList.add('cmp-jobs-list');

  const pageIntro = pageTitle.nextElementSibling;
  pageIntro.classList.add('page-subtitle');
  const pageSubIntro = pageIntro.nextElementSibling;
  pageSubIntro.classList.add('page-subtitle');

  block.classList.add('cmp-jobs');

  const jobsContainer = document.createElement('div');
  jobsContainer.classList.add('cmp-all-jobs');
  block.firstElementChild.firstElementChild.append(jobsContainer);

  const blockHeadline = block.previousElementSibling.tagName === 'H2' ? block.previousElementSibling : null;
  blockHeadline.classList.add('cmp-jobs__headline');
  block.firstElementChild.firstElementChild.prepend(blockHeadline);

  const introContainer = document.createElement('div');
  introContainer.classList.add('cmp-jobs-list__intro');
  const introChildren = Array.from(parent.children);
  introChildren.pop();

  introChildren.forEach((el) => {
    introContainer.append(el);
  });

  const jobsMessage = document.querySelector('.cmp-jobs-message') ? document.querySelector('.cmp-jobs-message') : '';

  introContainer.prepend(jobsMessage);

  parent.prepend(introContainer);

  const resp = await fetch('/query-index.json');
  const json = await resp.json();
  const allJobs = json.jobs.data;

  const groupedJobs = {};
  // get the departments
  const departmentNodes = block.querySelectorAll('h3');

  // prepare the department groups to receive their jobs
  departmentNodes.forEach((node) => {
    const department = node.textContent.toLowerCase().replaceAll(' ', '-');
    if (!groupedJobs[department]) groupedJobs[department] = { jobs: [] };
    node.remove();
  });

  // look at each job & match it with a department based on its path
  // after it is matched with the department, push it into that department's jobs array
  allJobs.forEach((job) => {
    const dept = job.path.split('/')[3];
    if (!dept) return;
    Object.keys(groupedJobs).find((key) => ((key === dept && !job.path.endsWith('/')) ? groupedJobs[key].jobs.push(job) : false));
  });

  // now that the jobs are grouped by department
  // render them into the DOM
  Object.keys(groupedJobs).forEach((key) => {
    const departmentJobs = groupedJobs[key].jobs;
    const jobGroup = document.createElement('div');
    jobGroup.classList.add('cmp-jobs__group');
    const transformedKey = key.split('-').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    const casedKey = transformedKey.replace('And', 'and');
    const listMarkup = departmentJobs.length > 0 ? '<ul class="cmp-jobs__list"></ul>' : '<p class="cmp-jobs__none">There are no openings right now.</p>';
    jobGroup.innerHTML = `
      <h4 id="${key}" class="cmp-jobs__group-title">${casedKey}</h4>
      ${listMarkup}
    `;
    jobsContainer.append(jobGroup);

    if (departmentJobs.length > 0) {
      departmentJobs.forEach((job) => {
        const listItem = document.createElement('li');
        listItem.classList.add('cmp-jobs__item');
        listItem.innerHTML = `
          <a class="cmp-jobs__link" href="${job.path}">${job.title}</a>
          <p class="cmp-jobs__department">${job.department}</p>
          <p class="cmp-jobs__location">${job.location}</p>
        `;
        jobGroup.querySelector('.cmp-jobs__list').append(listItem);
      });
    }
  });

  if (document.body.classList.contains('active-message')) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              document.body.classList.remove('active-message');
            }
          });
        },
      );
      observer.observe(introContainer);
    }
  }
}
