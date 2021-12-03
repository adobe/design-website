import {
  readBlockConfig,
  buildArticleCard,
  fetchPlaceholders,
  fetchBlogArticleIndex,
  stamp,
} from '../../scripts/scripts.js';

function isCardOnPage(article) {
  const path = article.path.split('.')[0];
  /* using recommended and featured articles */
  return !!document.querySelector(`.featured-article a.featured-article-card[href="${path}"], .recommended-articles a.article-card[href="${path}"]`);
}

async function filterArticles(config, feed, limit, offset) {
  const result = [];

  /* filter posts by category, tag and author */
  const filters = {};
  Object.keys(config).forEach((key) => {
    const filterNames = ['tags', 'author', 'category'];
    if (filterNames.includes(key)) {
      const vals = config[key];
      let v = vals;
      if (!Array.isArray(vals)) {
        v = [vals];
      }
      filters[key] = v.map((e) => e.toLowerCase().trim());
    }
  });

  while ((feed.data.length < limit + offset) && (!feed.complete)) {
    const beforeLoading = new Date();
    // eslint-disable-next-line no-await-in-loop
    const index = await fetchBlogArticleIndex();
    const indexChunk = index.data.slice(feed.cursor);

    const beforeFiltering = new Date();
    /* filter and ignore if already in result */
    const feedChunk = indexChunk.filter((article) => {
      const matchedAll = Object.keys(filters).every((key) => {
        const matchedFilter = filters[key].some((val) => (article[key]
            && article[key].toLowerCase().includes(val)));
        return matchedFilter;
      });
      return (matchedAll && !result.includes(article) && !isCardOnPage(article));
    });
    stamp(`chunk measurements - loading: ${beforeFiltering - beforeLoading}ms filtering: ${new Date() - beforeFiltering}ms`);
    feed.cursor = index.data.length;
    feed.complete = index.complete;
    feed.data = [...feed.data, ...feedChunk];
  }
}

async function decorateArticleFeed(articleFeedEl, config, offset = 0,
  feed = { data: [], complete: false, cursor: 0 }) {
  let articleCards = articleFeedEl.querySelector('.article-cards');
  if (!articleCards) {
    articleCards = document.createElement('div');
    articleCards.className = 'article-cards';
    articleFeedEl.appendChild(articleCards);
  }

  const limit = 12;
  const pageEnd = offset + limit;
  await filterArticles(config, feed, limit, offset);
  const articles = feed.data;
  const max = pageEnd > articles.length ? articles.length : pageEnd;
  for (let i = offset; i < max; i += 1) {
    const article = articles[i];
    const card = buildArticleCard(article);

    articleCards.append(card);
  }
  if (articles.length > pageEnd || !feed.complete) {
    const loadMore = document.createElement('a');
    loadMore.className = 'load-more button small primary light';
    loadMore.href = '#';
    const placeholders = await fetchPlaceholders();
    loadMore.textContent = placeholders['load-more'];
    articleFeedEl.append(loadMore);
    loadMore.addEventListener('click', (event) => {
      event.preventDefault();
      loadMore.remove();
      decorateArticleFeed(articleFeedEl, config, pageEnd, feed);
    });
  }
  articleFeedEl.classList.add('appear');
}

export default function decorate(block) {
  const config = readBlockConfig(block);
  block.innerHTML = '';
  decorateArticleFeed(block, config);
}
