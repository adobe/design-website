import {
    buildArticleCard,
    getBlogArticle,
    fetchPlaceholders,
  } from '../../scripts/scripts.js';

  async function decorateRecommendedArticles(recommendedArticlesEl, paths) {
    if (recommendedArticlesEl.classList.contains('small')) {
      recommendedArticlesEl.parentNode.querySelectorAll('a').forEach((aEl) => {
        aEl.classList.add('button', 'primary', 'small', 'light');
      });
      recommendedArticlesEl.parentNode.classList.add('recommended-articles-small-content-wrapper');
    } else {
      const title = document.createElement('h3');
      const placeholders = await fetchPlaceholders();
      title.textContent = placeholders['recommended-for-you'];
      recommendedArticlesEl.prepend(title);
    }
    const articleCardsContainer = document.createElement('div');
    articleCardsContainer.className = 'article-cards';
    for (let i = 0; i < paths.length; i += 1) {
      const articlePath = paths[i];
      // eslint-disable-next-line no-await-in-loop
      const article = await getBlogArticle(articlePath);
      if (article) {
        const card = buildArticleCard(article);
        articleCardsContainer.append(card);
        recommendedArticlesEl.append(articleCardsContainer);
      }
    }
    if (!articleCardsContainer.hasChildNodes()) {
      recommendedArticlesEl.parentNode.parentNode.remove();
    }
  }

  export default function decorate(blockEl) {
    const anchors = [...blockEl.querySelectorAll('a')];
    blockEl.innerHTML = '';
    const paths = anchors.map((a) => {new URL(a.href).pathname; a.target = "_blank"});
    decorateRecommendedArticles(blockEl, paths);
  }