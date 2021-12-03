/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import { resolvePageBackgroundColor } from './background.js';
import { $element } from './helpers.js';

let $loadingCover;

export function setPageLoading() {
  $loadingCover = $element('#page-loading-cover', [
    $element('#page-loading-placeholder', [
      $element('div'),
      $element('div', [
        $element('div'),
        $element('div'),
        $element('div'),
      ]),
    ]),
  ]);
  document.body.appendChild($loadingCover);
  const bg = resolvePageBackgroundColor() || '#EB211F';
  document.querySelector('#page-loading-cover').style.background = bg;
  document.body.style.background = bg;
}

function cleanupPageLoader() {
  setTimeout(() => {
    document.body.style.background = null;
    if ($loadingCover) {
      $loadingCover.remove();
      $loadingCover = null;
    }
  }, 500);
}

export function pageDoneLoading() {
  setTimeout(() => {
    document.body.classList.add('loaded');
    cleanupPageLoader();
  }, 250);
}
