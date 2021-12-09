import { $element } from '../../scripts/helpers.js';
import placeholderContent from './placeholder-content.js';

/**
 * @param {HTMLElement} $block
 */
export default async function makeSimilarOpportunitiesBlock() {
//   let uniqueLocationCount = 0;
  // const locationsArr = [];
  const placeholderStuff = placeholderContent();
  const elementsArray = [];
  placeholderStuff.forEach(
    (obj) => {
      elementsArray.push(
        $element('button.job', [
          $element('div.title', `${obj.title} ${
            obj.posType && !obj.posType.toLowerCase().includes('perminant')
              ? ` (${obj.posType})` : ''
          }`),
          // $element('p.department', obj.department),
          $element('p.product', obj.product),
          $element('p.city', obj.city),
        ]),
      );
    },
  );

  /**
   * Build Similar Opportunities Block dynamically:
   * Oct 20th design:
   */
  const $containerElm = $element('div.opp-block', [
    $element('div.header-c', $element('p.title', 'Similar opportunities')),
    $element('div.psns-container', elementsArray),
  ]);
  return $containerElm;
}
