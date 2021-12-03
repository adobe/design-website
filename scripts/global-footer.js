/* eslint-disable no-multi-str */
export default function decorate(win = window) {
  const doc = win.document;
  const $footer = doc.querySelector('body > footer');
  $footer.id = 'global-footer';
  if ($footer) {
    // eslint-disable-next-line operator-linebreak
    $footer.innerHTML =
        '<div class="footer-content">                                           \
          <a href="/">                                                          \
            <img class="source" src="/resources/adobe-design.png">              \
          </a>                                                                  \
          <nav>                                                                 \
            <a href="" target="_blank">Behance</a>                              \
            <a href="/jobs/">Jobs</a>                                           \
            <a href="/stories/">Stories</a>                                     \
          </nav>                                                                \
          <nav>                                                                 \
            <a href="/team/">Team</a>                                           \
            <a href="/toolkit/">Toolkit</a>                                     \
            <a href="/toolkit/inclusive-design/">Inclusive Design</a>           \
          </nav>                                                                \
          <nav>                                                                 \
            <p>Copyright © 2021 Adobe. All rights reserved.</p>                 \
            <p>/</p>                                                            \
            <a href="" target="_blank">Privacy</a>                              \
            <p>/</p>                                                            \
            <a href="" target="_blank">Terms of Use</a>                         \
            <p>/</p>                                                            \
            <a href="" target="_blank">Cookies</a>                              \
            <p>/</p>                                                            \
            <a href="" target="_blank">Do not sell my personal information</a>  \
          </nav>                                                                \
        </div>';
  }
}
