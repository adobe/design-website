import { getMetadata } from '../../scripts/scripts.js';

const visibleCardArea = 250;

async function initAccodion() {
  const { gsap } = await import('../../scripts/gsap/gsap-core.js');
  await import('../../scripts/gsap/CSSPlugin.js');

  const container = document.body.querySelector('.cmp-accordion__group');
  const cards = document.body.querySelectorAll('.cmp-accordion-card');

  let size = 0;
  for (let i = 0; i < cards.length; i += 1) {
    const card = cards[i];
    const rect = card.getBoundingClientRect();
    card.dataset.index = i;
    card.style.position = 'absolute';
    card.style.top = `${i * visibleCardArea}px`;
    if (i === cards.length - 1) {
      size += rect.height;
    }

    card.addEventListener('click', () => {
      const newCardHeight = rect.height - visibleCardArea - 1;

      const lastCardRect = cards[cards.length - 1].getBoundingClientRect();
      const lastCardHeight = lastCardRect.height;

      for (let j = 0; j < cards.length; j += 1) {
        if (j > i) {
          gsap.to(cards[j], {
            duration: 1,
            y: newCardHeight,
          });
        } else {
          gsap.to(cards[j], {
            duration: 1,
            y: 0,
          });
        }
      }

      console.log(container.style.height);

      console.log(lastCardHeight, newCardHeight, visibleCardArea * (cards.length - 1));
      const newHeight = (visibleCardArea * (cards.length - 1)) + newCardHeight + lastCardHeight;
      console.log(newHeight);

      gsap.to(container, {
        duration: 1,
        height: newHeight,
      });
    });
  }

  size += visibleCardArea * (cards.length - 1);
  container.style.height = `${size}px`;
}

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
    // calculate height...

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

  setTimeout(() => initAccodion(), 1000);
}
