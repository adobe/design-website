export default async function decorate(block) {
  const resp = await fetch('/query-index.json');
  const json = await resp.json();
  const allJobs = json.jobs.data;

  allJobs.filter((job) => {
    console.log(job.path.split('/')[3]);
  });

  // console.log(departmentNames);
}
