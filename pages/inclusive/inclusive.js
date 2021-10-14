export default function decorate($main) {
    var inclusive = document.querySelector("body > main");
    inclusive.classList.add("inclusive-design")
    inclusive.forEach(t => {
      if( t.querySelector("p") ) {
        t.classList.add("article-picture");
      }
    });
}