/**
 * 
 * @param {HTMLElement} $block 
 */
export default function decorate($block) {
    const $boards = $block.querySelectorAll(":scope > div");
    for(const board of $boards) {
      board.classList.add("job-listing");
      board.querySelector("div:first-child h3").classList.add("job-title");
      board.querySelector("div:first-child p").classList.add("position");
      board.querySelector("div:nth-child(2) p:nth-child(1)").classList.add("experience");
      board.querySelector("div:nth-child(2) p:nth-child(2)").classList.add("location");
    }
}