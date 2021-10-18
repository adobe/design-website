import { $element } from "../../scripts/helpers.js";

export default function decorate($main) {
    var inclusive = document.querySelector("body > main");
    inclusive.classList.add("inclusive-design")
   /* inclusive.forEach(t => {
      if( t.querySelector("p") ) {
        t.classList.add("article-picture");
      }
    });*/

  
    // our mission
    // test is the elemet before so I can place the targeted element after
    var test = inclusive.querySelector('#inclusive-design-at-adobe')
    var mainImg = inclusive.querySelector('body > main > div > div > p')
    var ourMission = inclusive.querySelector('#our-mission')
    var ourMissionP = inclusive.querySelector('#our-mission + p')
    var div = $element('.statement')

    test.after(div)
    div.append(mainImg,ourMission, ourMissionP)
    
    // our collaborators
    // test is the elemet before so I can place the targeted element after 
    var testTwo = inclusive.querySelector('body > main > div > div > div:nth-child(5)')
    var ourCollaborators = inclusive.querySelector('#our-collaborators')
    var ourCollaboratorsP = inclusive.querySelector('#our-collaborators + p')
    var div = $element('.statementTwo')

    testTwo.after(div)
    div.append(ourCollaborators, ourCollaboratorsP)    

    // Adobe facilitators
    // test is the elemet before so I can place the targeted element after 
    var testThree = inclusive.querySelector('body > main > div > div > div:nth-child(7)')
    var adobeFacilitators = inclusive.querySelector('#adobe-facilitators')
    var adobeFacilitatorsP = inclusive.querySelector('#adobe-facilitators + p')
    var div = $element('.statementThree')

    testThree.after(div)
    div.append(adobeFacilitators, adobeFacilitatorsP)

    // Applies the person class to the cards in the people block
    var peopleBlock = inclusive.querySelector('body > main > div > div > div:nth-child(7)')
    for(let i = 0; i < peopleBlock.childElementCount; i++){
    peopleBlock.children[i].classList.add('person');
  }
}