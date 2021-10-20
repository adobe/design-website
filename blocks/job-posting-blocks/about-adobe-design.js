import { $element } from "../../scripts/helpers";
/**
 * About Adobe Design Block
 * Creates the "About Adobe Design" block which appears at the bottom of job postings
 * @returns {HTMLButtonElement} aboutContainer element
 */
export default function makeAboutBlock( ) {
    const $aboutAdobeDesign = $element("div#aboutAdobeDesign.aboutContainer");
    $aboutAdobeDesign.innerHTML = '<h2 class="about">About Adobe Design\
        </h2> \
        <p  class="about">\
        Adobe Design creates tools that amplify the world’s ability to create and communicate. We’re a global team of designers, researchers, prototypers, content strategists, program managers, and more who work across Adobe’s three product lines: Creative Cloud, Document Cloud, and Experience Cloud.\
        </p>';
    return $aboutAdobeDesign
}
