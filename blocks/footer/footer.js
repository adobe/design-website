/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  const resp = await fetch('/footer.plain.html');
  const html = await resp.text();
  const footer = document.createElement('div');
  footer.innerHTML = html;
  block.append(footer);
  block.parentNode.classList.add('cmp-footer');
  footer.classList.add('cmp-footer__inner-wrap');
  const links = footer.querySelectorAll('.cmp-footer__inner-wrap a');
  [...links].forEach((link) => link.classList.add('cmp-footer__link'));

  // TODO: find a better way to apply this class
  const footerNavigation = footer.querySelectorAll('.cmp-footer__inner-wrap div')[1];
  footerNavigation.classList.add('cmp-footer__nav');

  // TODO: find a better way to apply this class
  const copyright = footer.querySelector('.cmp-footer__inner-wrap div:last-of-type');
  copyright.classList.add('cmp-footer__copyright');

  // TODO: find a better way to target these elements
  const copyrightLinks = copyright.querySelectorAll('.cmp-footer__copyright a');
  [...copyrightLinks].forEach((link) => {
    link.classList.remove('cmp-footer__link');
    link.classList.add('cmp-footer__copyright-link');
  });
}
