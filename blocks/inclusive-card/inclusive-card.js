/*
 *   Copyright (c) 2021 Busy Human LLC
 *   All rights reserved.
 *   This file, its contents, concepts, methods, behavior, and operation  (collectively the \"Software\") are protected by trade secret, patent,  and copyright laws. The use of the Software is governed by a license  agreement. Disclosure of the Software to third parties, in any form,  in whole or in part, is expressly prohibited except as authorized by  the license agreement.
 */
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
      const truncateDekTextPages = ['/']
      const truncateDekText = truncateDekTextPages.includes(window.document.location.pathname)
  
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
    // const $tag = decorateTagLink( $element('div', `#${props.tag}`), { color: 'black' } );
    // $tag.innerHTML = $tag.innerHTML.replace(/[A-Za-z ]+/gm, '<span class="tag">$&</span>')
    const $hed = $element('.hed', props.hed);
    const DEK_TEXT_LIMIT = 70;
    let dekText = props.dek;
    if(truncateDekText){
      dekText = props.dek.length<DEK_TEXT_LIMIT ? props.dek:props.dek.substring(0,DEK_TEXT_LIMIT-3)+'...';
    }
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
  
    $text.append($hed, $dek, $byline);
  
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
  
  
  
  