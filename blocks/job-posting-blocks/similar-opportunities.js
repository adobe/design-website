import { $element } from '../../scripts/helpers.js';
import placeholderContent from './placeholder-content.js';

/**
 * @param {HTMLElement} $block
 */
export default async function makeSimilarOpportunitiesBlock() {
//   let uniqueLocationCount = 0;
  // const locationsArr = [];

  // Replace this with the actual current job listing once we can reference it
  const placeholderThisJob = {
    title: 'User Experience Designer (Contractor)',
    product: 'Acrobat',
    posType: '',
    department: 'Testing',
    city: ['San Fransisco'],
  };

  const placeholderStuff = placeholderContent().sort((a, b) => {
    function similarScore(job) {
      let score = 0;
      if (job.department && job.department === placeholderThisJob.department) score += 3;
      if (job.posType && job.posType === placeholderThisJob.posType) score += 1;
      if (job.product && job.product === placeholderThisJob.product) score += 1;
      if (job.city) {
        for (let i = 0; i < job.city.length; i += 1) {
          if (placeholderThisJob.city.includes(job.city[i])) score += 2;
        }
      }
      return score;
    }
    return similarScore(b) - similarScore(a);
  });
  const elementsArray = [];

  for (let i = 0; i < 3 && i < placeholderStuff.length; i += 1) {
    const obj = placeholderStuff[i];
    let citys = '';
    if (obj.city) {
      if (obj.city.length <= 1) citys = obj.city;
      else if (obj.city.length === 2) citys = `${obj.city[0]} or ${obj.city[1]}`;
      else if (obj.city.length >= 3) citys = `${obj.city.slice(0, -1).join(', ')}, or ${obj.city.slice(-1)}`;
    }
    elementsArray.push(
      $element('button.job', [
        $element('div.title', `${obj.title} ${
          obj.posType && !obj.posType.toLowerCase().includes('perminant')
            ? ` (${obj.posType})` : ''
        }`),
        // $element('p.department', obj.department),
        $element('p.product', obj.product),
        $element('p.city', citys),
      ]),
    );
  }
  /*   placeholderStuff.forEach(
    (obj) => {
      let citys = '';
      if (obj.city) {
        if (obj.city.length <= 1) citys = obj.city;
        else if (obj.city.length === 2) citys = `${obj.city[0]} or ${obj.city[1]}`;
        else if (obj.city.length >= 3) citys =
        `${obj.city.slice(0, -1).join(', ')}, or ${obj.city.slice(-1)}`;
      }
      elementsArray.push(
        $element('button.job', [
          $element('div.title', `${obj.title} ${
            obj.posType && !obj.posType.toLowerCase().includes('perminant')
              ? ` (${obj.posType})` : ''
          }`),
          // $element('p.department', obj.department),
          $element('p.product', obj.product),
          $element('p.city', citys),
        ]),
      );
    },
  ); */

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
