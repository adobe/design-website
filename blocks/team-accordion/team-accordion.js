import { getMetadata } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const accordionContainer = document.querySelector('.team-accordion-container');
  accordionContainer.firstChild.classList.add('cmp-accordion-container__inner');
  const pageTitle = accordionContainer.querySelector('h1');
  const pageTitleClone = pageTitle.cloneNode(true);
  accordionContainer.insertBefore(pageTitleClone, accordionContainer.firstChild);
  pageTitle.remove();

  const accordionGroup = block;
  accordionGroup.classList.add('cmp-accordion__group');

  const bgColorPairs = getMetadata('team-accordion-colors').split(',').map((e) => e.split('|').map((x) => x.trim()));
  bgColorPairs.forEach((pair, index) => {
    accordionGroup.style.setProperty(`--bg-pair${index + 1}-color1`, pair[0]);
    accordionGroup.style.setProperty(`--bg-pair${index + 1}-color2`, pair[1]);
  });

  const accordionCards = accordionGroup.querySelectorAll(':scope > div');
  accordionCards.forEach((card, index) => {
    card.classList.add('cmp-accordion-card');
    const cardTitleAndMedia = card.children[0].children;
    const cardBodyText = card.children[1].textContent;
    const cardBodyContent = document.createElement('p');
    cardBodyContent.classList.add('cmp-accordion-card__body');
    cardBodyContent.innerHTML = cardBodyText;
    card.innerHTML = '';
    card.append(...cardTitleAndMedia, cardBodyContent);
    card.querySelectorAll('img').forEach((cardImg) => cardImg.parentNode.classList.add('cmp-accordion-card__media-parent'));
    card.classList.add(`color-pair-${index + 1}`);
  });

  const orgHeadline = accordionGroup.nextElementSibling;
  if (orgHeadline.tagName === 'H2') {
    orgHeadline.classList.add('cmp-org__headline');
  }

  const nextSiblings = (elem) => {
    const siblings = [];
    // eslint-disable-next-line no-cond-assign, no-param-reassign
    while (elem = elem.nextElementSibling) {
      siblings.push(elem);
    }
    return siblings;
  };

  const orgTextElems = nextSiblings(orgHeadline);
  const orgContainer = document.createElement('div');
  orgContainer.classList.add('cmp-org__container');
  orgContainer.append(orgHeadline);
  orgContainer.append(...orgTextElems);
  document.querySelector('.cmp-accordion-container__inner').append(orgContainer);
}
