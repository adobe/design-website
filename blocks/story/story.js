import {
  // $wrap,
  // $element,
  decorateDivisions,
} from '../../scripts/helpers.js';

export default async function decorate($block) {
  // let mainContent = $block.querySelector('.section-wrapper > div');
  decorateDivisions($block, [
    '.image',
    '.story-text',
  ]);
}

/**
     * var container = $wrap($element(".stories-stats"),
     * [
     *   document.querySelector("#think-about-design-differently"),
     *   document.querySelector(".openings"),
     *   document.querySelector(".people"),
     *   document.querySelector(".locations"),
     *   document.querySelector(".zones")
     * ])
     * mainContent.prepend(container);
     */
