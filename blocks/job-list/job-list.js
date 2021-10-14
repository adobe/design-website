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
    console.log("index:", index);
  }
  const $jobs = $block.querySelectorAll(":scope > div");

  $block.innerHTML = "";

  for (const job of index.byType.jobs) {
    var $el = $element("a.single-job", { attr: { href: job.path } }, [
      $element("h3.job-title", job.title || "No Title"),
      $element("p.experience", "Test Experience"),
      $element("p.location", "California"),
      $element("p.position", "Test Position"),
    ]);
    $block.append($el);
  }

  const seeJobsDiv = document.createElement("div");
  seeJobsDiv.classList.add("see-jobs");
  const seeJobs = document.createElement("h3");
  seeJobs.innerHTML = "See our job openings";
  seeJobsDiv.append(seeJobs);

  seeJobs.addEventListener("click", () => {
    console.log("Jobs page not setup");
  });

  $block.querySelector.innerHTML = "";
  $block.append(seeJobsDiv);
}
