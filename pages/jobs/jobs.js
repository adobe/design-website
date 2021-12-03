import { $wrap, $element } from '../../scripts/helpers.js';
import { fetchIndex } from '../../scripts/queries.js';

let index;

export default async function decorate() {
  if (!index) {
    index = await fetchIndex();
  }
  const allJobs = index.jobs.data;

  const jobs = document.querySelector('body > main');

  jobs.classList.add('jobs');
  /* jobs.forEach(t => {
      if( t.querySelector("p") ) {
        t.classList.add("article-picture");
      }
    }); */

  const content = jobs.querySelector('div > div');

  const headDiv = $element('.head-content');
  const jobsBlockContainer = $element('.jobs-block-container');

  let pageSection = 0;

  content.querySelectorAll('div>*').forEach((element) => {
    if (pageSection === 0) {
      if (element.nodeName !== 'DIV') pageSection += 1;
    }
    if (pageSection === 1) {
      if (element.nodeName !== 'H2') {
        headDiv.appendChild(element);
      } else pageSection += 1;
    }
    if (pageSection === 2) {
      jobsBlockContainer.appendChild(element);
    }
  });
  const bodyContent = $wrap($element('.content'), [headDiv, jobsBlockContainer]);
  content.append(bodyContent);

  const jobsContainer = $element('.jobs-container');
  let jobCategory = $element('.job-category');
  let jobListings = $element('.job-listings');

  let listing = 0;
  jobsBlockContainer.querySelectorAll(':scope > *').forEach((element) => {
    if (listing !== 0) {
      if (listing !== 1 && element.nodeName === 'H2') {
        jobCategory.append(jobListings);
        jobsContainer.append(jobCategory);

        jobCategory = $element('.job-category');
        jobListings = $element('.job-listings');
      }

      if (element.nodeName === 'H2') {
        jobCategory.id = `${element.id}-block`;
        jobCategory.append(element);
        listing += 1;
      } else {
        jobListings.append(element);
      }
    } else {
      listing += 1;
    }
  });

  const jobsColLeft = $element('.jobs-col-1');
  const jobsColRight = $element('.jobs-col-2');
  const jobBlocks = jobsContainer.querySelectorAll(':scope > *');
  let blockCount = 1;
  jobBlocks.forEach((element) => {
    if (blockCount <= (jobBlocks.length / 2)) {
      jobsColLeft.append(element);
    } else {
      jobsColRight.append(element);
    }

    blockCount += 1;
  });

  $wrap(jobsContainer, [jobsColLeft, jobsColRight]);

  jobsBlockContainer.appendChild(jobsContainer);

  jobsBlockContainer.querySelectorAll('.job-listings').forEach((element) => {
    element.remove();
  });

  /* Currently expecting location property to be an array of all locations for the job posting */
  function formatLocation(location) {
    if (!location) {
      return '[LOCATION MISSING]';
    }

    if (!Array.isArray(location)) {
      return location;
    }

    if (location.length === 2) {
      return `${location[0]} and ${location[1]}`;
    }

    let formatString = '';

    for (let i = 0; i < location.length; i += 1) {
      if (i !== 0) {
        formatString += ', ';
        if (i === location.length - 1) formatString += 'and ';
      }

      formatString += location[i];
    }

    return formatString;
  }

  function buildJobListings(job) {
    const jobBlock = $element('a.job', [
      $element('p.job-title', job.title || '[TITLE MISSING]'),
      $element('p.job-team', job.team || '[TEAM MISSING]'),
      $element('p.job-location', formatLocation(job.location)),
    ]);
    jobBlock.href = job.path;

    return jobBlock;
  }

  jobsBlockContainer.querySelectorAll('.job-category').forEach((element) => {
    let hasJob = false;
    allJobs.forEach((job) => {
      if (!job.section) {
        job.section = 'Experience Design';
      }
      if ((element.id.replaceAll('-', ' ').includes(job.section.toLowerCase()))) {
        hasJob = true;
        element.append(buildJobListings(job));
      }
    });
    if (!hasJob) {
      element.append($element('.no-oppenings', 'There are no openings right now'));
    }
  });
}
/* var dummyJobs = [
      {
        title: "User Experience Design(Contractor)",
        location: ["San Francisco", "San Jose", "Seattle"],
        team: "Adobe Spark",
        section: "Experience Design",
        link: "/"
      },
      {
        title: "User Experience Design(Contractor)",
        location: ["San Francisco", "San Jose", "Seattle"],
        team: "Adobe Spark",
        section: "Experience Design",
        link: "/"
      },
      {
        title: "Sr Content Strategist",
        location: "Los Angeles",
        team: "Adobe Spark",
        section: "Content Strategy",
        link: "/"
      },
      {
        title: "Jr Team Operator",
        location: "Salt Lake City",
        team: "Adobe Helix",
        section: "Team Operations",
        link: "/"
      },
      {
        title: "Jr Design Operator",
        location: "Orem",
        team: "Adobe Spark",
        section: "Design Operations",
        link: "/"
      },
      {
        title: "Prototyping and Engineering Intern",
        location: "New York City",
        team: "Adobe Spark",
        section: "Prototyping and Engineering",
        link: "/"
      }
    ] */
