function generateHeader(headerElement) {
  const makeHeader = document.createElement('h3');
  makeHeader.classList.add('cmp-profiles__header');

  makeHeader.textContent = headerElement.textContent;
  return makeHeader;
}

function generateQuote(quoteElement) {
  const makeQuote = document.createElement('blockquote');
  const makeParagraph = document.createElement('p');
  makeQuote.classList.add('cmp-profiles__quote');

  makeParagraph.textContent = quoteElement.textContent;
  makeQuote.append(makeParagraph);
  return makeQuote;
}

function generateContent(textElement) {
  const sectionText = textElement.innerHTML.split('<br>');
  const sectionParagraphs = [...sectionText].map((section) => `<p>${section}</p>`);

  const template = document.createElement('template');
  template.innerHTML = sectionParagraphs.join('');

  const result = template.content;
  return result;
}

function generateFigure(pictureElement) {
  const makeFigure = document.createElement('figure');
  makeFigure.append(pictureElement);
  return makeFigure;
}

export default async function decorate(block) {
  // Create container
  const makeImageWithCopy = document.createElement('div');
  makeImageWithCopy.classList.add('cmp-profiles');

  const rows = [...block.querySelectorAll(':scope > div')]
    .map((row) => row.querySelectorAll(':scope > div'));

  // Create rows
  rows.forEach((row) => {
    const makeRow = document.createElement('div');
    makeRow.classList.add('cmp-profiles__row');
    let makeQuote;

    // Create columns
    row.forEach((column) => {
      const makeColumn = document.createElement('div');
      makeColumn.classList.add('cmp-profiles__column');

      // Columns without <picture> as the first child is copy
      const isText = column.querySelector(':scope > :first-child').nodeName !== 'PICTURE';
      if (isText) {
        makeColumn.classList.add('cmp-profiles__column--copy');
        // Create header and quote paragraph
        const introElements = column.querySelectorAll('h3');
        const makeHeader = generateHeader(introElements[0]);
        makeQuote = generateQuote(introElements[1]);
        makeColumn.append(makeHeader);

        const textElement = column.querySelector(':scope > p');
        const makeText = generateContent(textElement);
        makeColumn.append(makeText);
      } else {
        makeColumn.classList.add('cmp-profiles__column--image');
        const makeFigure = generateFigure(column.querySelector(':scope > :first-child'));
        makeColumn.append(makeFigure);
      }

      makeRow.append(makeColumn);
    });

    makeImageWithCopy.append(makeRow);
    makeImageWithCopy.append(makeQuote);
  });

  // If first column is text content, right-align text
  const leadingElement = makeImageWithCopy.querySelectorAll(':scope > div > :first-child > :first-child');
  leadingElement.forEach((element) => {
    if (element.nodeName !== 'FIGURE') element.parentNode.classList.add('cmp-profiles__column--align-right');
  });

  block.parentNode.insertBefore(makeImageWithCopy, block);
  block.remove();
}
