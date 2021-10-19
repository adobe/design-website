import { $element } from "../../scripts/helpers.js";

export default function decorate($main) {
    var inclusive = document.querySelector("body > main");
    inclusive.classList.add("inclusive-design")
   /* inclusive.forEach(t => {
      if( t.querySelector("p") ) {
        t.classList.add("article-picture");
      }
    });*/
    

    
    var mainImg = inclusive.querySelector('img').classList.add('main-img')
  
    // our mission
    // test is the element before so I can place the targeted element after
    var test = inclusive.querySelector('#inclusive-design-at-adobe')
    var mainImg = inclusive.querySelector('.main-img')
    var ourMission = inclusive.querySelector('#our-mission')
    var ourMissionP = inclusive.querySelector('#our-mission + p')
    var div = $element('.statement')

    test.after(div)
    div.append(mainImg,ourMission, ourMissionP)
    
    // our collaborators
    // test is the element before so I can place the targeted element after 
    var testTwo = inclusive.querySelector('.people.block')
    var ourCollaborators = inclusive.querySelector('#our-collaborators')
    var ourCollaboratorsP = inclusive.querySelector('#our-collaborators + p')
    var div = $element('.statementTwo')

    testTwo.before(div)
    div.append(ourCollaborators, ourCollaboratorsP)    

    // Adobe facilitators
    // test is the element before so I can place the targeted element after 
    var testThree = inclusive.querySelector('.people.block')
    var adobeFacilitators = inclusive.querySelector('#adobe-facilitators')
    var adobeFacilitatorsP = inclusive.querySelector('#adobe-facilitators + p')
    var div = $element('.statementThree')

    testThree.after(div)
    div.append(adobeFacilitators, adobeFacilitatorsP)

    // Applies the person class to the cards in the people block
    var peopleBlock = inclusive.querySelector('.people.block')
    for(let i = 0; i < peopleBlock.childElementCount; i++){
    peopleBlock.children[i].classList.add('person');
  }
}