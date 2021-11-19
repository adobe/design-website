import addButton from "../../blocks/button/button.js";
import { Background } from "../../scripts/background.js";
import {
    $addMiddleElm,
    $addNewLayerElm,
    $element,
    $wrap,
    getMetadata,
} from "../../scripts/helpers.js";
import makeHeaderBlock from "../../blocks/job-posting-blocks/job-post-header.js";
import { getJobsFragment } from "../../scripts/jobs-fragments.js";
import makeSimilarOpportunitiesBlock from "../../blocks/job-posting-blocks/similar-opportunities.js";
import assembleJobPost from "../../blocks/job-posting-blocks/job-post-assembler.js";
import makeSideArticlesBlock from "../../blocks/job-posting-blocks/left-blocks.js";

const bkg_grey_lt = '#E8E8E8';
const text_dark     = '#3E3E3E';

/**
 * @param {HTMLElement} $page
 */
export default async function decorate($page) {
    /* Add classes and ids to container elements */
    let body_job_post = document.querySelector("body");
    body_job_post.classList.add("job-post");
    body_job_post.setAttribute("style", "background-image: none;")
    document.querySelector("#global-header").classList.add("split");
    document.querySelector("div#global-background").remove();



    let postContainer  = document.querySelector("main > div");
    postContainer.classList.add("post-container");


    let postBody = document.querySelector(".post-container > div");
    postBody.classList.add("post-text");


    $addMiddleElm(document.querySelector(".post-container"), "div.inner_post_contnr", document.querySelector(".post-text") )

    buildJobPostSubheader(document);

    buildSideArticlesBlock(document);

    /* Remove extra header if it exists */
    let title_h1 = document.querySelector("div.post-text > h1");
    if(title_h1){ title_h1.remove() };


    /* Assemble "Apply Now" Button */

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
    // $element("div.similarOpps-block").after(document.querySelector("main .section-wrapper"))

    // $wrap($element("div.main-wrapper"), document.querySelector("main"))

}


//** Builds the section with the location, position type, & dek */
async function buildJobPostSubheader(document){
    let subheader = await assembleJobPost(document);
    if(subheader) {
        let postBody = document.querySelector(".post-container div.post-text");
        postBody.prepend(subheader)
        // document.querySelector(".inner_post_contnr")
                // document.querySelector("div.similarOpps-block").append(subheader)
    } else {
        console.log(`Cannot fetch similar opportunities to build the block`)
    }

}

//** Builds the Blue Header block + "Working at Adobe" section/recommended articles*/
async function buildSideArticlesBlock(document){
    let sideArticles = await makeSideArticlesBlock(document);
    if(sideArticles) {
        // document.querySelector(".post-container").prepend(sideArticles)
        document.querySelector(".inner_post_contnr").prepend(sideArticles)
    } else {
        console.log(`Cannot fetch similar opportunities to build the block`)
    }

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