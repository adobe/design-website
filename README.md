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

## Indexes

Content must be published to propogate indexes. You must also have a XLS or sheet in your cloud target that will populate the index.