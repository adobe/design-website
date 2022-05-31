# Adobe Design Website
The Helix project for the adobe.design website

## Environments
- Preview: https://main--design-website--adobe.hlx3.page/
- Live: https://main--design-website--adobe.hlx.live/
- Production: https://adobe.design/

## Updating Helix CLI
```sh
npm install -g @adobe/helix-cli@latest
```

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

Make sure you are using Helix version 14+

```sh
hlx up
```
*OR*
```sh
npm start
```

If you are using Helix < 13 then your command will look like this (replace subdomain with the actual domain):

```sh
hlx up --pages-url="https://SUBDOMAIN.hlx3.page/"
```

## Bookmarklet "Sidekick"

    https://www.hlx.live/tools/sidekick/?giturl=https://github.com/adobe/design-website&project=Design

## Indexes

Content must be published to propogate indexes. You must also have a XLS or sheet in your cloud target that will populate the index.

### Blocks

Blocks can be added the standard way Helix currently offers. Create a table in the Google Doc / Word Doc and in the first row put the name of the block. You can then add whatever number of columns or rows you need for the content.

### Pages

Pages implement a similar pattern as blocks do. We define "page types" in `scripts/page-types.js`. The first argument to `addPageTypeDecorator` is the name of the type and the second argument are the options.

Within the options you must specify ONE of a type, a path, or a test. The best one to use here is the path, generally speaking.

The path can either be an absolute path, or a relative path using an asterisk *

```js
// Absolute path pointing at a specific page
addPageTypeDecorator("priacy", { path: "/about/privacy-policy" });

// Relative path pointing at any pages under this path
addPageTypeDecorator("article", { path: "/articles/*" });
```

Whatever name you specify will be the name used when resolving the JS and CSS files.

```js
// A page type named "article" will look for the following files:
/pages/article/article.js
/pages/article/article.css
```
