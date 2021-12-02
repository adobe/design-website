import {
  $wrap, $element, $remainder, $scrollAnimation,
} from '../../scripts/helpers.js';

export default function decorate($main) {
  const toolkit = document.querySelector('body > main');
  toolkit.classList.add('toolkit');
  const mainContent = $main.querySelector('.section-wrapper > div');
  const header = $wrap($element('.toolkit-header'),
    [
      document.querySelector('#our-toolkit'),
      document.querySelector('#the-ideas-systems-and-tools-that-guide-our-thinking-our-processes-and-our-designs'),
    ]);
  mainContent.prepend(header);
  const remainder = $remainder(mainContent, '.toolkit-header');
  const pageContent = $wrap($element('.toolkit-page-content'), remainder);
  mainContent.append(pageContent);
  document.querySelector('body > main > div > div > div.toolkit-page-content > p').classList.add('big-red-text');

  // Js for scrolling animations
  const allArticles = document.querySelectorAll('body > main > div > div > div.toolkit-page-content > *');
  allArticles.forEach((article, index) => {
    if (index > 1) {
      article.classList.add('js-scroll');
      article.classList.add('fade-in');
    }
  });

  $scrollAnimation();
}
