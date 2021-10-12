import { processDivisions, $element } from "../../scripts/helpers.js";
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

  // for (const $job of $jobs) {
  //   var $el = $element(".job-listing", [
  //     $element("h2.job-title", "Test Title"),
  //     $element("p.experience", "Test Experience"),
  //     $element("p.location", "California"),
  //     $element("p.position", "Test Position"),
  //   ]);
  //   $block.append($el);
  // }

  const seeJobsDiv = document.createElement("div");
  seeJobsDiv.classList.add("see-jobs");
  const seeJobs = document.createElement("h3");
  seeJobs.innerHTML = "See our job openings";
  seeJobsDiv.append(seeJobs);

  seeJobs.addEventListener("click", function(){
    console.log("Jobs page not setup");
  });

  $block.append(seeJobsDiv);
}
