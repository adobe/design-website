import { getMetadata, loadScript } from '../../scripts/scripts.js';

const visibleCardArea = 250;

class Accordion {
  container;

  cars;

  gsap;

  selected = -1;

  scrolling = false;

  init() {
    this.container = document.body.querySelector('.cmp-accordion__group');
    this.cards = document.body.querySelectorAll('.cmp-accordion-card');

    for (let i = 0; i < this.cards.length; i += 1) {
      const card = this.cards[i];
      card.addEventListener('mouseout', () => this.cardMouseOut(i));
      card.addEventListener('mouseover', () => this.cardMouseOver(i));
      card.addEventListener('click', () => this.cardClick(i));
    }

    this.resize();

    window.addEventListener('wheel', (e) => this.handleMousewheel(e));
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.selected = -1;
    this.desktopSize();
  }

  desktopSize() {
    let size = 0;

    for (let i = 0; i < this.cards.length; i += 1) {
      const card = this.cards[i];
      const rect = card.getBoundingClientRect();
      card.dataset.index = i;
      card.style.position = 'absolute';
      card.style.top = `${i * visibleCardArea}px`;
      if (i === this.cards.length - 1) {
        size += rect.height;
      }
    }

    size += visibleCardArea * (this.cards.length - 1);
    this.container.style.height = `${size}px`;
  }

  handleMousewheel(e) {
    if (this.scrolling) {
      return false;
    }

    if (this.selected !== -1) {
      if (e.deltaY > 0 && this.selected < this.cards.length) {
        if (this.selected === this.cards.length - 1) {
          this.cardClick(-1);
        } else {
          this.cardClick(this.selected + 1);
        }
      } else if (e.deltaY < 0 && this.selected > -1) {
        if (this.selected === 0) {
          this.cardClick(-1);
        } else {
          this.cardClick(this.selected - 1);
        }
      }
    }

    this.scrolling = true;

    setTimeout(() => {
      this.scrolling = false;
    }, 1000);

    return false;
  }

  cardMouseOver(i) {
    const { gsap } = window;
    if (this.selected === i || gsap.isTweening(this.cards[i])) {
      return;
    }
    gsap.to(this.cards[i], {
      duration: 0.2,
      y: '-=50',
      ease: 'quad.out',
    });
  }

  cardMouseOut(i) {
    const { gsap } = window;
    if (this.selected === i || gsap.isTweening(this.cards[i])) {
      return;
    }
    gsap.to(this.cards[i], {
      duration: 0.2,
      y: '+=50',
      ease: 'quad.out',
    });
  }

  cardClick(i) {
    console.log(i);

    const { gsap } = window;
    this.selected = i;

    const lastCardRect = this.cards[this.cards.length - 1].getBoundingClientRect();
    const lastCardHeight = lastCardRect.height;

    if (i === -1) {
      // close cards
      for (let j = 0; j < this.cards.length; j += 1) {
        gsap.killTweensOf(this.cards[j]);
        gsap.to(this.cards[j], {
          duration: 1,
          y: 0,
        });
      }

      // reset container height
      gsap.killTweensOf(this.container);
      gsap.to(this.container, {
        duration: 1,
        height: ((this.cards.length - 1) * visibleCardArea) + lastCardHeight,
      });
      return;
    }

    // open card
    const card = this.cards[i];
    const rect = card.getBoundingClientRect();
    const newCardHeight = rect.height - visibleCardArea - 1;

    for (let j = 0; j < this.cards.length; j += 1) {
      gsap.killTweensOf(this.cards[j]);
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

    // adjust container height
    let newHeight = (visibleCardArea * (this.cards.length - 1)) + newCardHeight + lastCardHeight;
    if (i === this.cards.length - 1) {
      newHeight = (visibleCardArea * (this.cards.length - 1)) + lastCardHeight;
    }

    gsap.killTweensOf(this.container);
    gsap.to(this.container, {
      duration: 1,
      height: newHeight,
    });

    // scroll window
    const { container } = this;
    const containerRect = container.getBoundingClientRect();
    const newTop = document.documentElement.scrollTop + containerRect.top + (i * visibleCardArea);

    gsap.killTweensOf(window);
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
  setTimeout(() => loadAccordion(accordion), 4000);
}