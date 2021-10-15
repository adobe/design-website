import { Background } from "../../scripts/background.js";
import {
  convertToBackground,
  decorateLink,
  decorateTagLink,
  processDivisions,
  wrapWithElement,
  $element,
} from "../../scripts/helpers.js";

/**
 * @param {HTMLElement} $block
 */
export default function decorate($block) {

  /** Get the properties and identify the blocks  */
  // const result = processDivisions($block, {
  //   image:      $div => $div.querySelector("picture"),
  // });
  // const props = result.properties;

  /* Dark navy color: */
    // Background.setColor( '#0B1C40' );
  /* light grey color: */
    // Background.setColor( '#E8E8E8' );
    /* Red color: */
    // Background.setColor( '#E91D25' )

  document.querySelector("body").classList.add("job-post");
  // let postText = document.querySelector(".job-info-container")
  // document.querySelector(".header-block")

  let postText= document.querySelector(".job-info-container").lastChild;
  postText.classList.add("post-text");

  const $aboutContainer = $element('div.about-container')

  postText.querySelectorAll('h6').forEach((tag) => {
    tag.removeAttribute('id')
    tag.classList.add('header-6')
    // tag.appendTo($aboutContainer)
    console.log( " TAG ", tag, "\n type: ", typeof tag)
  })

  const $about = $element('div.about-adobe-design', $aboutContainer)

  $about.appendTo(postText)

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