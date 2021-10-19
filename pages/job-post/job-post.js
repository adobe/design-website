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
import makeHeaderBlock from "./job-info.js";

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


  let postContainer  = document.querySelector("main > div")
  postContainer.classList.add("post-container");
  let postText  = document.querySelector(".post-container > div")
  postText.classList.add("post-text");
  let suggestedArticles = $element("div.suggested-articles")
  let leftBlock = $element("div.left-block",[$element("div.spacer"),suggestedArticles])
  postContainer.prepend(leftBlock)
  // postText.classList.add("post-text");
  const $infoContainer = document.createElement("div").classList.add("job-info-container")
  // $infoContainer.append(document.querySelector("div.post-text"))


  // let $jobInfoContainer = $element("div.job-info-container", document.querySelector("body.job-post div.section-wrapper > div"))
  //   document.querySelector("body.job-post div.section-wrapper > div").classList.add("job-info-container");
  // let $jobPost =  $element("div.job-post", $jobInfoContainer)




  /* Dark navy color: */
    // Background.setColor( '#0B1C40' );
  /* light grey color: */
  // getMetadata('color')

  makeHeaderBlock($page);
  let title_h1 = document.querySelector("div.post-text > h1");
  if(title_h1) {
    title_h1.remove()
  };
  let infoContainer = $wrap(postText, $element("div.job-info-container"))

    /* Red color: */
    // Background.setColor( '#E91D25' )


  // let postText = document.querySelector(".job-info-container")
  // document.querySelector(".header-block")

  // let postText= document.querySelector(".job-info-container").lastChild;
  // postText.classList.add("post-text");
  // document.querySelector("div.post-text")
  let leftSpacer = $element("div.left-spacer")

  // const $aboutContainer = $element('div.about-container')

  // postText.querySelectorAll('h6').forEach((tag) => {
  //   tag.removeAttribute('id')
  //   tag.classList.add('header-6')
  //   // tag.appendTo($aboutContainer)
  //   console.log( " TAG ", tag, "\n type: ", typeof tag)
  // })
  let buttonFunction = () => {console.log(" Clicked Apply Now Button")}
  const $button_apply_now = addButton("Apply Now", buttonFunction, ['unfilled'], text_dark)
  // $element("div.left", [$jobTitle, $button_apply_now]),

  postText.append($button_apply_now)


  // const $about = $element('div.about-adobe-design', $aboutContainer)

  // $wrap($about, postText)
  // $about.appendTo(postText)

  console.log( " POST TEXT ", postText, "\n postText: ", postText)


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