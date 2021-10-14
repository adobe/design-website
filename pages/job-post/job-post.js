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
  document.querySelector("body").classList.add("job-post");
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
}