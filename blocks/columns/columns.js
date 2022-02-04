export default async function decorate(block) {
  const columnsComponent = block;
  const columnsWrapper = columnsComponent.querySelector(':scope > div');
  columnsWrapper.classList.add('cmp-columns__inner');
  const columnItems = columnsWrapper.querySelectorAll(':scope > div');

  // prepare the columns for clean content
  // first, add a class to each column
  // then remove any placeholder content, but keep the heading
  columnItems.forEach((column) => {
    column.classList.add('cmp-columns__item');
    const colHeading = column.querySelector('h2');
    if (colHeading) {
      const colHeadingClone = colHeading.cloneNode(true);
      column.innerHTML = '';
      column.append(colHeadingClone);
    } else {
      column.innerHTML = '';
    }
  });

  const joinUsParent = document.querySelector('#join-us').parentElement;
  const joinUsHeading = document.querySelector('#join-us');
  joinUsHeading.classList.add('cmp-join-us__title');

  // // TODO: is there a better way of positioning the jobs block?
  const jobs = document.querySelector('.jobs-container');
  const errantHeading = jobs.querySelector('h2#job-list');
  errantHeading.remove();
  const jobsClone = jobs.cloneNode(true);
  jobsClone.classList.remove('section-wrapper');
  jobsClone.classList.add('cmp-jobs', 'cmp-jobs--home');
  joinUsParent.appendChild(jobsClone);

  // TODO: is there a better way of positioning the stats block?
  const stats = document.querySelector('.stats-container');
  const statsClone = stats.cloneNode(true);
  statsClone.classList.remove('section-wrapper');
  joinUsParent.nextElementSibling.appendChild(statsClone);
  joinUsParent.nextElementSibling.classList.add('cmp-stats-parent');

  // remove after cloned and inserted
  jobs.remove();
  stats.remove();
}
