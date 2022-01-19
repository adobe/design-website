export default async function decorate(block) {
  const columnsComponent = block;
  const columnsWrapper = columnsComponent.querySelector(':scope > div');
  columnsWrapper.classList.add('cmp-columns__inner');

  const columnItems = columnsWrapper.querySelectorAll(':scope > div');

  columnItems.forEach((column) => {
    column.classList.add('cmp-columns__item');
  });

  // TODO: is there a way to identify pages? home-page, stories-page, etc
  if (window.location.pathname === '/') {
    document.body.classList.add('home');
  }

  const joinUsParent = document.querySelector('#join-us').parentElement;
  // joinUsParent.classList.add('cmp-join-us');
  const joinUsHeading = document.querySelector('#join-us');
  joinUsHeading.classList.add('cmp-join-us__title');

  // TODO: can we delete this <p> in the CMS?
  const errantParagraph = joinUsHeading.nextElementSibling;
  errantParagraph.remove();

  // TODO: is there a better way of positioning the jobs block?
  const jobs = document.querySelector('.jobs-container');
  const jobsClone = jobs.cloneNode(true);
  jobsClone.classList.remove('section-wrapper');
  jobsClone.classList.add('cmp-jobs', 'cmp-jobs--home');
  joinUsParent.appendChild(jobsClone);

  // TODO: is there a better way of positioning the stats block?
  const stats = document.querySelector('.stats-container');
  const statsClone = stats.cloneNode(true);
  statsClone.classList.remove('section-wrapper');
  joinUsParent.nextElementSibling.appendChild(statsClone);

  // remove after cloned and inserted
  jobs.remove();
  stats.remove();
}
