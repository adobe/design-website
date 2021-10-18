import { lookupAuthor } from '../../scripts/authors.js';
import { $element } from '../../scripts/helpers.js';

export default function decorate($main) {
    var paragraphs = document.querySelectorAll('body > main > div > div > p');
    paragraphs.forEach(p => {
      if( p.querySelector('picture') ) {
        p.classList.add('article-picture');
      }
    });
    // moveHeaderContent();
    $main.querySelector(':scope > div > div').classList.add('content');
    buildAuthorBio();
}

async function buildAuthorBio() {
  const author = await lookupAuthor("Test");
  document.body.insertBefore($element('.author-bio.block', [
    $element("div", [
      $element('author-name', [
        $element('picture', [
          $element('source', { attr: { media: '', srcset: author.image }}),
          $element('img.author-image', { attr: { src: author.image } }),
        ]),
        $element('h2.name', author.name),
        $element('h3.author-title', author.title),
      ]),
      $element('author-info', [
        $element("strong", "Author Bio"),
        $element("p", author.bio)
      ]),
    ]),
  ]), document.querySelector("#global-footer"));
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

