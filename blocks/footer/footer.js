/**
 * 
 * @param {HTMLElement} $block 
 */
export default function decorate($block) {
    const $footer = $block.querySelectorAll(":scope > div");
    for(const footer of $footer) {
      footer.classList.add("footer");
      footer.querySelector("div > p:nth-child(1) > picture > img").classList.add("footer-image");
      footer.querySelector(".footer > div > div > p:nth-child(2)").classList.add("facebook");
      footer.querySelector("div p:nth-child(3)").classList.add("twitter");
      footer.querySelector("div p:nth-child(4)").classList.add("instagram");
      footer.querySelector("div p:nth-child(5)").classList.add("adobe-jobs");
      footer.querySelector("div p:nth-child(6)").classList.add("adobe-stories");
      footer.querySelector("div p:nth-child(7)").classList.add("copyright");
    }
}
