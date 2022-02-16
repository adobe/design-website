export default async function decorate(block) {
  const statsComponent = block;
  statsComponent.classList.add('cmp-stats');

  const statItems = statsComponent.querySelectorAll(':scope > div');
  statItems.forEach((item) => { item.classList.add('cmp-stats__item'); });

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
