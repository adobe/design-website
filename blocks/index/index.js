import { processDivisions } from "../../scripts/helpers.js";

export default function decorate($block) {
  const $blocks = $block.querySelectorAll(":scope > div");
  for(const block of $blocks) {
    const { properties } = processDivisions(board, null, { level: "child" });

    block.classList.add("full-bleed");
    block.querySelector("div:nth-child(1)").classList.add("number");
      block.querySelector("div:nth-child(2)").classList.add("caption");
      block.querySelector("div:nth-child(3)").classList.add("tag");
    }
}
