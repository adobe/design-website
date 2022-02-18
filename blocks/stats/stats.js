export default async function decorate(block) {
  const statsComponent = block;
  statsComponent.classList.add('cmp-stats');

  const statItems = statsComponent.querySelectorAll(':scope > div');

  let i = 0;
  statItems.forEach((item) => {
    i += 1;
    item.classList.add('cmp-stats__item');

    if (i < statItems.length) {
      const slash = document.createElement('span');
      slash.classList.add('cmp-stats__slash');
      slash.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="98.467" height="149.677" viewBox="0 0 98.467 149.677">
        <line id="Line_321" data-name="Line 321" x1="97.63" y2="149.129" transform="translate(0.418 0.274)" fill="none" stroke="#fff" stroke-width="1"/>
      </svg>`;
      item.parentNode.insertBefore(slash, item.nextSibling);
    }
  });

  const classNames = ['cmp-stats__item-number', 'cmp-stats__item-description', 'cmp-stats__item-tag'];
  statItems.forEach((item) => {
    const children = item.querySelectorAll(':scope > div');
    classNames.forEach((className, i) => {
      if (children[i]) children[i].classList.add(className);
    });
  });

  // on the homepage only, if there's a "stats" heading, attempt to remove it
  const headingToRemove = statsComponent.previousElementSibling;
  if (headingToRemove && window.location.pathname === '/') {
    headingToRemove.remove();
  }
}
