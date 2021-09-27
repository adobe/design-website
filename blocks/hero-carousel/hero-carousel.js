import { processDivisions } from "../../scripts/helpers.js";

/**
 *
 * @param {HTMLElement} $block
 */
export default function decorate($block) {
    const result = processDivisions($block, {
        text:       ($div) => $div.textContent,
        image:      null,
    });
    const $slides = $block.querySelectorAll(':scope > div');
    $slides.forEach((slide) => {
        slide.classList.add('slide');

        const $content = slide.querySelector('div:nth-child(2)');
        slide.querySelector(':nth-child(1)').classList.add('image');
        $content.querySelector('p:first-child').classList.add('tag-link');
        $content.querySelector('h2').classList.add('title');
        $content.querySelector('p:last-child').classList.add('author');
    });
}