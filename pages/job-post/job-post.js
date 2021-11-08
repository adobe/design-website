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
import makeSideArticlesBlock from "../../blocks/job-posting-blocks/side-articles.js";

const bkg_grey_lt = '#E8E8E8';
const text_dark   = '#3E3E3E';

/**
 * @param {HTMLElement} $page
 */
export default async function decorate($page) {
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

  /** Add "Working at Adobe"/ Suggested articles block: */
  let leftBlock = $element("div.left-block");
  postContainer.append(leftBlock);

  buildSideArticlesBlock(document);

  /* Assemble "Apply Now" Button */
  /* Declare the function for "onClick" action */
  let buttonFunction = () => {
    console.log(" Clicked Apply Now Button")
  };
  const $button_apply_now = addButton("Apply Now", buttonFunction, 'unfilled lt-bkg', text_dark);
  postBody.append($button_apply_now);
  /**
   // SHAMEful code: - SLJ - 11/08/21
   * Because the Blue header block has to be fixed position but has variable height,
   * and even though rest of content depends on its height, we have to do some
   * black-magic-eff'ery to try to guess the blue block's height:
   */
  let headerHeight = (
    document.querySelector(".header-block").clientHeight > 155
  ) ? (
    document.querySelector(".header-block").clientHeight + "px"
  ) : (
    (
      /**
       * Get roughly how <p> many lines job title will take:
       * Times it by 'em's (3.62), add margin/'em's:
      */
      Math.ceil(getMetadata('job-title').length / 11) * 3.63
    ) + 24.84 + "em"
  );

  let gridString = `grid-template-rows: clamp(30.7em, ${headerHeight}, 40em)`;
  document.querySelector(".post-container").setAttribute("style", gridString);

  buildJobBlockFragments();
  buildSimOpportunitiesBlock();

  document.querySelector("main").append($element("div.similarOpps-block"));
  document.querySelector("div.job-header-container") ?
  console.log(
    " job-header-container ",
    document.querySelector("div.job-header-container").clientHeight,
    document.querySelector("div.job-header-container").scrollHeight,
    document.querySelector("div.job-header-container").getAttribute("style"),
    document.querySelector("div.job-header-container")
  )
  :
  console.log(" job-header-container ", "undefined")


}

//** Builds the section with the location, position type, & dek */
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

//** Builds the "Working at Adobe" section/ recommended articles*/
async function buildSideArticlesBlock(document){
  console.log(" SHOULD HAVE ATTACHED SIDE ARTICLES TO JOB POSTING PAGE ? ")
  let sideArticles = await makeSideArticlesBlock(document);
  if(sideArticles) {

    document.querySelector("div.left-block").append(sideArticles)
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