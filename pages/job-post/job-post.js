import addButton from "../../blocks/button/button.js";
import {
    $addMiddleElm,
    $element,
    getMetadata,
} from "../../scripts/helpers.js";
import { getJobsFragment } from "../../scripts/jobs-fragments.js";
import makeSimilarOpportunitiesBlock from "../../blocks/job-posting-blocks/similar-opportunities.js";


const bkg_grey_lt = '#E8E8E8';
const text_dark   = '#3E3E3E';


/**
 * @param {HTMLElement} $page
 */
export default async function decorate($page) {
    /* Add classes and ids to container elements */
    let body_job_post = document.querySelector("body");
    body_job_post.classList.add("job-post");
    document.querySelector("#global-header").classList.add("split");
    document.querySelector("div#global-background").remove();
    let postContainer  = document.querySelector("main > div.section-wrapper");
    postContainer.classList.add("post-container");
    let postText = document.querySelector(".post-container > div");
    postText.classList.add("post-text");

    /* Assemble "Apply Now" Button. It'll be used 3x */
    /* Declare the function for "onClick" action */

    let jobURL = getMetadata('job-title')
    let buttonFunction = () => {
        console.log(" Clicked Apply Now Button")
    };
    const $button_apply_now = addButton("Apply Now", buttonFunction, 'unfilled lt-bkg', text_dark);
    // postBody.append($button_apply_now);
    //-- START Job Position details subheader --//
    const $dek              = $element(".dek",           getMetadata('dek'));
    const $location         = $element("p.detail-value", getMetadata('location'));
    const $positionType     = $element("p.detail-value", getMetadata('position-type'));
    const $req_number       = $element("p.detail-value", getMetadata('req-number') || 'None Provided');
    const $header_details   = $element("div.subhead-container", [
        $element("div.details", [
            $element("span.detail", [
                $element("p.detail-label", "Location"),
                $location,
            ]),
            $element("span.detail", [
                $element("p.detail-label", "Position Type"),
                $positionType,
            ]),
            $element("span.detail", [
                $element("p.detail-label", "Req Number"), $req_number
            ]),
        ]),
        // $dek
    ]);
    //-- End Job Position details subheader --//


    //-- START Job Posting Body Text Block --//


    //-- END   Job Posting Body Text Block --//


    //-- START Sticky bits: --//
    let stickyContainer = $element("div.sticky-container")
    postContainer.prepend(stickyContainer);
    stickyContainer.append($button_apply_now)
    stickyContainer.append($header_details)

    //-- END Sticky bits: --//


    //-- Start Delete --//
    let uselessBoxElm = $element("div.boxy", $element("p.stuff", "WOrds and stuff"))
    body_job_post.prepend(uselessBoxElm);
    //-- END Delete --//

    $addMiddleElm(
        document.querySelector("div.section-wrapper"),
        ".post-body",
        document.querySelector(".post-text")
    )








    /* ------------------------------------------------------------ */
    /* Assemble "Equal Opportunities" + "About Adobe Design" blocks */
    buildJobBlockFragments();
    /* Assemble "Similar Opportunities" block */
    buildSimOpportunitiesBlock();
    document.querySelector("main").append($element("div.similarOpps-block"));
}

async function buildSimOpportunitiesBlock(){
    let simOppsContent = await makeSimilarOpportunitiesBlock('nothing');
    if(simOppsContent) {
        document.querySelector("div.similarOpps-block").append(simOppsContent)
    } else {
        console.log(`Cannot fetch similar opportunities to build the block`)
    }
}

async function buildJobBlockFragments() {
    const aboutURL = 'about-adobe-design';
    const eopsURL = 'equal-opportunity-policy-stmnt';

    /* ----- About Adobe Design Element -----    */
    /** Get "About Adobe Design" Fragment: */
    const aboutInnerHTML = await getJobsFragment(aboutURL);
    if(aboutInnerHTML){
        let aboutElm = $element('div.about-adobe-design')
        aboutElm.innerHTML = aboutInnerHTML;
        document.querySelector("main").append(aboutElm)
    } else {
        console.log(`Cannot fetch ${aboutURL} fragment or fragment doesn't exist`)
    };

    /* ------ Equal Opportunities Policy ------- */
    /** Get "Equal Opportunity Policy" Fragment: */
    const eopsInnerHtml    = await getJobsFragment(eopsURL);

    if(eopsInnerHtml) {
        let eqOpPolicy = $element('div.eq-op-policy-stmnt');
        eqOpPolicy.innerHTML = eopsInnerHtml;
        document.querySelector("main").append(eqOpPolicy);
    } else {
        console.log(`Cannot fetch ${eopsURL} fragment or fragment doesn't exist`)
    };
}