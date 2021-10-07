export default function decorate(win = window) {
  const doc = win.document;
  const $header = doc.querySelector("body > header");
  $header.id = "global-header";
  if ($header) {
    $header.textContent = "Hello World";
    $header.innerHTML = '<div> <div class="logo"><a href="/"><picture> <source media="(max-width: 400px)" srcset="./media_1d3601e007f7c9b5cb83303a390ca0e7fec040eef.png?width=750&format=webply&optimize=medium"> <img src="./media_1d3601e007f7c9b5cb83303a390ca0e7fec040eef.png?width=2000&format=webply&optimize=medium" alt=" loading="eager"> </picture></a> </div> </div> <div class="tagline"> <p>Stories from the team designing Creative Cloud, Document Cloud, and Experience Cloud.</p> </div> <nav> <a>Team</a> <a>Stories</a> <a>Tools</a> <a>Jobs</a> </div>';
  }
}
