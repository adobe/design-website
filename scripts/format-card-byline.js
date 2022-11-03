export default function formatCardByline(row) {
  const authorArray = row.author.split(', ');
  const titleArray = typeof row.authorTitle === 'object'
    ? row.authorTitle
    : [row.authorTitle];
  let cardByline = '';

  authorArray.forEach((author, idx) => {
    cardByline += `
      ${author ? `<p class="cmp-stories-card__author">${author}</p>` : ''}
      ${titleArray[idx] ? `<p class="cmp-stories-card__author-title">${titleArray[idx]}</p>` : ''}
    `;
  });

  return cardByline;
}
