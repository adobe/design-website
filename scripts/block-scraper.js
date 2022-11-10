const CONTENT_PATHS = [
  '/design-circle/',
  '/jobs/',
  '/stories/',
  '/team/',
  '/toolkit/',
];
const BLOCK_REGEX = /(?<=<table>\n\s{1,}<tr>\n\s{1,}<td[\scolspan="2"]*>)([\w\s]{1,})|(?<=[+x-]{1,}\n\|\s)([A-Za-z0-9*-]+)([\s–][A-Za-z]+)*(?=[\s|]{1,}\|\n[+x-]{1,})/g;

export default async function blockScraper() {
  // Retrieve all relevant pages from sitemap
  const resp = await fetch('/query-index.json?sheet=jobs&sheet=stories&sheet=toolkit&sheet=sitemap');
  const json = await resp.json();
  const byContentPath = (value) => CONTENT_PATHS.some((element) => value.startsWith(element));
  const allContentPages = json.sitemap.data.filter((p) => byContentPath(p.path));
  allContentPages.unshift({ path: '/' });

  // Audit Markdown file for each page and find blocks used
  const result = await Promise.all(allContentPages
    .map(async (page) => {
      const path = page.path.endsWith('/') ? `${page.path}index.md` : `${page.path}.md`;
      const response = await fetch(path);
      const text = await response.text();
      const allBlocks = [...text.matchAll(BLOCK_REGEX)];
      const uniqueBlocks = [...new Set(allBlocks.map((blocks) => blocks[0]))];

      return { path, blocks: uniqueBlocks };
    }));

  return result;
}
