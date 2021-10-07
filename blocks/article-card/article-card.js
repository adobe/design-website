import { convertToBackground, decorateLink, decorateTagLink, processDivisions } from "../../scripts/helpers.js";

/**
 *
 * @param {HTMLElement} $block
 */
export default function decorate($block) {
    // Get the properties and identify the blocks
    const result = processDivisions($block, {
        text:       ($div) => $div.textContent,
        image:      null,
    });

    // Apply the properties to the block
    $block.style.backgroundColor = result.properties.background;
    $block.style.color = result.properties.textcolor;
    result.image.remove();

    if (!result.properties["image-side"] || result.properties["image-side"] === "left") {
        result.blockContent.prepend(result.image);
    } else {
        result.blockContent.append(result.image);
    }

    result.text.classList.add("text");
    result.image.classList.add("image");

    convertToBackground(result.image.querySelector("img"), result.image);

    /** #Tag Link Text  / p   */
    decorateTagLink( result.text.querySelector("p:first-child"), { color: "black" } );

    /** Title Text /  article-title  / h2  */

    /** SubTitle / / h3  */
    /** @type {HTMLAnchorElement} */
    const link = result.text.querySelector("a");
    decorateLink(link);
    link.parentElement.classList.add("article-title");
    result.properties.link = link.href;

    /**   byline     / p   */
    $block.querySelector("p:nth-of-type(3)").classList.add("byline");
}



