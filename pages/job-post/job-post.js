import addButton from "../../blocks/button/button.js";
import { Background } from "../../scripts/background.js";
import {
  convertToBackground,
  decorateLink,
  decorateTagLink,
  decorateDivisions,
  wrapWithElement,
  $element,
  $wrap,
  getMetadata,
} from "../../scripts/helpers.js";
import makeHeaderBlock from "../../blocks/job-posting-blocks/job-post-header.js";
// import makeAboutBlock from "../../blocks/job-posting-blocks/about-adobe-design.js";

const bkg_grey_lt = '#E8E8E8',
      text_dark   = '#3E3E3E';

/**
 * @param {HTMLElement} $page
 */
export default function decorate($page) {
  Background.setColor(getMetadata('color') || bkg_grey_lt);


  document.querySelector("body").classList.add("job-post");
  document.querySelector("#global-header").classList.add("split");
  // document.querySelector("main").classList.add("job-info-container");
  // document.querySelector("div.section-wrapper > div").classList.add("post-text");


  let postContainer  = document.querySelector("main > div");
  postContainer.classList.add("post-container");
  let postText  = document.querySelector(".post-container > div");
  postText.classList.add("post-text");
  let suggestedArticles = $element("div.suggested-articles");
  let leftBlock = $element("div.left-block",[$element("div.spacer"),suggestedArticles]);
  postContainer.prepend(leftBlock);
  const $infoContainer = document.createElement("div").classList.add("job-info-container");


  makeHeaderBlock($page);
  let title_h1 = document.querySelector("div.post-text > h1");
  if(title_h1) {
    title_h1.remove()
  };
  let infoContainer = $wrap(postText, $element("div.job-info-container"));

  // let postText= document.querySelector(".job-info-container").lastChild;
  // postText.classList.add("post-text");
  // document.querySelector("div.post-text")
  let leftSpacer = $element("div.left-spacer");

  // postText.querySelectorAll('h6').forEach((tag) => {
    //   tag.removeAttribute('id')
    //   tag.classList.add('header-6')
    //   // tag.appendTo($aboutContainer)
    //   console.log( " TAG ", tag, "\n type: ", typeof tag)
    // })
    let buttonFunction = () => {console.log(" Clicked Apply Now Button")};
    const $button_apply_now = addButton("Apply Now", buttonFunction, ['unfilled'], text_dark);
    // $element("div.left", [$jobTitle, $button_apply_now]),

    postText.append($button_apply_now);


    //--------------------------------------//
    //----- About Adobe Design Element -----//
    //--------------------------------------//
    const aboutElm = $element('div.about-adobe-design')
    aboutElm.innerHTML = '<div class="about-container"><h2 class="about-header">About Adobe Design</h2> <p class="about-text"> Adobe Design creates tools that amplify the world’s ability to create and communicate. We’re a global team of designers, researchers, prototypers, content strategists, program managers, and more who work across Adobe’s three product lines: Creative Cloud, Document Cloud, and Experience Cloud. </p>';
    document.querySelector("main").append(aboutElm)
    //--------------------------------------//
    //----- Equal Opportunities Policy -----//
    //--------------------------------------//
    const eqOpPolicy = $element('div.eq-op-policy-stmnt')
    eqOpPolicy.innerHTML = '<div class="container"> <p class="eq-op">Adobe is an equal opportunity employer. We hire talented individuals, regardless of gender, race, ethnicity, ancestry, age, disability, sexual orientation, gender identity or expression, veteran status, cultural background or religious beliefs. We know that when our employees feel appreciated and included, they can be more creative, innovative and successful. This is what it means to be Adobe For All.</p><p class="eq-op">Adobe is an equal opportunity and affirmative action employer. We welcome and encourage diversity in the workplace regardless of gender, race or color, ethnicity or national origin, age, disability, religion, sexual orientation, gender identity or expression, veteran status, or any other characteristics protected by law.</p><p class="eq-op">When you join Adobe, you can look forward to collaborating with the most genuine people in the industry, working on projects with real purpose, and having immense pride in the products we create and the customers we support. You will also be surrounded by colleagues who are committed to helping each other grow through our unique Check-In approach where ongoing feedback flows freely.</p><p class="eq-op">Come create experiences that matter at a company that is recognized around the world and hear what our employees are saying about their career experiences on the Adobe Life blog.</p></div>';
    document.querySelector("main").append(eqOpPolicy)






  // //----------//
//   /// has similar opportunities block here //
// //----------//
//   About adobe design: full width, background: red,
//   header:
//   40/100, adobe clean serif -- reg
//   text:
//   61/100, adobe clean serif --reg
//   //----------//
//   Sub-text-block
//   small type -- background: white,full width,
//   text:
//   20/35, adobe clean -- reg



  // .nextSibling();
  // postText.classList.add("post-text");

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