import { processDivisions } from "../../scripts/helpers.js";
// import { fetchJobIndex } from "../../scripts/queries.js";

// var jobIndex = null;

/**
 * 
 * @param {HTMLElement} $block 
 */
export default async function decorate($block) {
  // if (!jobIndex) {
  //   jobIndex = await fetchJobIndex();
  //   console.log("jobIndex:", jobIndex);
  // }
  const $boards = $block.querySelectorAll(":scope > div");

  for (const board of $boards) {
      const { properties } = processDivisions(board, null, { level: "child" });
      board.classList.add("job-listing");
      board.querySelector("div:first-child h3").classList.add("job-title");
      board.querySelector("div p:nth-child(2)").classList.add("experience");
      board.querySelector("div p:nth-child(3)").classList.add("location");
      board.querySelector("div p:nth-child(4)").classList.add("position");
      board.querySelector("div:first-child div").classList.add("all-jobs");
  }

  const seeJobsDiv = document.createElement("div")
  seeJobsDiv.classList.add("see-jobs")
  const seeJobs = document.createElement("h3")
  seeJobs.innerHTML = "See our job openings"
  seeJobsDiv.append(seeJobs)

  seeJobs.addEventListener("click", function(){
    console.log("Jobs page not setup");
  })

  $block.append(seeJobsDiv)
}
