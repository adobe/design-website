import {
    convertToBackground,
    $element,
    decorateTagLink,
    processDivisions,
} from "../../scripts/helpers.js";

/**
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
    const $text = $element(".text");
    const $tag = decorateTagLink( $element("div", `#${props.tag}`), { color: "black" } );
    const $hed = $element(".hed", props.hed);
    const $dek = $element(".dek", props.dek);
    const $byline = $element(".byline");

    /** if props.author exists: */
    if(!!props.author){
        const $author = $element("span.author", props.author );
        if(!!props.position){
            const $position = $element("span.position", props.position );
            /* Also add in a pipe boi if author's position exists: */
            const $pipe = $element("span.pipe", "|");
            $byline.append($author, $pipe, $position);
        } else {
            $byline.append($author);
        }
    }

    $text.append($tag, $hed, $dek, $byline);

    /* Apply the properties to the block */
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
}



