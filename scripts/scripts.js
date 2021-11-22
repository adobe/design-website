/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { setPageLoading, pageDoneLoading } from "./page-loader.js";
setPageLoading();

import decorateHeader from "./global-header.js";
import decorateFooter from "./global-footer.js";
import { runPageTypeDecorators } from "./page-type-decorator.js";
import { decorateBackground } from "./background.js";
import registerPageTypes from "./page-types.js";
import { loadCSS } from "./importer.js";
import { decorateBlocks, loadBlocks } from "./blocks.js";

/**
 * See if there's a way to get the loader in first
 * <link rel="stylesheet" type="text/css" href="/styles/page-loader.css"/>
 * <script src="/scripts/page-loader.js"></script>
 */

/**
 * Adds one or more URLs to the dependencies for publishing.
 * @param {string|[string]} url The URL(s) to add as dependencies
 */
export function addPublishDependencies(url) {
  const urls = Array.isArray(url) ? url : [url];
  window.hlx = window.hlx || {};
  if (window.hlx.dependencies && Array.isArray(window.hlx.dependencies)) {
    window.hlx.dependencies.concat(urls);
  } else {
    window.hlx.dependencies = urls;
  }
}



/**
 * Wraps each section in an additional {@code div}.
 * @param {[Element]} $sections The sections
 */
function wrapSections($sections) {
  $sections.forEach(($div) => {
    if (!$div.id) {
      const $wrapper = document.createElement('div');
      $wrapper.className = 'section-wrapper';
      $div.parentNode.appendChild($wrapper);
      $wrapper.appendChild($div);
    }
  });
}


/**
 * Official Google WEBP detection.
 * @param {Function} callback The callback function
 */
function checkWebpFeature(callback) {
  const webpSupport = sessionStorage.getItem('webpSupport');
  if (!webpSupport) {
    const kTestImages = 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
    const img = new Image();
    img.onload = () => {
      const result = (img.width > 0) && (img.height > 0);
      window.webpSupport = result;
      sessionStorage.setItem('webpSupport', result);
      callback();
    };
    img.onerror = () => {
      sessionStorage.setItem('webpSupport', false);
      window.webpSupport = false;
      callback();
    };
    img.src = `data:image/webp;base64,${kTestImages}`;
  } else {
    window.webpSupport = (webpSupport === 'true');
    callback();
  }
}

/**
 * Build figcaption element
 * @param {Element} pEl The original element to be placed in figcaption.
 * @returns figCaptionEl Generated figcaption
 */
 export function buildCaption(pEl) {
  const figCaptionEl = document.createElement('figcaption');
  pEl.classList.add('caption');
  figCaptionEl.append(pEl);
  return figCaptionEl;
}

/**
 * Build figure element
 * @param {Element} blockEl The original element to be placed in figure.
 * @returns figEl Generated figure
 */
 export function buildFigure(blockEl) {
  const figEl = document.createElement('figure');
  figEl.classList.add('figure');
  // content is picture only, no caption or link
  if (blockEl.firstChild) {
    if (blockEl.firstChild.nodeName === 'PICTURE' || blockEl.firstChild.nodeName === 'VIDEO') {
      figEl.append(blockEl.firstChild);
    } else if (blockEl.firstChild.nodeName === 'P') {
      const pEls = Array.from(blockEl.children);
      pEls.forEach((pEl) => {
        if (pEl.firstChild) {
          if (pEl.firstChild.nodeName === 'PICTURE' || pEl.firstChild.nodeName === 'VIDEO') {
            figEl.append(pEl.firstChild);
          } else if (pEl.firstChild.nodeName === 'EM') {
            const figCapEl = buildCaption(pEl);
            figEl.append(figCapEl);
          } else if (pEl.firstChild.nodeName === 'A') {
            const picEl = figEl.querySelector('picture');
            if (picEl) {
              pEl.firstChild.textContent = '';
              pEl.firstChild.append(picEl);
            }
            figEl.prepend(pEl.firstChild);
          }
        }
      });
    // catch link-only figures (like embed blocks);
    } else if (blockEl.firstChild.nodeName === 'A') {
      blockEl.firstChild.target = "_blank"
      figEl.append(blockEl.firstChild);
    }
  }
  return figEl;
}


/**
 * Returns an image URL with optimization parameters
 * @param {string} url The image URL
 */
export function getOptimizedImageURL(src) {
  const url = new URL(src, window.location.href);
  let result = src;
  const { pathname, search } = url;
  if (pathname.includes('media_')) {
    const usp = new URLSearchParams(search);
    usp.delete('auto');
    if (!window.webpSupport) {
      if (pathname.endsWith('.png')) {
        usp.set('format', 'png');
      } else if (pathname.endsWith('.gif')) {
        usp.set('format', 'gif');
      } else {
        usp.set('format', 'pjpg');
      }
    } else {
      usp.set('format', 'webply');
    }
    result = `${src.split('?')[0]}?${usp.toString()}`;
  }
  return (result);
}

