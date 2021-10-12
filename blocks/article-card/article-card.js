import {
    convertToBackground,
    $element,
    // decorateLink,
    decorateTagLink,
    processDivisions,
    // wrapWithElement,
} from "../../scripts/helpers.js";

/**
 *
 * @param {HTMLElement} $block
 */
export default function decorate($block) {

    // Get the properties and identify the blocks
    const result = processDivisions($block, {
        image:      $div => $div.querySelector("picture"),
    });
    const props = result.properties;

    /**
     *  Text Constants:
     *
     * $text   : Text half of the card
     * $tag    : Hash Tag  / category
     * $hed    : Header    / Title of Article
     * $dek    : Subheader / summary
     * $byline : Author | Author's Position
     */
    const $text = $element({ cls: "text" });
    const $tag = decorateTagLink( $element({}, `#${props.tag}`), { color: "black" } );
    const $hed = $element({ cls: "hed" }, props.hed);
    const $dek = $element({ cls: "dek" }, props.dek);
    const $byline = $element({ cls: "byline" });

    /** if props.author exists: */
    if(!!props.author){
        const $author = $element({ tag: "span", cls: "author", content: props.author });
        if(!!props.position){
            const $position = $element({ tag: "span", cls: "position", content: props.position });
            /* Also add in a pipe boi if author's position exists: */
            const $pipe = $element({ tag: "span", cls: "pipe", content: "|" });
            $byline.append($author, $pipe, $position);
        } else {
            $byline.append($author);
        }
    }

    // const link = wrapWithElement(document.$element("a"), $element({ cls: "link-wrapper", content: "Hello" }));
    // link.attributes.href = result.properties.link || null;

    $text.append($tag, $hed, $dek, $byline);

    // Apply the properties to the block
    $block.style.backgroundColor = result.properties.background;
    $block.style.color = result.properties.textcolor;

    /* ---------  - IMAGES - ---------  */
    /**
     * Remove image and place on proper side:
     */
    result.image.remove();

    result.blockContent.prepend($text);

    if (!result.properties["image-side"] || result.properties["image-side"] === "left") {
        result.blockContent.prepend(result.image);
    } else {
        result.blockContent.append(result.image);
    }

    result.image.classList.add("image");

    convertToBackground(result.image.querySelector("img"), result.image);

    /** @type {HTMLAnchorElement} */
    // const link = result.text.querySelector("a");
    // decorateLink(link);
    // link.parentElement.classList.add("article-title");
    // result.properties.link = link.href;

    // $block.prepend($text);

    // decorateLink(link);
}



