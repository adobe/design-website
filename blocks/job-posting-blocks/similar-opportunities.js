import { $element } from '../../scripts/helpers.js';
import placeholderContent from './placeholder-content.js';

/**
 * @param {HTMLElement} $block
 */
export default async function makeSimilarOpportunitiesBlock() {
//   let uniqueLocationCount = 0;
  const locationsArr = [];
  const placeholderStuff = placeholderContent();
  const elementsArray = [];
  placeholderStuff.forEach(
    (obj) => {
      if (locationsArr.indexOf(obj.city) < 0) locationsArr.push(obj.city);
      elementsArray.push(
        $element('div.job', [
          $element('div.title', obj.title),
          $element('div.sub-title', `${obj.product} | ${obj.posType}`),
          $element('div.department', obj.department),
          $element('div.city', obj.city),
        ]),
      );
    },
  );

  // uniqueLocationCount = locationsArr.length;

  /**
   * Build Similar Opportunities Block dynamically:
   * Oct 20th design:
   */
  const $containerElm = $element('div.opp-block', [
    $element('div.opp-container.full-bleed', [
      $element('div.header-c', [
        /* Oct 8th design: included location and job counts: */
        /* $element("div.count",`${job_count} Job${job_count>1?"s":""}`), */
        /* $element("div.location",
         * `${uniqueLocationCount} Location${uniqueLocationCount>1?"s":""}`),
         */
        $element('p.title', 'Similar opportunities'),
      ]),
      $element('div.psns-container', elementsArray),
    ]),
  ]);
  return $containerElm;
}
