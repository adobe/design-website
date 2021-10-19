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
    var placement = inclusive.querySelector('.inclusive-design h1')
    var mainImg = inclusive.querySelector('.main-img')
    var ourMission = inclusive.querySelector('#our-mission')
    var ourMissionP = inclusive.querySelector('#our-mission + p')
    var div = $element('.statement')

    placement.after(div)
    div.append(mainImg,ourMission, ourMissionP)
    
    // our collaborators
    // test is the element before so I can place the targeted element after 
    var placement = inclusive.querySelector('.people.block')
    var ourCollaborators = inclusive.querySelector('#our-collaborators')
    var ourCollaboratorsP = inclusive.querySelector('#our-collaborators + p')
    var div = $element('.statementTwo')

    placement.before(div)
    div.append(ourCollaborators, ourCollaboratorsP)    

    // Adobe facilitators
    // test is the element before so I can place the targeted element after 
    var placement = inclusive.querySelector('.people.block')
    var adobeFacilitators = inclusive.querySelector('#adobe-facilitators')
    var adobeFacilitatorsP = inclusive.querySelector('#adobe-facilitators + p')
    var div = $element('.statementThree')

    placement.after(div)
    div.append(adobeFacilitators, adobeFacilitatorsP)

    // Applies the person class to the cards in the people block
    var peopleBlock = inclusive.querySelector('.people.block')
    document.querySelector("body > main > div > div > div:nth-child(10) > div:nth-child(2)").classList.add('person')
    for(let i = 0; i < peopleBlock.childElementCount; i++){
      peopleBlock.children[i].classList.add('person');
  }
}