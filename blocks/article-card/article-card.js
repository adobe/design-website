import {
  convertToBackground,
  $element,
  // $wrap,
  decorateTagLink,
  decorateDivisions,
  propsFromBlockLink,
} from '../../scripts/helpers.js';

/**
 * @param {HTMLElement} $block
 */
export default async function decorate($block) {
  const truncateTextPages = ['/'];
  const truncateText = truncateTextPages.includes(window.document.location.pathname);

  const props = await propsFromBlockLink($block, {
    path: 'path',
    hed: 'title',
    dek: 'description',
    image: 'image',
    background: { field: 'color', default: 'white' },
    textcolor: { field: 'textcolor', default: 'black' },
    tag: { field: 'tags', default: '' },
  });

  // Get the properties and identify the blocks
  const result = decorateDivisions($block, [
    '.image',
  ]);
  if (result.properties) {
    Object.assign(props, result.properties);
  }

  /**
     *  Text Constants:
     *
     * $text   : Text half of the card
     * $tag    : Hash Tag  / category
     * $hed    : Header    / Title of Article
     * $dek    : Subheader / summary
     * $byline : Author | Author's Position
     */
  const $text = $element('.text');
  const $tag = decorateTagLink($element('div', ['#', $element('span.tag', props.tag)]), props.tag.replaceAll(' ', '-'), { color: 'black' });

  const HED_TEXT_LIMIT = 50;
  const DEK_TEXT_LIMIT = 75;
  let hedText = props.hed;
  let dekText = props.dek;
  if (truncateText) {
    dekText = props.dek.length < DEK_TEXT_LIMIT ? props.dek : `${props.dek.substring(0, DEK_TEXT_LIMIT - 3)}...`;
    hedText = props.hed.length < HED_TEXT_LIMIT ? props.hed : `${props.hed.substring(0, HED_TEXT_LIMIT - 3)}...`;
  }
  const $hed = $element('.hed', hedText);
  const $dek = $element('.dek', dekText);

  const $byline = $element('.byline');

  /** if props.author exists: */
  if (props.author) {
    const $author = $element('span.author', props.author);
    if (props.position) {
      const $position = $element('span.position', props.position);
      $byline.append($author);
      $byline.append($position);
    } else {
      $byline.append($author);
    }
  }

  $text.append($tag, $hed, $dek, $byline);

  /* Apply the properties to the block */
  $block.style.backgroundColor = props.background;
  $block.style.color = props.textcolor;

  /* ---------  - IMAGES - ---------  */
  /**
     * Remove image and place on proper side:
     */
  if (result['.image'] && result['.image'].querySelector('img')) {
    result['.image'].remove();
  } else {
    result['.image'] = $element('picture', [
      $element('source', [
        $element('img', { attr: { src: props.image } }),
      ]),
    ]);
  }

  let path;
  if (props.path) path = props.path;
  else {
    path = `/stories/${props.tag}/${props.hed}`;
    path = path.replaceAll(' ', '-').replaceAll(/[^a-zA-Z-\d/:]/g, '').toLowerCase();
  }

  const articleLink = $element('a.stories-link', { attr: { href: path } });
  result['.block-content'].append(articleLink);
  articleLink.prepend($text);

  if (props['image-side'] === 'left') result['.image'].classList.add('left');
  else if (props['image-side'] === 'right') result['.image'].classList.add('right');

  articleLink.append(result['.image']);

  result['.image'].classList.add('image');
  convertToBackground(result['.image'].querySelector('img'), result['.image']);
}
