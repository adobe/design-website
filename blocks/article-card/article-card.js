import { convertToBackground, decorateLink, decorateTagLink, processDivisions, createDiv } from "../../scripts/helpers.js";

/**
 *
 * @param {HTMLElement} $block
 */
export default function decorate($block) {
    // Get the properties and identify the blocks
    const result = processDivisions($block, {
        image:      $div => $div.querySelector("picture"),
    });

    const $text = createDiv("text");
    const $tag = decorateTagLink( document.createElement("div"), { color: "black" } );
    const $hed = createDiv("hed");
    const $dek = createDiv("dek");
    const $byline = createDiv("byline");

    $text.append($tag, $hed, $dek, $byline);
    
    // Apply the properties to the block
    $block.style.backgroundColor = result.properties.background;
    $block.style.color = result.properties.textcolor;
    result.image.remove();

    if (!result.properties["image-side"] || result.properties["image-side"] === "left") {
        result.blockContent.prepend(result.image);
    } else {
        result.blockContent.append(result.image);
    }

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
    
    $block.prepend($text);
}



