import { decorateDivisions, $element, getMetadata, $wrap } from "../../scripts/helpers.js";
import addButton from "../../blocks/button/button.js";

/**
 * @param {HTMLElement} $block
 */
export default async function makeHeaderBlock($block) {
    const $button_apply_now = addButton("Apply Now")
    const $dek              = $element(".dek", getMetadata('dek'));
    const $jobTitle         = $element("h1.hed.job-title", getMetadata('job-title'));
    // const $jobTitle         = $element("h1.hed.job-title", (getMetadata('job-title')||document.querySelector("h1")));
    const $location         = $element("p.detail-value",   getMetadata('location'));
    const $positionType     = $element("p.detail-value",   getMetadata('position-type'));
    const $department       = $element("p.detail-value",   getMetadata('department'));


    /* Big Giant element builder function: */
    const $header_block = $element("div.header-block", [
        $element("div.left", [$jobTitle, $button_apply_now]),
        $element("div.right", [
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
        ]),
    ]);
    document.querySelector("main > div.section-wrapper").prepend($header_block);
}
