import { $wrap, $element, $scrollAnimation } from '../../scripts/helpers.js';

export default function decorate() {
  const team = document.querySelector('body > main');
  team.classList.add('teams');
  /* team.forEach(t => {
      if( t.querySelector("p") ) {
        t.classList.add("article-picture");
      }
    }); */

  /*
    =====================WARNING======================
    This page oranization is dependant on a few things

    -P tags are not contained in the title section
    -H3s are not included in the page until the teams cards
    -All team-cards start with an H3
    -The First H2 ends the Team Cards section

    If any of these change, this function will need to be updated
    */

  const content = team.querySelector(':scope > div:first-child > div:first-child');

  const titleDiv = $element('.title-content');

  const headDiv = $element('.head-content');
  const teamCardsDiv = $element('.team-cards');
  const endDiv = $element('.foot-content');

  let pageSection = 0;

  content.querySelectorAll(':scope > *').forEach((element) => {
    if (pageSection === 0) {
      if (element.nodeName !== 'DIV') pageSection += 1;
    }
    if (pageSection === 1) {
      if (element.nodeName !== 'P') {
        titleDiv.appendChild(element);
      } else pageSection += 1;
    }
    if (pageSection === 2) {
      if (element.nodeName !== 'H3') {
        headDiv.appendChild(element);
      } else pageSection += 1;
    }
    if (pageSection === 3) {
      if (element.nodeName !== 'H2') {
        teamCardsDiv.appendChild(element);
      } else pageSection += 1;
    }
    if (pageSection === 4) {
      endDiv.appendChild(element);
    }
  });

  const bodyDiv = $wrap($element('.content'), [headDiv, teamCardsDiv, endDiv]);

  content.append(titleDiv);
  content.append(bodyDiv);

  // Organizing Head Div content
  const shiftedContent = $element('.head-text');
  let firstElement;
  headDiv.querySelectorAll('p').forEach((element) => {
    if (firstElement) {
      shiftedContent.append(element);
    } else {
      firstElement = element;
      element.classList.add('title');
    }
  });
  const animateWhatWeDo = headDiv.querySelector('h2');
  animateWhatWeDo.classList.add('js-scroll', 'fade-in');
  firstElement.insertAdjacentElement('afterend', shiftedContent);

  /** Build Accordian Cards */
  // Oranizing individual teams cards
  let card = 0;
  let teamCard = $element('.team-card');
  teamCard.classList.add(`card-${card}`);
  let leftBlock = document.createElement('div');
  let rightBlock = document.createElement('div');

  teamCardsDiv.querySelectorAll(':scope > *').forEach(
    (element) => {
      if (card !== 0 && element.nodeName === 'H3') {
        rightBlock.append(
          $element('a.view-jobs', { attr: { href: '/jobs/' } }, 'VIEW OUR JOB OPENINGS'),
        );
        teamCard = $wrap(teamCard, [leftBlock, rightBlock]);
        teamCardsDiv.append(teamCard);
        teamCard = $element('.team-card');
        teamCard.classList.add(`card-${card}`);
        leftBlock = document.createElement('div');
        rightBlock = document.createElement('div');
      }

      if (element.nodeName === 'H3') {
        teamCard.append($wrap($element('.card-header'), [$element('.chevron-down'), element]));
        card += 1;
      } else if (element.nodeName === 'P') {
        if (element.innerHTML.includes('picture')) {
          leftBlock.append(element);
        } else { rightBlock.append(element); }
      } else {
        leftBlock.append(element);
      }
    },
  );
  rightBlock.append($element('.view-jobs', { attr: { href: '/jobs/' } }, 'VIEW OUR JOB OPENINGS'));
  teamCard = $wrap(teamCard, [leftBlock, rightBlock]);
  teamCardsDiv.append(teamCard);

  // Organize Foot content
  const resourcesDiv = $element('.resources-section');
  const resources = $element('.resources');
  resources.classList.add('js-scroll', 'fade-in');

  let section = 0;
  let imgCount = 1;

  endDiv.querySelectorAll(':scope > *').forEach((element) => {
    if (element.nodeName === 'H2' || element.nodeName === 'DIV') section += 1;

    if (section === 1) {
      if (element.nodeName === 'H2') {
        element.classList.add('js-scroll', 'fade-in');
        resourcesDiv.append(element);

        resourcesDiv.append(resources);
      } else if (element.nodeName === 'P') {
        const resource = $element('.resource');

        const learnMore = $element('.learn-more-button');
        learnMore.innerHTML = 'LEARN MORE';
        const spacer = $element('.spacer');
        const resourceBottom = $element('.resource-bottom-container');
        resourceBottom.append(element);
        resourceBottom.append(learnMore);

        const resourceLogo = $element('.resource-logo');
        resourceLogo.style.backgroundImage = `url(../../resources/product-logo-${imgCount}.png)`;
        resource.append(spacer);
        resource.append(resourceLogo);
        resource.append(resourceBottom);
        resource.style.backgroundImage = `url(../../resources/products-${imgCount}.png)`;
        resource.classList.add('js-scroll', 'fade-in');
        imgCount += 1;
        resources.append(resource);
      }
    } else if (section === 2) {
      // This currently targets the think-differently module
    }
  });
  endDiv.prepend(resourcesDiv);

  function removeActive() {
    teamCardsDiv.querySelectorAll('.active').forEach((activeCard) => {
      activeCard.classList.remove('active');
    });
  }

  /** Accordian Cards open / close events:  */
  // Rig up teamsCards to open and close
  teamCardsDiv.querySelectorAll('div.team-card').forEach((element) => {
    element.addEventListener('click', () => {
      let alreadyActive;
      if (element.classList.contains('active')) alreadyActive = true;
      removeActive();
      if (!alreadyActive) element.classList.add('active');
    });
  });

  $scrollAnimation();
}
