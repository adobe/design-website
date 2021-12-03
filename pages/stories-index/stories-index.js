import { $element, $wrap, buildStory } from '../../scripts/helpers.js';
// import { lookupAuthor } from '../../scripts/authors.js';
import { fetchIndex } from '../../scripts/queries.js';

let index;
const Console = console;

function storyMatch(pageTag, story) {
  const storyTag = story.path.split('/')[2];

  if (!pageTag || pageTag.toLowerCase() === storyTag.toLowerCase()) {
    return true;
  }
  return false;
}

export default async function decorator($main) {
  if (!index) {
    index = await fetchIndex();
  }
  Console.log('INDEX', index);
  const allStories = index.fullindex.data.filter((data) => data.path.split('/')[1] === 'stories');
  const locationCopy = { ...Location };
  const tagFilter = locationCopy.search ? locationCopy.search.split('=')[1] : null;
  $main.classList.add('stories-index-view');

  if (tagFilter) {
    const header = document.querySelector('#all-stories');
    header.innerHTML = `#${tagFilter.replaceAll('-', ' ')}`;
  }

  const stories = allStories.filter((story) => storyMatch(tagFilter, story));
  const $target = $main.querySelector(':scope > div > div');
  const $thinkDifferent = document.querySelector('.think-differently');
  const $results = $element('.stories');
  const $loadMoreButton = $element('.load-more-stories', $element('span', 'LOAD MORE'));
  $target.append($wrap($element('.content'), [$results, $loadMoreButton, $thinkDifferent]));

  let storyCount = 0;
  function appendStories(count = 6) {
    for (let i = 0; i < count && storyCount < stories.length;) {
      const story = stories[storyCount];
      // let author = await lookupAuthor(story.author)
      $results.append(buildStory(story));
      i += 1;
      storyCount += 1;
    }
  }
  appendStories();

  if (storyCount >= stories.length) $loadMoreButton.remove();
  $loadMoreButton.addEventListener('click', () => {
    appendStories(stories, 20);
    if (storyCount >= stories.length)$loadMoreButton.remove();
  });
}
