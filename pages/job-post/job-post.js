import addButton from "../../blocks/button/button.js";
import { Background } from "../../scripts/background.js";
import {
  $element,
  getMetadata,
} from "../../scripts/helpers.js";
import makeHeaderBlock from "../../blocks/job-posting-blocks/job-post-header.js";
import { getJobsFragment } from "../../scripts/jobs-fragments.js";
import makeSimilarOpportunitiesBlock from "../../blocks/job-posting-blocks/similar-opportunities.js";
import assembleJobPost from "../../blocks/job-posting-blocks/job-post-assembler.js";

const bkg_grey_lt = '#E8E8E8';
const text_dark   = '#3E3E3E';

/**
 * @param {HTMLElement} $page
 */
export default function decorate($page) {
  /* Set Background Color */
  Background.setColor(getMetadata('color') || bkg_grey_lt);

  /* Add classes and ids to container elements */
  document.querySelector("body").classList.add("job-post");
  document.querySelector("#global-header").classList.add("split");

  let postContainer  = document.querySelector("main > div");
  postContainer.classList.add("post-container");




  let postBody = document.querySelector(".post-container > div");
  postBody.classList.add("post-text");
  buildJobPostSubheader(document);

  /* Assemble the header block. It needs to be here else HTML will break */
  makeHeaderBlock($page);
  /* Remove extra header if it exists */
  let title_h1 = document.querySelector("div.post-text > h1");
  if(title_h1){ title_h1.remove() };


  /* Add Spacer and suggested article blocks */
  let suggestedArticles = $element("div.suggested-articles");
  let leftBlock = $element("div.left-block",[
    $element("div.spacer"),
    suggestedArticles
  ]);
  postContainer.prepend(leftBlock);

  /* Assemble "Apply Now" Button */
  /* Declare the function for "onClick" action */
  let buttonFunction = () => {
    console.log(" Clicked Apply Now Button")
  };
  const $button_apply_now = addButton("Apply Now", buttonFunction, 'unfilled lt-bkg', text_dark);
  postBody.append($button_apply_now);



    buildJobBlockFragments();

    buildSimOpportunitiesBlock();

    document.querySelector("main").append($element("div.similarOpps-block"))

  /**
   * Element Constants:
   *
   * $job-title      : h1         / Job Title
   * $detail-label   : label  --ex: "Position Type"
   * $detail-value   : value  --ex: "Full-time"
   * $dek            : Like the summary/hook for position

   * $section-header : sub header / What you'll be working on
   * $paragraph      : p          / basically just <p>
   * $paragraph.list
   */
}

async function buildJobPostSubheader(document){
  let subheader = await assembleJobPost(document);
  if(subheader) {
    let postBody = document.querySelector(".post-container > div.post-text");
    postBody.prepend(subheader)
    // document.querySelector("div.similarOpps-block").append(subheader)
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

  /* ----- About Adobe Design Element -----  */
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
  const eopsInnerHtml  = await getJobsFragment(eopsURL);

  if(eopsInnerHtml) {
    let eqOpPolicy = $element('div.eq-op-policy-stmnt');
    eqOpPolicy.innerHTML = eopsInnerHtml;
    document.querySelector("main").append(eqOpPolicy);
  } else {
    console.log(`Cannot fetch ${eopsURL} fragment or fragment doesn't exist`)
  };

}