import { $scrollAnimation } from '../../scripts/helpers.js';

export default async function decorator($main) {
  $main.classList.add('home-view-container');
  $main.querySelectorAll('.article-card').forEach((article) => {
    article.classList.add('js-scroll', 'fade-in');
  });
  $scrollAnimation();
}
