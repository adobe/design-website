import {
    $element,
    getMetadata,
} from "../../scripts/helpers.js";
import addButton from "../button/button.js";

/**
 * @param {Document} document
 */

// export default async function assemblePostBody(document) {
export default function assemblePostBody(document) {

    /*       Header - Job Title       */
    const $jobTitle = $element("h1.hed.job-title", getMetadata('job-title'));
    const $header_block = $element("div.header-block", [
        $element("div.job-header-container", [$jobTitle, $button_apply_now]),
    ]);
        /* End Header Block */
        //  $element(".sticky-container", )


    /*       Apply Now Button TOP     */


    const $button_apply_now = addButton(
        "Apply Now",
        ()=> {console.log( "APPLY NOW CLICKED IN HEADER OF JOB POST")},
        "dk-bkg unfilled",
        "#ffffff"
    )
    /*       Small Size Details       */
    /*       Dek - SubTitle           */
    /*       Post Body                */
    /*       Apply Now Button BOTTOM  */



    buildJobPostSubheader(document);
    buildSideArticlesBlock(document);



    /* Assemble "Apply Now" Button */
    // TODO: button onclick: !!!
    /* Declare the function for "onClick" action */
    let buttonFunction = () => {
        console.log(" Clicked Apply Now Button")
    };
    const $button_apply_now = addButton("Apply Now", buttonFunction, 'unfilled lt-bkg', text_dark);
    postBody.append($button_apply_now);

    /* Assemble "Equal Opportunities" + "About Adobe Design" blocks */
    buildJobBlockFragments();
    /* Assemble "Similar Opportunities" block */
    buildSimOpportunitiesBlock();
    document.querySelector("main").append($element("div.similarOpps-block"));




}
