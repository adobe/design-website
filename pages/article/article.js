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

function buildAuthorBio() {
  const authorImage = './media_16fd3a6e96f49f43ba7d3ced9ec935ed493b7a305.png?width=750&amp;format=webply&amp;optimize=medium';
  document.body.insertBefore($element('.author-bio.block', [
    $element("div", [
      $element('author-name', [
        $element('picture', [
          $element('source', { attr: { media: '', srcset: authorImage }}),
          $element('img.author-image', { attr: { src: authorImage } }),
        ]),
        $element('h2.name', 'Matthew Carlson'),
        $element('h3.author-title', 'Director of Examples'),
      ]),
      $element('author-info', [
        $element("strong", "Author Bio"),
        $element("p", "Lorem Ipsum")
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

