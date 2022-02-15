export default async function decorate(block) {
  const resp = await fetch('/query-index.json');
  const json = await resp.json();
  const allJobs = json.jobs.data;

  const groupedJobs = {};

  allJobs.forEach((job) => {
    const department = job.path.split('/')[3];
    if (!groupedJobs[department]) groupedJobs[department] = { jobs: [] };
    if (job.path.endsWith('/')) groupedJobs[department].title = job.title;
    else groupedJobs[department].jobs.push(job);
  });

  const jobsContainer = document.createElement('div');
  jobsContainer.classList.add('jobs-container');
  block.append(jobsContainer);

  Object.keys(groupedJobs).forEach((key) => {
    const departmentJobs = groupedJobs[key].jobs;
    // create the headings for each group
    const heading = document.createElement('h4');
    const transformedKey = key.split('-').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    heading.innerText = transformedKey;
    jobsContainer.append(heading);

    // get the rest of the jobs data
    departmentJobs.forEach((job) => {
      const list = document.createElement('ul');
      list.classList.add('jobs-ul');

      const listItem = document.createElement('li');
      listItem.classList.add('jobs-list-item');
      listItem.innerHTML = `
        <h5><a href="${job.path}">${job.title}</a></h5>
        <p>Department: ${job.department}</p>
        <p>Location: ${job.location}</p>
      `;
      jobsContainer.append(list);
      list.append(listItem);
    });
  });
}
