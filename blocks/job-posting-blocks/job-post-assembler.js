import {
    $element,
    getMetadata,
  } from "../../scripts/helpers.js";

/**
 * Assemble job post, including location, department, dek, and body text
 * @param {Document} document the HTML document for this page
 * @returns {HTMLElement} $header_bit - the assembled job post
 */

export default async function assembleJobPost(document){

    const $dek              = $element(".dek", getMetadata('dek'));
    const $location         = $element("p.detail-value",   getMetadata('location'));
    const $positionType     = $element("p.detail-value",   getMetadata('position-type'));
    /* const $department       = $element("p.detail-value",   getMetadata('department')); */

    /* Big Giant element builder function: */
    const $header_bit = $element("div.subhead-container", [
        $element("div.details", [
            $element("span.left-detail", [
                $element("p.detail-label", "Location"),
                $location,
            ]),
            $element("span.right-detail", [
                $element("p.detail-label", "Position Type"),
                $positionType,
            ]),
        ]),
        $dek
    ]);
    return $header_bit
}