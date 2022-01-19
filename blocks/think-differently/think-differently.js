export default async function decorate(block) {
  block.classList.add('cmp-stats');
  const statsInnerWrap = block.firstChild;
  statsInnerWrap.classList.add('cmp-stats__inner-wrap');

  statsInnerWrap.querySelectorAll('h2').forEach((el) => el.classList.add('cmp-stats__heading'));
}
