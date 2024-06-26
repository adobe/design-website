export default async function getAuthorTitles(row) {
  if (row.author.indexOf(',') !== -1) {
    const authorNames = row.author.split(', ');
    const file = '/query-index.json?sheet=jobs&sheet=stories&sheet=toolkit&sheet=sitemap';
    /*
    const file = window.location.host === (
      'adobe.design'
      || 'main--design-website--adobe.hlx.page'
      || 'main--design-website--adobe.hlx.live'
    ) ? '/query-index.json?sheet=jobs&sheet=stories&sheet=toolkit&sheet=sitemap'
      : '/query-dev.json?sheet=jobs&sheet=stories&sheet=toolkit&sheet=sitemap';
      */
    const resp = await fetch(file);
    const json = await resp.json();
    const authorData = json.sitemap.data.filter((e) => e.path.startsWith('/authors/'));
    const authorTitles = authorNames.map((_author, idx) => {
      const authorIdx = authorData.map((data) => data.title).indexOf(authorNames[idx]);
      return authorData[authorIdx].subtitle !== '0' ? authorData[authorIdx].subtitle : '';
    });
    // Return two or more author titles in array
    return authorTitles;
  }

  // Return single author title, or no title, as string
  return row.authorTitle;
}
