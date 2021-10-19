export default function decorate(win = window) {
  console.log(win.document.location.pathname)
  const blackHeaderPages = ['/jobs/']
  const useBlackHeader = blackHeaderPages.includes(win.document.location.pathname)
  const doc = win.document;
  const $header = doc.querySelector("body > header");
  $header.id = "global-header";
  if ($header) {
    let headerImage = useBlackHeader?'/resources/adobe-design.png':'./media_1d3601e007f7c9b5cb83303a390ca0e7fec040eef.png'
    let colorClass = useBlackHeader?'black':''
    $header.innerHTML = 
    '<div>                \
      <div class="logo">  \
        <a href="/">      \
          <picture>       \
            <source media="(max-width: 400px)" srcset="'+headerImage+'?width=750&format=webply&optimize=medium"> \
            <img src="'+headerImage+'?width=2000&format=webply&optimize=medium" alt="" loading="eager"> \
          </picture>      \
        </a>              \
      </div>              \
    </div>                \
    <div class="tagline '+colorClass+'"> \
      <p>Stories from the team designing Creative Cloud, Document Cloud, and Experience Cloud.</p> \
    </div>                \
    <nav class="'+colorClass+'"> \
      <a href="/team/">Team</a> \
      <a href="/stories/">Stories</a> \
      <a href="/toolkit/">Tools</a> \
      <a href="/jobs/">Jobs</a> \
    </div>';
  }
}
