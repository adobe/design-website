export default async function getAuthorTitles(row) {
  if (row.author.indexOf(',') !== -1) {
    const authorNames = row.author.split(', ');
    const resp = await fetch('/query-index.json?sheet=sitemap');
    const json = await resp.json();
    const authorData = json.data.filter((e) => e.path.startsWith('/authors/'));
    const authorTitles = authorNames.map((_author, idx) => {
      const authorIdx = authorData.map((data) => data.title).indexOf(authorNames[idx]);
      return authorData[authorIdx].subtitle !== '0' ? authorData[authorIdx].subtitle : '';
    });
    return authorTitles.join('; ');
  }
  return row.authorTitle;
}
