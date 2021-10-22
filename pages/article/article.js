import { lookupAuthor } from '../../scripts/authors.js';
import { $element, getMetadata, $wrap } from '../../scripts/helpers.js';
import { fetchIndex } from "../../scripts/queries.js";
let index;

export default function decorate($main) {
    var paragraphs = document.querySelectorAll('body > main > div > div > p');
    paragraphs.forEach(p => {
      if( p.querySelector('picture') ) {
        p.classList.add('article-picture');
      }
    });
    // moveHeaderContent();
    $main.querySelector(':scope > div > div').classList.add('content');
    buildSimilarStories();
    buildAuthorBio();
}

async function buildSimilarStories(){
  if (!index) {
    index = await fetchIndex();
  }

  let stories = index.stories.data
  let storiesContent = $element('.stories')
  if(stories.length > 0)
    storiesContent.appendChild(buildStory(stories[0]))
  if(stories.length > 1)
    storiesContent.appendChild(buildStory(stories[1]))
  let $similarStoriesBlock = $wrap($element('.similar-stories'), [$element('h2.similar-stories-header', 'Similar Stories'), storiesContent])
  document.body.insertBefore($similarStoriesBlock, document.querySelector('#global-footer'));
}

function buildStory( story ) {
  const mediaAttr = "(max-width: 400px)";
  if(!story.title) {
      story.title = "[TITLE_MISSING]";
  }
  return $element(".story.block", [
      $element("a.link", { attr: { href: story.path } }, [
          $element(".image", [
              $element("picture", [
                  $element("source", { attr: { media: mediaAttr, srcset: story.image }}),
                  $element("img", { attr: { src: story.image } }),
              ]),
              $element("p.tag", "#LEADING DESIGN"),
          ]),
          $element(".story-text", [
              $element("h2.story-header", 'From mind to canvas' ),
              $element("h3", "Creating art with synthesia"),
              $element("p.author", "Laura Herman"),
              $element("p.position", "User Experience Researcher")
          ])
      ]),
  ]);
}

async function buildAuthorBio() {
  const authorName = getMetadata('author');
  const author = await lookupAuthor(authorName);

  let $bioBlock;

  if (author) {
    const $bio = $element('p');
    $bio.innerHTML = author.bio;

    $bioBlock = $element('.author-bio.block', [
      $element('div', [
        $element('author-name', [
          $element('picture', [
            $element('source', { attr: { media: '', srcset: author.image }}),
            $element('img.author-image', { attr: { src: author.image } }),
          ]),
          $element('h2.name', author.name),
          $element('h3.author-title', author.title),
        ]),
        $element('.author-info', [
          $element('strong', 'Author Bio'),
          $bio,
        ]),
      ]),
    ]);
  } else {
    $bioBlock = $element('.author-bio.block', [
      $element(".not-found", `Author ${authorName} not found`),
    ]);
  }
  document.body.insertBefore($bioBlock, document.body.querySelector('main').nextSibling);
}

function moveHeaderContent() {
  const header = document.querySelector('.block.header');
  const section = document.querySelector('.section-wrapper');
  const container = document.querySelector('.section-wrapper div:first-child');
  const newDiv = document.createElement('div');
  section.insertBefore(newDiv, container);

  container.classList.add('content');
  // newDiv.appendChild(page);
  newDiv.appendChild(header);

  const picture = header.querySelector('picture');
  picture.classList.add('header-image');
  container.prepend(picture);

  const oldPictureDiv = header.querySelector('div:first-child > div:first-child');
  oldPictureDiv.remove()
}

