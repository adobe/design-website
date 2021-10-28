import {
  convertToBackground,
  $element,
  decorateTagLink,
  decorateDivisions,
} from '../../scripts/helpers.js';

/**
 * @param {HTMLElement} $block
 */
export default function decorate($block) {

  // Get the properties and identify the blocks
  const result = decorateDivisions($block, [
    '.image',
  ]);
  const props = result.properties;

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
  const $tag = decorateTagLink( $element('div', `#${props.tag}`), { color: 'black' } );
  const $hed = $element('.hed', props.hed);
  const DEK_TEXT_LIMIT = 70;
  let dekText = props.dek.length<DEK_TEXT_LIMIT ? props.dek:props.dek.substring(0,DEK_TEXT_LIMIT-3)+'...';
  const $dek = $element('.dek', dekText);
  const $byline = $element('.byline');

  /** if props.author exists: */
  if (!!props.author) {
    const $author = $element('span.author', props.author);
    if (!!props.position) {
      const $position = $element('span.position', props.position);
      $byline.append($author);
      $byline.append($position);
    } else {
      $byline.append($author);
    }
  }

  $text.append($tag, $hed, $dek, $byline);

  /* Apply the properties to the block */
  $block.style.backgroundColor = result.properties.background;
  $block.style.color = result.properties.textcolor;

  /* ---------  - IMAGES - ---------  */
  /**
     * Remove image and place on proper side:
     */
  result['.image'].remove();
  result['.block-content'].prepend($text);

  if (!result.properties['image-side'] || result.properties['image-side'] === 'left') {
    result['.block-content'].prepend(result['.image']);
  } else {
    result['.block-content'].append(result['.image']);
  }

  result['.image'].classList.add('image');

  convertToBackground(result['.image'].querySelector('img'), result['.image']);
}



