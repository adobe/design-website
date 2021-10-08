export default function decorate(win = window) {
    const doc = win.document;
    const $footer = doc.querySelector("body > footer");
    $footer.id = "global-footer";
    if ($footer) {
      $footer.innerHTML = '<img class="source" src="/resources/adobe-design.png"> <nav> <a href="">Behance</a> <a href="">Instagram</a> <a href="">Twitter</a> </nav> <nav> <a href="">Adobe Jobs</a> <a href="">Adobe Stories</a> </nav> <nav> <p>Copyright © 2021 Adobe. All rights reserved.</p> <p>/</p> <a href="">Privacy</a> <p>/</p> <a href="">Terms of Use</a> <p>/</p> <a href="">Cookies</a> <p>/</p> <a href="">Do not sell my personal information</a> </nav>';
    }
}
