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

  // Get the properties and identify the blocks
  const result = processDivisions($block, {
    image:      $div => $div.querySelector("picture"),
  });
  const props = result.properties;

  const { properties } = processDivisions($block);
  const $col1 = $block.querySelector(":scope > div > div:first-child");



  console.log(" PROPS : ", props,"\n PROPerties : ", properties)

  /**
   * Element Constants:
   *
   * -- TODO: could include superscript
   * $job-title      : h1         / Job Title
   * $detail-label   : label  --ex: "Position Type"
   * $detail-value   : value  --ex: "Full-time"
   * $highlight      : Like the summary/hook for position
   * $section-header : sub header / What you'll be working on
   * $paragraph      : p          / basically just <p>
   */


  // Add (class="job-post") to entire pg so each job posting will have same styles
  document.querySelector("body").classList.add("job-post");

  // var paragraphs = document.querySelectorAll("body > main > div > div > p");
  // paragraphs.forEach(p => {
  //   if( p.querySelector("picture") ) {
  //     p.classList.add("job-post-picture");
  //   }
  // });
}