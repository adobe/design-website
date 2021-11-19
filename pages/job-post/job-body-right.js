import { $element, getMetadata, } from "../../scripts/helpers.js";

/**
 * @param {Document} $document
 */
export default async function jobBodyRight($document) {
    console.log(" BLOCK ", $document)


    /* Remove extra header if it exists */
    let title_h1 = document.querySelector("div.post-text > h1");
    if(title_h1){ title_h1.remove() };

    const $jobTitle = $element("h1.hed.job-title", getMetadata('job-title'));



    /* Job title      */
    /* Sub title      */
    /* job body text  */

}
