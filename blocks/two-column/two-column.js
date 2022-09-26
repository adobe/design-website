function generateFigure(pictureElement) {
  const makeFigure = document.createElement('figure');
  makeFigure.append(pictureElement);
  return makeFigure;
}

export default async function decorate(block) {
  // Create container
  const makeTwoColumn = document.createElement('div');
  makeTwoColumn.classList.add('cmp-two-column');

  const rows = [...block.querySelectorAll(':scope > div')]
    .map((row) => row.querySelectorAll(':scope > div'));

  // Create rows
  rows.forEach((row) => {
    const makeRow = document.createElement('div');
    makeRow.classList.add('cmp-two-column__row');

    // Create columns
    row.forEach((column) => {
      const makeColumn = document.createElement('div');
      makeColumn.classList.add('cmp-two-column__column');

      // Columns without <picture> as the first child is copy
      const isPicture = column.querySelector(':scope > *') && column.querySelector(':scope > *').nodeName === 'PICTURE';
      if (isPicture) {
        makeColumn.classList.add('cmp-two-column__column--image');

        const makeFigure = generateFigure(column.querySelector(':scope > :first-child'));
        makeColumn.append(makeFigure);
      } else {
        makeColumn.classList.add('cmp-two-column__column--copy');

        makeColumn.append(column);
      }

      makeRow.append(makeColumn);
    });

    makeTwoColumn.append(makeRow);
  });

  // If first column is text content, right-align text
  const leadingElement = makeTwoColumn.querySelectorAll(':scope > div > :first-child > :first-child');
  leadingElement.forEach((element) => {
    if (element.nodeName !== 'FIGURE') element.parentNode.classList.add('cmp-two-column__column--align-right');
  });

  block.parentNode.insertBefore(makeTwoColumn, block);
  block.remove();
}
