import {
    convertToBackground,
    $element,
    $wrap,
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
       * $hed    : Header    / Title of Card
       * $dek    : Subheader / summary
       */
    const $text = $element('.text');

    let truncateText = false;
    const HED_TEXT_LIMIT = 50;
    const DEK_TEXT_LIMIT = 75;
    let hedText = props.hed;
    let dekText = props.dek;
    if(truncateText){
      dekText = props.dek.length<DEK_TEXT_LIMIT ? props.dek:props.dek.substring(0,DEK_TEXT_LIMIT-3)+'...';
      hedText = props.hed.length<HED_TEXT_LIMIT ? props.hed:props.hed.substring(0,HED_TEXT_LIMIT-3)+'...';
    }
    const $hed = $element('.hed', hedText);
    const $dek = $element('.dek', dekText);

    $text.append($hed, $dek);

    /* Apply the properties to the block */
    $block.style.backgroundColor = result.properties.background;
    $block.style.color = result.properties.textcolor;

    /* ---------  - IMAGES - ---------  */
    /**
       * Remove image and place on proper side:
       */
    result['.image'].remove();

    //TODO: Add paths to the card generation and use that instead of assuming the path is the same as the header
    let path = props.path
    if(!path)
        path = "/"
    const toolkitLink = $element('a.stories-link', { attr: { href: path, target: path.includes('http')? "_blank" : "" } })
    result['.block-content'].append(toolkitLink)
    toolkitLink.prepend($text)

    if (result.properties['image-side'] === 'left') {
      result['.image'].classList.add('left');
    } else if(result.properties['image-side'] === 'right'){
      result['.image'].classList.add('right');
    }
    toolkitLink.append(result['.image']);
    result['.image'].classList.add('image');
    convertToBackground(result['.image'].querySelector('img'), result['.image']);
  }