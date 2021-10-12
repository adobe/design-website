export default function decorate($main) {
    var team = document.querySelector("body > main");
    team.classList.add("teams")
    console.log("working")
    /* team.forEach(t => {
      if( t.querySelector("p") ) {
        t.classList.add("article-picture");
      }
    }); */


    /*
    =====================WARNING======================
    This page oranization is dependant on a few things

    -H3s are not included in the page until the teams cards
    -H2s are not included in any of the teams cards
    -The first element on the page after teams cards is an H2
    -All team-cards start with an H3

    If any of these change, this function will need to be updated
    */

    var content = team.querySelector("div > div")
    content.classList.add("content")

    const headDiv = document.createElement("div")
    headDiv.classList.add("head-content")
    const teamCardsDiv = document.createElement("div")
    teamCardsDiv.classList.add("team-cards")
    const endDiv = document.createElement("div")
    endDiv.classList.add("foot-content")

    let pageSection = 0;

    content.querySelectorAll("div>*").forEach(element =>{
      switch(pageSection){
        case 0:
          if(element.nodeName === "DIV")
            break;
          pageSection++;
        case 1:
          if(element.nodeName !== "H3"){
            headDiv.appendChild(element)
            break;
          }
          pageSection++
        case 2:
          if(element.nodeName !== "H2"){
            teamCardsDiv.appendChild(element)
            break;
          }
          pageSection++
        case 3:{
          endDiv.appendChild(element)
          break;
        }
      }
    })

    content.append(headDiv)
    content.append(teamCardsDiv)
    content.append(endDiv)

    //Oranizing individual teams cards
    let card = 0;
    let teamCard = document.createElement("div");
    teamCard.classList.add("team-card", "card-"+card)
    teamCardsDiv.querySelectorAll("*").forEach(element =>{
      if(card !== 0 && element.nodeName === "H3"){
        teamCardsDiv.append(teamCard)
        teamCard = document.createElement("div")
        teamCard.classList.add("team-card", "card-"+card)
        card++
      }else if(element.nodeName === "H3")
        card++
      teamCard.append(element)
    })
    teamCardsDiv.append(teamCard)
}