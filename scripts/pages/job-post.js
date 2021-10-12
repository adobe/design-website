export default function decorate($main) {
  var paragraphs = document.querySelectorAll("body > main > div > div > p");
  paragraphs.forEach(p => {
    if( p.querySelector("picture") ) {
      p.classList.add("job-post-picture");
    }
  });
}