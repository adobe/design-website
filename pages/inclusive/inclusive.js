import { $element } from '../../scripts/helpers.js';

export default function decorate() {
  const inclusive = document.querySelector('body > main');
  inclusive.classList.add('inclusive-design');
  /* inclusive.forEach(t => {
    if( t.querySelector("p") ) {
        t.classList.add("article-picture");
      }
    }); */

  let mainImg = inclusive.querySelector('img').classList.add('main-img');

  // our mission
  let placement = inclusive.querySelector('.inclusive-design h1');
  mainImg = inclusive.querySelector('.main-img');
  const ourMission = inclusive.querySelector('#our-mission');
  const ourMissionP = inclusive.querySelector('#our-mission + p');
  let div = $element('.statement');

  placement.after(div);
  div.append(mainImg, ourMission, ourMissionP);

  // our collaborators
  placement = inclusive.querySelector('.people.block');
  const ourCollaborators = inclusive.querySelector('#our-collaborators');
  const ourCollaboratorsP = inclusive.querySelector('#our-collaborators + p');
  div = $element('.statementTwo');

  placement.before(div);
  div.append(ourCollaborators, ourCollaboratorsP);

  // Adobe facilitators
  placement = inclusive.querySelector('.people.block');
  const adobeFacilitators = inclusive.querySelector('#adobe-facilitators');
  const adobeFacilitatorsP = inclusive.querySelector('#adobe-facilitators + p');
  div = $element('.statementThree');

  placement.after(div);
  div.append(adobeFacilitators, adobeFacilitatorsP);

  // Applies the person class to the cards in the people block
  const peopleBlock = inclusive.querySelector('.people.block');
  document.querySelector('body > main > div > div > div:nth-child(10) > div:nth-child(2)').classList.add('person');
  for (let i = 0; i < peopleBlock.childElementCount; i += 1) {
    peopleBlock.children[i].classList.add('person');
  }
}
