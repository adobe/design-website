export default function decorate(win = window) {
    const doc = win.document;
    const $footer = doc.querySelector("body > footer");
    $footer.id = "global-footer";
    if ($footer) {
      $footer.innerHTML = 
        '<div class="footer-content">                                 \
          <img class="source" src="/resources/adobe-design.png">      \
          <nav>                                                       \
            <a href="">Behance</a>                                    \
            <a href="/jobs/">Jobs</a>                                 \
            <a href="/stories/">Stories</a>                           \
          </nav>                                                      \
          <nav>                                                       \
            <a href="/team/">Team</a>                                 \
            <a href="/toolkit/">Toolkit</a>                           \
            <a href="/toolkit/inclusive-design/">Inclusive Design</a> \
          </nav>                                                      \
          <nav>                                                       \
            <p>Copyright © 2021 Adobe. All rights reserved.</p>       \
            <p>/</p>                                                  \
            <a href="">Privacy</a>                                    \
            <p>/</p>                                                  \
            <a href="">Terms of Use</a>                               \
            <p>/</p>                                                  \
            <a href="">Cookies</a>                                    \
            <p>/</p>                                                  \
            <a href="">Do not sell my personal information</a>        \
          </nav>                                                      \
        </div>'
    }
}
