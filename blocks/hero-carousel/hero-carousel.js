/**
 *
 * @param {HTMLElement} $block
 */
export default function decorate($block) {
    var $slides = $block.querySelectorAll(":scope > div");
    for(const slide of $slides) {
        slide.classList.add("slide");
        slide.querySelector(":nth-child(1)").classList.add("image");
        slide.querySelector(":nth-child(2) p:first-child").classList.add("tag");
        slide.querySelector(":nth-child(2) h2").classList.add("title");
        slide.querySelector(":nth-child(2) p:last-child").classList.add("author");
    }
}