import {$wrap, $element} from "../../scripts/helpers.js";

export default function decorate($block) {

    var mainContent = $block.querySelector("body > main > div > div.content");

    const $stories = $block.querySelectorAll(':scope > div');
    for (const story of $stories) {
        story.classList.add("story");
        story.querySelector(".content > p:nth-child(3)").classList.add("openings");
        story.querySelector(".content > p:nth-child(4)").classList.add("people");
        story.querySelector(".content > p:nth-child(5)").classList.add("locations");
        story.querySelector(".content > p:nth-child(6)").classList.add("zones");
    }

    var container = $wrap($element(".stories-stats"), 
    [
      document.querySelector("#think-about-design-differently"),
      document.querySelector(".openings"),
      document.querySelector(".people"),
      document.querySelector(".locations"),
      document.querySelector(".zones")
    ])
    mainContent.prepend(container);

    
}