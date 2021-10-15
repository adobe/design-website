export default function decorate($block) {
  const $boards = $block.querySelectorAll(":scope > div");
  for(const board of $boards) {
    /** const { properties } = decorateDivisions(board, null, { level: "child" }); */
    board.classList.add("scoreboard");
    board.querySelector("div:nth-child(1)").classList.add("number");
    board.querySelector("div:nth-child(2)").classList.add("caption");
    /**
     * board.querySelector("div:nth-child(3)").classList.add("tag");
     * Currently we want to remove the tag element
     */
    board.querySelector("div:nth-child(3)").remove()
  }
}
