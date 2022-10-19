export default async function getAuthorTitles(row) {
  if (row.author.indexOf(',') !== -1) {
    const authorNames = row.author.split(', ');
    const file = window.location.host === (
      'adobe.design'
      || 'main--design-website--adobe.hlx.page'
      || 'main--design-website--adobe.hlx.live'
    ) ? '/query-index.json?sheet=jobs&sheet=stories&sheet=toolkit&sheet=sitemap'
      : '/query-dev.json?sheet=jobs&sheet=stories&sheet=toolkit&sheet=sitemap';
    const resp = await fetch(file);
    const json = await resp.json();
    const authorData = json.sitemap.data.filter((e) => e.path.startsWith('/authors/'));
    const authorTitles = authorNames.map((_author, idx) => {
      const authorIdx = authorData.map((data) => data.title).indexOf(authorNames[idx]);
      return authorData[authorIdx].subtitle !== '0' ? authorData[authorIdx].subtitle : '';
    });
    return authorTitles.join('; ');
  }
  return row.authorTitle;
}
