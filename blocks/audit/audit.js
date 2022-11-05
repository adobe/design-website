/* eslint-disable no-console */
export default async function decorate(block) {
  const resultsDiv = block.querySelector('div');
  let resultsHTML = '';

  const scraper = await import('../../scripts/block-scraper.js');
  const data = await scraper.default();

  data.forEach((e) => {
    const blocksList = e.blocks.map((b) => `<li>${b}</li>`).join('');
    const link = e.path.includes('index.md')
      ? e.path.replace('index.md', '')
      : e.path.replace('.md', '');

    resultsHTML += `
      <section>
        <h2 id=${link}>
          <a href=${`https://adobe.design${link}`} target="_blank">${link}</a>
        </h2>
        <ul>
          ${blocksList}
        </ul>
      </section>
    `;
  });

  resultsDiv.innerHTML = resultsHTML;
}