/**
 * Resets an elelemnt's attribute to the optimized image URL.
 * @see getOptimizedImageURL
 * @param {Element} $elem The element
 * @param {string} attrib The attribute
 */
function resetOptimizedImageURL($elem, attrib) {
  const src = $elem.getAttribute(attrib);
  if (src) {
    const oSrc = getOptimizedImageURL(src);
    if (oSrc !== src) {
      $elem.setAttribute(attrib, oSrc);
    }
  }
}

/**
 * WEBP Polyfill for older browser versions.
 * @param {Element} $elem The container element
 */
export function webpPolyfill($elem) {
  if (!window.webpSupport) {
    $elem.querySelectorAll('img').forEach(($img) => {
      resetOptimizedImageURL($img, 'src');
    });
    $elem.querySelectorAll('picture source').forEach(($source) => {
      resetOptimizedImageURL($source, 'srcset');
    });
  }
}

/**
 * Normalizes all headings within a container element.
 * @param {Element} $elem The container element
 * @param {[string]]} allowedHeadings The list of allowed headings (h1 ... h6)
 */
export function normalizeHeadings($elem, allowedHeadings) {
  const allowed = allowedHeadings.map((h) => h.toLowerCase());
  $elem.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((tag) => {
    const h = tag.tagName.toLowerCase();
    if (allowed.indexOf(h) === -1) {
      // current heading is not in the allowed list -> try first to "promote" the heading
      let level = parseInt(h.charAt(1), 10) - 1;
      while (allowed.indexOf(`h${level}`) === -1 && level > 0) {
        level -= 1;
      }
      if (level === 0) {
        // did not find a match -> try to "downgrade" the heading
        while (allowed.indexOf(`h${level}`) === -1 && level < 7) {
          level += 1;
        }
      }
      if (level !== 7) {
        tag.outerHTML = `<h${level}>${tag.textContent}</h${level}>`;
      }
    }
  });
}

/**
 * Decorates the main element.
 * @param {Element} $main The main element
 */
export function decorateMain($main) {
  wrapSections($main.querySelectorAll(':scope > div'));
  checkWebpFeature(() => {
    webpPolyfill($main);
  });
  decorateBlocks($main);
}

/**
 * Adds the favicon.
 * @param {string} href The favicon URL
 */
export function addFavIcon(href) {
  const $link = document.createElement('link');
  $link.rel = 'icon';
  $link.type = 'image/svg+xml';
  $link.href = href;
  const $existingLink = document.querySelector('head link[rel="icon"]');
  if ($existingLink) {
    $existingLink.parentElement.replaceChild($link, $existingLink);
  } else {
    document.getElementsByTagName('head')[0].appendChild($link);
  }
}

/**
 * Sets the trigger for the LCP (Largest Contentful Paint) event.
 * @see https://web.dev/lcp/
 * @param {Document} doc The document
 * @param {Function} postLCP The callback function
 */
function setLCPTrigger(doc, postLCP) {
  // const $lcpCandidate = doc.querySelector('main > div:first-of-type img');
  // if ($lcpCandidate) {
  //   if ($lcpCandidate.complete) {
  //     postLCP();
  //   } else {
  //     $lcpCandidate.addEventListener('load', () => {
  //       postLCP();
  //     });
  //     $lcpCandidate.addEventListener('error', () => {
  //       postLCP();
  //     });
  //   }
  // } else {
  //   postLCP();
  // }
  setTimeout( postLCP, 1000 )
}

/**
 * Decorates the page.
 * @param {Window} win The window
 */
async function decoratePage(win = window) {
  try {
    const doc = win.document;
    const $main = doc.querySelector('main');
    decorateBackground();
    decorateHeader();
    if ($main) {
      decorateMain($main);
      doc.querySelector('body').classList.add('appear');
      setLCPTrigger(doc, async () => {
        // post LCP actions go here
        await loadBlocks($main);
        runPageTypeDecorators();
        loadCSS('/styles/lazy-styles.css');
        addFavIcon('/favicon.svg');
        pageDoneLoading();
      });
    }
    decorateFooter();
  } catch (err) {
    console.error(err);
    pageDoneLoading();
  }
}

let language;

const LANG = {
  EN: 'en',
  DE: 'de',
  FR: 'fr',
  KO: 'ko',
  ES: 'es',
  IT: 'it',
  JP: 'jp',
  BR: 'br',
};

