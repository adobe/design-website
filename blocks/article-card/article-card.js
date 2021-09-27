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

    /** @type {HTMLAnchorElement} */
    const link = result.text.querySelector("a");
    decorateLink(link);

    result.properties.link = link.href;
    decorateTagLink( result.text.querySelector("p:first-child"), { color: "black" } );
}
