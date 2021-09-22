/**
 * 
 *
 */
export default function decorate($block) {
    const $joblist = $block.querySelectorAll(":scope > div");
    for(const job of $joblist) {
      job.classList.add("job-listing");
      job.querySelector("div:nth-child(2) h3").classList.add("job-title");
      job.querySelector("div:first-child p").classList.add("position");
      job.querySelector("div:nth-child(1) p:nth-child(1)").classList.add("experience");
      job.querySelector("div:nth-child(2) p:nth-child(2)").classList.add("location");
    }
}