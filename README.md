# Adobe Design Website
The Helix project for the adobe.design website

## Environments
- Preview: https://main--design-website--adobe.hlx3.page/
- Live: https://main--design-website--adobe.hlx.live/

## Installation

```sh
npm i
```

## Tests

```sh
npm tst
```

## Local development

1. Install the [Helix CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/helix-cli`
1. Start Helix Pages Proxy: `hlx up` (opens your browser at `http://localhost:3000`)
1. Open the `design-website` directory in your favorite IDE and start coding :)


## Code to run your local server

    hlx up --pages-url="https://main--adobe-design-helix--busy-human.hlx3.page/"

    ## OR

    npm start

## Bookmarklet "Sidekick"

    https://www.hlx.live/tools/sidekick/?giturl=https://github.com/adobe/design-website&project=Design


### Importing content from another page:

*David Nuescheler*

i think there are a few examples in business-website of that, depending on what you are trying to pull it is usually a fetch to .plain.html of that URL...
an example of that is for example the article-header block, that pulls in the author image from the author page...
https://main--business-website--adobe.hlx3.page/blog/how-to/presentation-plugin-for-xd-create-easily-present-beautifully
code is here:
https://github.com/adobe/business-website/blob/main/blocks/article-header/article-header.js#L6-L23
...this of course works  to display whole sections or blocks of pages etc.

### Listing articles/pages:

David Nuescheler

a good example of that is the article-feed that you can see on the homepage... it also employs an index that is automatically updated.

https://github.com/adobe/business-website/blob/main/blocks/article-feed/article-feed.js
article-feed.js
import {
  readBlockConfig,
  buildArticleCard,
  fetchBlogArticleIndex,
  fetchVariables,
Show more
<https://github.com/adobe/business-website|adobe/business-website>adobe/business-website | Added by a bot

https://main--business-website--adobe.hlx3.page/blog/

### Sections

the horizontal rule, denotes a section in helix... which wraps the following elements (eg. blocks and default content) into a <div> which sometimes makes handling easier, if you want apply a certain behavior to a section of the page, based on its content...

think of it as a grouping of sorts... we sometimes bubble up behaviors of a block to the containing section .... think one part of a page that has a different background color, but contains multiple blocks and headings etc.

### Fragments

David Nuescheler:

this assumes a fragment block, with a URL to the page you want to include... and replaces the parent section IIRC

depends on the concept of a section-wrapper div, so you may want to adjust it if you don't have a section-wrapper

https://gist.github.com/davidnuescheler/18e1c6c1db01b1d2898731e1a414e43f

  import {
    createTag,
    decorateMain,
    loadBlocks,
  } from '../../scripts/scripts.js';

  async function decorateFragment($block) {
    const ref = $block.textContent;
    const path = new URL(ref).pathname.split('.')[0];
    const resp = await fetch(`${path}.plain.html`);
    const html = await resp.text();
    const $main = createTag('main');
    $main.innerHTML = html;
    decorateMain($main);
    loadBlocks($main);
    const $section = $block.closest('.section-wrapper');
    $section.parentNode.replaceChild($main, $section);
  }

  export default function decorate($block) {
    decorateFragment($block);
  }

## Indexes

Content must be published to propogate indexes. You must also have a XLS or sheet in your cloud target that will populate the index.

## Contributing

### Blocks

Blocks can be added the standard way Helix currently offers. Create a table in the Google Doc / Word Doc and in the first row put the name of the block. You can then add whatever number of columns or rows you need for the content.

#### HTML Helpers

There are several HTML helper functions to streamline and simplify how your blocks build and manipulate the HTML:

##### $element

The $element function takes a CSS selector as its first argument, an optional options argument, and then an optional content or children argument.

  // Creates a link with the given ID
  $element("a#link-id", { attr: { href: "https://www.adobe.com" }});

  // Creates a div with the specified classes
  $element(".heading.small");

  // Creates a table
  $element("table", [
    $element("thead", [
      $element("tr", [
        $element("th", "Name"),
        $element("th", "Favorite Color")
      ])
    ])
    $element("tbody", [
      $element("tr", [
        $element("td", "Batman"),
        $element("td", "Black")
      ])
    ])
  ])

##### $eachChild

Since the native children property on an HTMLElement is not a consistent iterable, $eachChild gives an easier interface for iterating through a list of children.

  $eachChild(document.querySelector("main"), el => console.log(el));

##### $wrap

Wraps one or more elements in the parent element. Removes the target elements from their existing parent (if applicable). Good if you have a bunch of content you want to wrap together under the same parent.

  $wrap( $element(".container"), [
    document.querySelector("h1"),
    document.querySelector("p:first-child")
  ]);

##### $remainder

Sometimes you want everything except for one element. Remainder gives you an array of everything that doesn't match the selector inside of a target:

  $remainder( "#shopping-list", ".vegetable" );

#### processDivions & Block Properties

##### Block Properties

Blocks can support the "properties" pattern when explicit configuration is needed. To use this feature, use the processDivisions function in your block decorator.

The block takes the last column of any row but the first one and looks for the first word in the column to be "Properties". If this word appears in the last column, then it will interpret the cell as a properties cell.

The block expects key-value pairs separated by colons.

  Example properties cell:
  ------------------------
  Properties
  Color: blue
  Side: left

The parser will trim extra whitespace between the keys and values.

Then, in your block decorator:

  export default function decorate( $block ) {
    const { properties } = processDivisions($block);
  }

##### processDivisions

Often times you may have divisions in a Block table that have some variability or dynamism. You can use processDivisions to get the properties block, and to check the contents of the division (table cell) to see if what kind of content is in there.

  const { image, text, properties } = processDivisions( $block, {
    image:      $div => $div.querySelector("picture"),
    text:       null
  })

The above example will find the division that contains a picture and return that div regardless of the order it appears in. This case assumes we only have 2 content cells ("columns") and will return whatever is leftover as the "text" division. Finally, if the block has a properties column, it will populate the properties object with those values. Or an empty properties object if no properties are defined.

### Pages

Pages implement a similar pattern as blocks do. We define "page types" in scripts/page-types.js. The first argument to addPageTypeDecorator is the name of the type and the second argument are the options.

Within the options you must specify ONE of a type, a path, or a test. The best one to use here is the path, generally speaking.

The path can either be an absolute path, or a relative path using an asterisk *

  // Absolute path pointing at a specific page
  addPageTypeDecorator("priacy", { path: "/about/privacy-policy" });

  // Relative path pointing at any pages under this path
  addPageTypeDecorator("article", { path: "/articles/*" });

Whatever name you specify will be the name used when resolving the JS and CSS files.

  // A page type named "article" will look for the following files
  /pages/article/article.js
  /pages/article/article.css


