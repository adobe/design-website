export default function decorate($main) {
/* Add (class="job-post") to entire pg so each job posting will have same styles */
  document.querySelector("body").classList.add("job-post")
  var paragraphs = document.querySelectorAll("body > main > div > div > p");
  paragraphs.forEach(p => {
    if( p.querySelector("picture") ) {
      p.classList.add("job-post-picture");
    }
  });
}