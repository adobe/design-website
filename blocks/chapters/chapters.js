import { processDivisions } from "../../scripts/helpers.js";

/**
 * 
 * @param {HTMLElement} $block 
 */
export default function decorate($block) {
    const { properties } = processDivisions($block);
    const $chapters = $block.querySelectorAll(":scope > div");
    $chapters.forEach(($chapter) => {
        $chapter.classList.add("chapter");
        const $heading = $chapter.querySelector(":scope > div:first-child");
        const $content = $chapter.querySelector(":scope > div:last-child");

        $heading.classList.add("chapter-heading");
        $content.classList.add("chapter-content");
    });
}
