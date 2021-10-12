export default function decorate($main) {
    var team = document.querySelector("body > main");
    team.classList.add("teams")
    console.log("working")
    team.forEach(t => {
      if( t.querySelector("p") ) {
        t.classList.add("article-picture");
      }
    });
}