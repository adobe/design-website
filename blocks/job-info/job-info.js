import { processDivisions, $element } from "../../scripts/helpers.js";
import addButton from "../button/button.js";

/**
 * @param {HTMLElement} $block
 */
export default async function decorate($block) {
    /* Get the properties and identify the blocks */
    const result = processDivisions($block, null);
    const props = result.properties;
    const $jobTitle = $element("h1.hed.job-title", props['job-title']);
            // TODO: make and import 'apply now' button
    // const $button_apply_now = $element("button.apply-now",  "Apply Now" )
    const $button_apply_now = addButton("Apply Now")
    const $location         = $element("p.detail-value", props.location);
    const $position_type    = $element("p.detail-value", props['position-type']);
    const $dek              = $element("p.dek", props.dek);
    const $department       = $element("p.detail-value", props.department);

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
                    $position_type,
                ]),
            ]),
            $dek,
        ]),
    ]);
    document.querySelector("main > div").prepend($header_block);
}
