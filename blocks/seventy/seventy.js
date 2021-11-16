export default function decorate($block) {
    const $blocks = $block.querySelectorAll(":scope > div");
    for(const block of $blocks) {
      block.classList.add("seventy");
      block.querySelector("div:nth-child(1)").classList.add("image");
      block.querySelector("div:nth-child(2)").classList.add("content");
      block.querySelector("div:nth-child(2) > p:first-child").classList.add("tag");
      block.querySelector("div:nth-child(2) > h2").classList.add("hed");
      block.querySelector("div:nth-child(2) > h3").classList.add("dek");
      block.querySelector("div:nth-child(2) > p:not(.tag)").classList.add("byline");
    }
  }
  