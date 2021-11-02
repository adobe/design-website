import { $element } from "../../scripts/helpers.js";
import { fetchIndex } from "../../scripts/queries.js";

var index = null;

/**
 *
 * @param {HTMLElement} $block
 */
export default async function decorate($block) {
  if (!index) {
    index = await fetchIndex();
  }

  console.log(" INDEX ", index, index.jobs);

  $block.innerHTML = "";
  if(index && index.jobs) {
    for (const job of index.jobs.data) {
      var $el = $element("a.single-job", { attr: { href: job.path } }, [
        $element("h3.job-title", job.title || "No Title"),
        $element("p.experience", "Test Experience"),
        $element("p.location", "California"),
        $element("p.position", "Test Position"),
      ]);
      $block.append($el);
    }
    const seeJobsDiv = document.createElement("a");
    seeJobsDiv.classList.add("see-jobs");
    seeJobsDiv.setAttribute("href", "/jobs/");
    const seeJobs = document.createElement("span");
    seeJobs.innerHTML = "VIEW OUR JOB OPENINGS";
    seeJobsDiv.append(seeJobs);

    $block.querySelector.innerHTML = "";
    $block.append(seeJobsDiv);
  }
}
