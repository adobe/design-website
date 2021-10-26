export default function decorate(win = window) {
  console.log(win.document.location.pathname)
  const blackHeaderPages = ['/jobs/']
  const useBlackHeader = blackHeaderPages.includes(win.document.location.pathname)
  const doc = win.document;
  const $header = doc.querySelector("body > header");
  var windowWidth = window.innerWidth;
  $header.id = "global-header";
  const delay = 250;
  var timeout = false;
  var calls = 0;
  function setupHeader(){
    calls +=1;
    if ($header) {
      windowWidth = window.innerWidth;
      $header.innerHTML = "";
      let headerImage = useBlackHeader?'/resources/adobe-design.png':'./media_1d3601e007f7c9b5cb83303a390ca0e7fec040eef.png';
      let hamburgerMenu = useBlackHeader ? '/resources/black-hamburger.png' : '/resources/white-hamburger.png';
      let colorClass = useBlackHeader?'black':'';
      if(windowWidth >= 1000){
        $header.innerHTML = 
        ` \
        <div>                \
          <div class="logo">  \
            <a href="/">      \
              <picture>       \
                <source media="(max-width: 400px)" srcset="${headerImage}?width=750&format=webply&optimize=medium"> \
                <img src="${headerImage}?width=2000&format=webply&optimize=medium" alt="" loading="eager"> \
              </picture>      \
            </a>              \
          </div>              \
        </div>                \
        <div class="tagline ${colorClass}"> \
          <p>Stories from the team designing Creative Cloud, Document Cloud, and Experience Cloud.</p> \
        </div>                \
      <nav class="${colorClass}"> \
        <a href="/team/">Team</a> \
        <a href="/stories/">Stories</a> \
        <a href="/toolkit/">Tools</a> \
        <a href="/jobs/">Jobs</a> \
      </nav> \
      `;
      } else {
        $header.innerHTML = 
        ` \
        <div>                \
          <div class="logo">  \
            <a href="/">      \
              <picture>       \
                <source media="(max-width: 400px)" srcset="${headerImage}?width=750&format=webply&optimize=medium"> \
                <img src="${headerImage}?width=2000&format=webply&optimize=medium" alt="" loading="eager"> \
              </picture>      \
            </a>              \
          </div>              \
        </div>                \
        <div class="tagline ${colorClass}"> \
        </div>                \
      <nav class="${colorClass}"> \
        <img src="${hamburgerMenu}" height=25> \
      </nav> \
      `;
      }
    }
  }
  window.addEventListener("resize",function(){
    clearTimeout(timeout);
    timeout = setTimeout(setupHeader, delay)
  })
  setupHeader();
}
