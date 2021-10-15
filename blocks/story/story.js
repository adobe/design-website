import {$wrap, $element} from "../../scripts/helpers.js";

export default function decorate($block) {

    var mainContent = $block.querySelector(".section-wrapper > div");

    document.querySelector("body > main > div > div > div.story.block > div:nth-child(2) > div").classList.add("story-text");
    /**
     * story.querySelector(".content > p:nth-child(4)").classList.add("people");
     * story.querySelector(".content > p:nth-child(5)").classList.add("locations");
     * story.querySelector(".content > p:nth-child(6)").classList.add("zones");
     */
    }

    /**
     * var container = $wrap($element(".stories-stats"),
     * [
     *   document.querySelector("#think-about-design-differently"),
     *   document.querySelector(".openings"),
     *   document.querySelector(".people"),
     *   document.querySelector(".locations"),
     *   document.querySelector(".zones")
     * ])
     * mainContent.prepend(container);
     */

