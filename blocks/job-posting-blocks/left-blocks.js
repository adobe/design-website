import { $element, getMetadata } from "../../scripts/helpers.js";
import addButton from "../button/button.js";

/**
 * @param {HTMLElement} $block
 */
export default async function makeJobLeftBlock(document) {
    /* Header Block */
    const $button_apply_now = addButton(
        "Apply Now",
        ()=> {console.log( "APPLY NOW CLICKED IN HEADER OF JOB POST")},
        "dk-bkg unfilled",
        "#ffffff"
    )
    const $jobTitle = $element("h1.hed.job-title", getMetadata('job-title'));
    const $header_block = $element("div.header-block", [
        $element("div.job-header-container", [$jobTitle, $button_apply_now]),
    ]);
    /* End Header Block */
    return $element(".sticky-container", [$header_block])

}
