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

  console.log(groupedJobs);

  // console.log(departmentNames);
}
