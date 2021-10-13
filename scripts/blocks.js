import { loadCSS } from "./importer.js";

/**
 * Sanitizes a name for use as class name.
 * @param {*} name The unsanitized name
 * @returns {string} The class name
 */
 export function toClassName(name) {
    return name && typeof name === 'string'
      ? name.toLowerCase().replace(/[^0-9a-z]/gi, '-')
      : '';
  }

/**
 * Loads JS and CSS for a block.
 * @param {Element} $block The block element
 */
 export async function loadBlock($block) {
    const blockName = $block.getAttribute('data-block-name');
    console.log(" BLOCK NAME: ", blockName)
    try {
      const mod = await import(`/blocks/${blockName}/${blockName}.js`);
      if (mod.default) {
        await mod.default($block, blockName, document);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`failed to load module for ${blockName}`);
      console.error(err);
    }
      loadCSS(`/blocks/${blockName}/${blockName}.css`);
  }
  
  /**
   * Loads JS and CSS for all blocks in a container element.
   * @param {Element} $main The container element
   */
export async function loadBlocks($main) {
    $main
      .querySelectorAll('div.section-wrapper > div > .block')
      .forEach(async ($block) => loadBlock($block));
}


/**
 * Decorates a block.
 * @param {Element} $block The block element
 */
 export function decorateBlock($block) {
    const classes = Array.from($block.classList.values());
    const blockName = classes[0];
    if (!blockName) return;
    const $section = $block.closest('.section-wrapper');
    if ($section) {
      $section.classList.add(`${blockName}-container`.replace(/--/g, '-'));
    }
    $block.classList.add('block');
    $block.setAttribute('data-block-name', blockName);
  }
  
  /**
   * Decorates all blocks in a container element.
   * @param {Element} $main The container element
   */
export function decorateBlocks($main) {
    $main
        .querySelectorAll('div.section-wrapper > div > div')
        .forEach(($block) => decorateBlock($block));
}
  
  
  /**
   * Extracts the config from a block.
   * @param {Element} $block The block element
   * @returns {object} The block config
   */
  export function readBlockConfig($block) {
    const config = {};
    $block.querySelectorAll(':scope>div').forEach(($row) => {
      if ($row.children) {
        const $cols = [...$row.children];
        if ($cols[1]) {
          const $value = $cols[1];
          const name = toClassName($cols[0].textContent);
          let value = '';
          if ($value.querySelector('a')) {
            const $as = [...$value.querySelectorAll('a')];
            if ($as.length === 1) {
              value = $as[0].href;
            } else {
              value = $as.map(($a) => $a.href);
            }
          } else if ($value.querySelector('p')) {
            const $ps = [...$value.querySelectorAll('p')];
            if ($ps.length === 1) {
              value = $ps[0].textContent;
            } else {
              value = $ps.map(($p) => $p.textContent);
            }
          } else value = $row.children[1].textContent;
          config[name] = value;
        }
      }
    });
    return config;
  }