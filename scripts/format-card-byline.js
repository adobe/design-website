export default function formatCardByline(row) {
  const authors = row.author.split(', ');
  const semicolonsExcludingHTMLCharacters = /(?<!&#[a-z0-9]{1,});/;
  const authorTitles = row.authorTitle.split(semicolonsExcludingHTMLCharacters);
  let cardByline = '';
  authors.forEach((author, idx) => {
    cardByline += `
      ${author ? `<p class="cmp-stories-card__author">${author}</p>` : ''}
      ${authorTitles[idx] ? `<p class="cmp-stories-card__author-title">${authorTitles[idx]}</p>` : ''}
    `;
  });
  return cardByline;
}
