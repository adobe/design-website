import lookupAuthor from '../../scripts/authors.js';
import {
  $element,
  $wrap,
  getMetadata,
  buildStory,
} from '../../scripts/helpers.js';
import { fetchIndex } from '../../scripts/queries.js';

let index;
const CONSOLE = console;

async function buildSimilarStories(tag) {
  if (!index) {
    index = await fetchIndex();
  }
  const allStories = index.fullindex.data.filter((data) => data.path.split('/')[1] === 'stories');
  const similarStories = allStories.filter((story) => story.path.split('/')[2] === tag);
  const storiesContent = $element('.stories');

  const currentPath = window.document.location.pathname;
  let postedStories = 0;
  for (let i = 0; postedStories < 2 && i < similarStories.length; i += 1) {
    if (similarStories[i].path !== currentPath) {
      storiesContent.appendChild(buildStory(similarStories[i]));
      postedStories += 1;
    }
  }
  const $similarStoriesBlock = $wrap($element('.similar-stories'),
    $wrap($element('.similar-stories-content'), [$element('h2.similar-stories-header',
      'Similar Stories'), storiesContent]));
  document.body.insertBefore($similarStoriesBlock, document.querySelector('#global-footer'));
}

export default async function decorate($main) {
  // const content = $main.querySelector('body > main > div.section-wrapper > div');
  const paragraphs = document.querySelectorAll('body > main > div > div > p');

  paragraphs.forEach((p) => {
    if (p.querySelector('picture')) {
      p.classList.add('article-picture');
    }
  });

  try {
    $main.querySelector(':scope > div > div').classList.add('content');
    const artElement = $main.querySelector('.header.block > div:nth-child(2) > div:nth-child(2)');
    if (artElement) artElement.classList.add('art');
  } catch (err) {
    CONSOLE.log(err);
  }
  const tag = window.document.location.pathname.split('/')[2];
  buildSimilarStories(tag);

  const headerTag = $element(
    'a.header-tag.stories-link', // Tag type and classes
    { attr: { href: `/stories/?tag=${tag.toUpperCase()}` } }, // Link
    ['#', $element('span.tag', tag.toUpperCase().replaceAll('-', ' '))],
  ); // Tag content

  /**
   * Links in article should open in new tab:
   */
  try {
    document.querySelector(
      '.additional-reading',
    )?.querySelectorAll(
      'ul > li > a',
    )?.forEach((elem) => {
      elem.setAttribute('target', '_blank');
    });
    const linksInArticle = document.querySelectorAll('.content > p > a');
    if (linksInArticle) linksInArticle.forEach((elem) => elem.setAttribute('target', '_blank'));
  } catch (err) {
    CONSOLE.error(err);
  }

  try {
    document.querySelector('main h1').before(headerTag);
  } catch (err) {
    CONSOLE.error(err);
  }

  try {
    const $art = $element('.art', getMetadata('image-attribution'));
    const $date = $element('.date', getMetadata('date'));

    // TODO: Remove CONSOLE.log: (SLJ 12/15/21)
    CONSOLE.log($date);

    const $articleContent = $main.querySelector('body > main > .section-wrapper > .content');
    $articleContent.querySelector('h1')?.classList.add('header-h1');
    $articleContent.querySelector('h2').classList.add('header-sub');
    $articleContent.querySelector('.article-picture')?.headImage.classList.add('header-img');
    $articleContent.querySelector('.article-picture').append($art);
    $main.querySelector('div.author-bio.block > div > .author-info')?.append($date);
  } catch (err) {
    CONSOLE.error(err);
  }

  // const headerContent = $wrap($element('.header'), [
  //   headerDiv,
  //   headerh1,
  //   headerh2,
  //   headerimg]);

  // content.append(headerContent);

  // Beginning of image attribution
}

async function buildAuthorBio() {
  const authorName = getMetadata('author');
  const date = getMetadata('date');
  const author = await lookupAuthor(authorName);

  let $authorBlock;
  let $bioBlock;

  if (author) {
    const $bio = $element('p');
    $bio.innerHTML = author.bio;
    if (!author.bio.name) { // Check if the author bio is an error
      $bioBlock = $element('.author-bio.block', [
        $element('div', [
          $element('author-name', [
            $element('picture', [
              $element('source', { attr: { media: '', srcset: author.image } }),
              $element('img.author-image', { attr: { src: author.image } }),
            ]),
            $element('h2.name', author.name),
            $element('h3.author-title', author.title),
          ]),
          $element('.author-info', [
            $bio,
            $element('.date', [
              date,
            ]),
          ]),

        ]),
      ]);

      document.querySelector('main').append($bioBlock);
    }

    $authorBlock = $element('.author.block', [
      $element('.author-body', [
        $element('picture', [
          $element('source', { attr: { media: '', srcset: author.image } }),
          $element('img.author-image', { attr: { src: author.image } }),
        ]),
        $element('.author-desc', [
          $element('h2.name', author.name),
          $element('h3.author-title', author.title),
        ]),
      ]),
    ]);
  } else {
    $authorBlock = $element('.author.block', [
      $element('.not-found', `Author ${authorName} not found`),
    ]);
  }

  try {
    if (document.querySelector('.header-img')) document.querySelector('.header-img').append($authorBlock);
  } catch (err) {
    CONSOLE.error(err);
  }
}
buildAuthorBio();

// function moveHeaderContent() {
//   const header = document.querySelector('.block.header');
//   const section = document.querySelector('.section-wrapper');
//   const container = document.querySelector('.section-wrapper div:first-child');
//   const newDiv = document.createElement('div');
//   section.insertBefore(newDiv, container);

//   container.classList.add('content');
//   // newDiv.appendChild(page);
//   newDiv.appendChild(header);

//   const picture = header.querySelector('picture');
//   picture.classList.add('header-image');
//   container.prepend(picture);

//   const oldPictureDiv = header.querySelector('div:first-child > div:first-child');
//   oldPictureDiv.remove();
// }
