import addButton from '../../blocks/button/button.js';
import { $element, $wrap, buildStory } from '../../scripts/helpers.js';
// import { lookupAuthor } from '../../scripts/authors.js';
import { fetchIndex } from '../../scripts/queries.js';

let index;
// const Console = console;

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

  // Console.log('INDEX', index);

  const allStories = index.fullindex.data.filter((data) => data.path.split('/')[1] === 'stories');
  const locationCopy = { ...window.location };
  const tagFilter = locationCopy.search ? locationCopy.search.split('=')[1] : null;
  $main.classList.add('stories-index-view');
  const $target = $main.querySelector(':scope > div > div');
  const $thinkDifferent = document.querySelector('.think-differently');

  if (tagFilter) {
    const header = document.querySelector('#all-stories');
    header.innerHTML = `#${tagFilter.replaceAll('-', ' ')}`;
  }

  const $results = $element('.stories');
  const stories = allStories.filter((story) => storyMatch(tagFilter, story));
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
  const removeButtonCheck = () => {
    if (storyCount >= stories.length) {
      const elm = document.getElementById('load-more-section');
      if (elm) elm.remove();
    }
  };

  const buttonActionCallback = () => {
    appendStories();
    removeButtonCheck();
  };

  appendStories();

  const $loadButton = addButton('LOAD MORE', buttonActionCallback, 'unfilled dark-background');
  const $loadMoreSection = $element('#load-more-section.load-more-stories', $loadButton);
  $target.append($wrap($element('.content'), [$results, $loadMoreSection, $thinkDifferent]));
  removeButtonCheck();
}