export function getLanguage() {
  if (language) return language;
  language = LANG.EN;
  const segs = window.location.pathname.split('/');
  if (segs && segs.length > 0) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [, value] of Object.entries(LANG)) {
      if (value === segs[1]) {
        language = value;
        break;
      }
    }
  }
  return language;
}

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
 * Extracts the config from a block.
 * @param {Element} block The block element
 * @returns {object} The block config
 */
 export function readBlockConfig(block) {
  const config = {};
  block.querySelectorAll(':scope>div').forEach((row) => {
    if (row.children) {
      const cols = [...row.children];
      if (cols[1]) {
        const valueEl = cols[1];
        const name = toClassName(cols[0].textContent);
        let value = '';
        if (valueEl.querySelector('a')) {
          const aArr = [...valueEl.querySelectorAll('a')];
          if (aArr.length === 1) {
            value = aArr[0].href;
            aArr[0].target = "_blank";
          } else {
            value = aArr.map(
              (a) => {
                a.href;
                a.target = "_blank";
              });
          }
        } else if (valueEl.querySelector('p')) {
          const pArr = [...valueEl.querySelectorAll('p')];
          if (pArr.length === 1) {
            value = pArr[0].textContent;
          } else {
            value = pArr.map((p) => p.textContent);
          }
        } else value = row.children[1].textContent;
        config[name] = value;
      }
    }
  });
  return config;
}

/**
 * Build article card
 * @param {Element} article The article data to be placed in card.
 * @returns card Generated card
 */
 export function buildArticleCard(article, type = 'article') {
  const {
    title, description, image, imageAlt, category,
  } = article;

  const path = article.path.split('.')[0];

  const picture = createOptimizedPicture(image, imageAlt || title, type === 'featured-article', [{ width: '750' }]);
  const pictureTag = picture.outerHTML;
  const card = document.createElement('a');
  card.className = `${type}-card`;
  card.href = path;
  card.innerHTML = `<div class="${type}-card-image">
      ${pictureTag}
    </div>
    <div class="${type}-card-body">
      <p class="${type}-card-category">
        <a href="${window.location.origin}${getRootPath()}/categories/${category}">${category}</a>
      </p>
      <h3>${title}</h3>
      <p>${description}</p>
    </div>`;
  return card;
}

/**
 * fetches the string variables.
 * @returns {object} localized variables
 */

 export async function fetchPlaceholders() {
  const resp = await fetch(`${getRootPath()}/placeholders.json`);
  const json = await resp.json();
  const placeholders = {};
  json.data.forEach((placeholder) => {
    placeholders[placeholder.Key] = placeholder.Text;
  });
  return (placeholders);
}

/**
 * fetches blog article index.
 * @returns {object} index with data and path lookup
 */

 export async function fetchBlogArticleIndex() {
  const pageSize = 1000;
  window.blogIndex = window.blogIndex || {
    data: [],
    byPath: {},
    offset: 0,
    complete: false,
  };
  if (window.blogIndex.complete) return (window.blogIndex);
  const index = window.blogIndex;
  const resp = await fetch(`http://localhost:3000/query-index.json?limit=${pageSize}&offset=${index.offset}`);
  const json = await resp.json();
  const complete = (json.limit + json.offset) === json.total;
  json.data.forEach((post) => {
    index.data.push(post);
    index.byPath[post.path.split('.')[0]] = post;
  });
  index.complete = complete;
  index.offset = json.offset + pageSize;
  return (index);
}

/*
 * lighthouse performance instrumentation helper
 * (needs a refactor)
 */

export function stamp(message) {
  if (window.name.includes('performance')) {
    debug(`${new Date() - performance.timing.navigationStart}:${message}`);
  }
}

stamp('start');

function registerPerformanceLogger() {
  try {
    const polcp = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      stamp(JSON.stringify(entries));
      debug(entries[0].element);
    });
    polcp.observe({ type: 'largest-contentful-paint', buffered: true });

    const pols = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      stamp(JSON.stringify(entries));
      debug(entries[0].sources[0].node);
    });
    pols.observe({ type: 'layout-shift', buffered: true });

    const pores = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        stamp(`resource loaded: ${entry.name} - [${Math.round(entry.startTime + entry.duration)}]`);
      });
    });

    pores.observe({ type: 'resource', buffered: true });
  } catch (e) {
    // no output
  }
}

/**
 * Returns the language dependent root path
 * @returns {string} The computed root path
 */
 export function getRootPath() {
  const loc = getLanguage();
  if (loc === LANG.EN) {
    return '/blog';
  }
  return `/${loc}/blog`;
}

// First register the decorators
registerPageTypes();

// Second apply the decoration
decoratePage(window);
