import { getMetadata, loadScript } from '../../scripts/scripts.js';

const visibleCardArea = 250;

class Accordion {
  container;

  cars;

  gsap;

  selected = 0;

  init() {
    this.container = document.body.querySelector('.cmp-accordion__group');
    this.cards = document.body.querySelectorAll('.cmp-accordion-card');

    let size = 0;

    for (let i = 0; i < this.cards.length; i += 1) {
      const card = this.cards[i];
      const rect = card.getBoundingClientRect();
      console.log(rect);
      card.dataset.index = i;
      card.style.position = 'absolute';
      card.style.top = `${i * visibleCardArea}px`;
      if (i === this.cards.length - 1) {
        size += rect.height;
      }

      //card.addEventListener('mouseout', () => this.cardMouseOut(i));
      //card.addEventListener('mouseover', () => this.cardMouseOver(i));
      card.addEventListener('click', () => this.cardClick(i));
    }

    size += visibleCardArea * (this.cards.length - 1);
    this.container.style.height = `${size}px`;
  }

  cardMouseOver(i) {
    const { gsap } = window;
    gsap.to(this.cards[i], {
      duration: 0.2,
      y: -50,
      ease: 'quad.out',
    });
  }

  cardMouseOut(i) {
    const { gsap } = window;
    gsap.to(this.cards[i], {
      duration: 0.2,
      y: 0,
      ease: 'quad.out',
    });
  }

  cardClick(i) {
    const { gsap } = window;

    this.selected = i;

    const card = this.cards[i];
    const rect = card.getBoundingClientRect();

    const newCardHeight = rect.height - visibleCardArea - 1;
    const lastCardRect = this.cards[this.cards.length - 1].getBoundingClientRect();
    const lastCardHeight = lastCardRect.height;

    for (let j = 0; j < this.cards.length; j += 1) {
      if (j > i) {
        gsap.to(this.cards[j], {
          duration: 1,
          y: newCardHeight,
        });
      } else {
        gsap.to(this.cards[j], {
          duration: 1,
          y: 0,
        });
      }
    }

    let newHeight = (visibleCardArea * (this.cards.length - 1)) + newCardHeight + lastCardHeight;
    if (i === this.cards.length - 1) {
      newHeight = (visibleCardArea * (this.cards.length - 1)) + lastCardHeight;
    }

    gsap.to(this.container, {
      duration: 1,
      height: newHeight,
    });

    console.log(rect.top);
    const newTop = rect.top + (i * visibleCardArea);

    gsap.to(window, {
      duration: 1,
      scrollTo: newTop,
    });
  }
}

async function loadAccordion(accordion) {
  const GSAP_URL = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js';
  const GSAP_CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/CSSRulePlugin.min.js';
  const GSAP_SCROLL_URL = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollToPlugin.min.js';

  loadScript(GSAP_URL, () => {
    loadScript(GSAP_SCROLL_URL, () => {
      loadScript(GSAP_CSS_URL, () => {
        accordion.init();
      });
    });
  });
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

  const accordion = new Accordion();
  setTimeout(() => loadAccordion(accordion), 1000);
}
