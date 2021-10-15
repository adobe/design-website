import { decorateDivisions } from "../../scripts/helpers.js";

/**
 *
 * @param {HTMLElement} $block
 */
export default function decorate($block) {
    const $chapters = $block.querySelectorAll(":scope > div");
    $chapters.forEach(($chapter) => {
        const { properties } = decorateDivisions($block, null, { level: "child" });
        $chapter.classList.add("chapter");
        const $heading = $chapter.querySelector(":scope > div:first-child");
        const $content = $chapter.querySelector(":scope > div:last-child");

        $heading.classList.add("chapter-heading");
        $content.classList.add("chapter-content");
    });
}
