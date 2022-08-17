export default function formatCardByline(row) {
  const authors = row.author.split(', ');
  const authorTitles = row.authorTitle.split('; ');
  let cardByline = '';
  authors.forEach((author, idx) => {
    cardByline += `
      ${author ? `<p class="cmp-stories-card__author">${author}</p>` : ''}
      ${authorTitles[idx] ? `<p class="cmp-stories-card__author-title">${authorTitles[idx]}</p>` : ''}
    `;
  });
  return cardByline;
}
