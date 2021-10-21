import { decorateDivisions, $element, getMetadata, $wrap } from "../../scripts/helpers.js";
import addButton from "../button/button.js";
import placeholderContent from "./placeholder-content.js";


/**
 * @param {HTMLElement} $block
 */
export default async function makeSimilarOpportunitiesBlock($block) {
    let job_count = 0;
    let unique_location_count = 0;
    let locationsArr = [];

    let placeholderStuff = placeholderContent('simOpps');

    job_count = placeholderStuff.length;

    let elementsArray = [];

    placeholderStuff.forEach(
        obj => {
            if(locationsArr.indexOf(obj.city) < 0) locationsArr.push(obj.city);
            elementsArray.push(
                $element("div.job",[
                    $element("div.left",[
                        $element("div.title", obj.title),
                        $element("div.sub-title", `${obj.product} | ${obj.posType}`),
                    ]),
                    $element("div.right",[
                        $element("div.department", obj.department),
                        $element("div.city", obj.city),
                    ]),
                ])
            )
        }
    )



    unique_location_count = locationsArr.length;





    /**
     * Build Similar Opportunities Block dynamically:
     * Oct 20th design:
     */
    const  $container_elm = $element("div.opp-block", [
        $element("div.opp-container", [
            $element("div.header-c",[
                /* Oct 8th design: included location and job counts: */
                /* $element("div.count",`${job_count} Job${job_count>1?"s":""}`), */
                /* $element("div.location",`${unique_location_count} Location${unique_location_count>1?"s":""}`), */
                $element("p.title", "Similar opportunities")
            ]),
            $element("div.opps-container", elementsArray)
        ])
    ]);
    return $container_elm;
}
