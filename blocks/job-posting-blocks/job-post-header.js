import { decorateDivisions, $element, getMetadata, $wrap } from "../../scripts/helpers.js";
import addButton from "../button/button.js";

/**
 * @param {HTMLElement} $block
 */
export default async function makeHeaderBlock($block) {
    const $button_apply_now = addButton(
        "Apply Now",
        ()=> {console.log( "APPLY NOW CLICKED IN HEADER OF JOB POST")},
        "dk-bkg unfilled",
        "#ffffff"
    )

    const $jobTitle         = $element("h1.hed.job-title", getMetadata('job-title'));

    /* Big Giant element builder function: */
    const $header_block = $element("div.header-block", [
        $element("div.job-header-container", [$jobTitle, $button_apply_now]),
    ]);
    document.querySelector("main > div.section-wrapper").insertBefore(
        $header_block,
        document.querySelector("main > div.section-wrapper > div")
    );
}
