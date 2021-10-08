export default function decorate($main) {
    var paragraphs = document.querySelectorAll("body > main > div > div > p");
    paragraphs.forEach(p => {
      if( p.querySelector("picture") ) {
        p.classList.add("article-picture");
      }
    });
    moveHeaderContent();
}


function moveHeaderContent() {
  const page = document.querySelector(".block.page");
  const header = document.querySelector(".block.header");
  const section = document.querySelector(".section-wrapper");
  const container = document.querySelector(".section-wrapper div:first-child");
  const newDiv = document.createElement("div");
  section.insertBefore(newDiv, container);

  container.classList.add("content");
  newDiv.appendChild(page);
  newDiv.appendChild(header);

  const picture = header.querySelector("picture");
  picture.classList.add("header-image");
  container.prepend(picture);
}

