/**
 * 
 * @param {HTMLElement} $block 
 */
export default function decorate($block) {
    const $boards = $block.querySelectorAll(":scope > div");
    for(const board of $boards) {
      board.classList.add("joblisting");
      board.querySelector("div:nth-child(1)").classList.add("jobtitle");
      board.querySelector("div:nth-child(2)").classList.add("position");
      board.querySelector("p:nth-child(3)").classList.add("experience");
      board.querySelector("div:nth-child(3)").classList.add("location");
    }
}