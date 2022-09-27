function generateFigure(pictureElement) {
  const makeFigure = document.createElement('figure');
  makeFigure.append(pictureElement);
  return makeFigure;
}

function generateParagraph(text) {
  const makeParagraph = document.createElement('p');
  makeParagraph.innerHTML = text.innerHTML;
  return makeParagraph;
}

export default async function decorate(block) {
  // Create container
  const makeBlock = document.createElement('div');
  makeBlock.classList.add('cmp-image-with-text');

  const rows = [...block.querySelectorAll(':scope > div')]
    .map((row) => row.querySelectorAll(':scope > div'));

  // Create rows
  rows.forEach((row) => {
    const makeRow = document.createElement('div');
    makeRow.classList.add('cmp-image-with-text__row');

    // Create columns
    row.forEach((column) => {
      const makeColumn = document.createElement('div');
      makeColumn.classList.add('cmp-image-with-text__column');

      // Columns without <picture> as the first child is text
      const isPicture = column.querySelector(':scope > *').nodeName === 'PICTURE';
      if (isPicture) {
        makeColumn.classList.add('cmp-image-with-text__column--image');

        const makeFigure = generateFigure(column.querySelector(':scope > :first-child'));
        makeColumn.append(makeFigure);
      } else {
        makeColumn.classList.add('cmp-image-with-text__column--copy');

        const makeParagraph = generateParagraph(column);
        makeColumn.append(makeParagraph);
      }

      // Add column to row
      makeRow.append(makeColumn);
    });

    // Add row to block
    makeBlock.append(makeRow);
  });

  block.parentNode.insertBefore(makeBlock, block);
  block.remove();
}
