/* eslint-disable no-multi-str */
export default function decorate(win = window) {
  const doc = win.document;
  const $footer = doc.querySelector('body > footer');
  $footer.id = 'global-footer';
  if ($footer) {
    // eslint-disable-next-line operator-linebreak
    $footer.innerHTML =
      '<div class="footer-content">                                                          \
        <a href="/" class="footer logo">                                                     \
          <img class="source" src="/resources/adobe-design.png">                             \
        </a>                                                                                 \
        <nav class="foot left">                                                              \
          <a href="" target="_blank">Behance</a>                                             \
          <a href="/jobs/">Jobs</a>                                                          \
          <a href="/stories/">Stories</a>                                                    \
        </nav>                                                                               \
        <nav class="foot right">                                                             \
          <a href="/team/">Team</a>                                                          \
          <a href="/toolkit/">Toolkit</a>                                                    \
          <a href="/toolkit/inclusive-design/">Inclusive Design</a>                          \
        </nav>                                                                               \
        <nav class="foot last">                                                              \
          <p>Copyright © 2021 Adobe. All rights reserved.</p>                                \
          <p class="med">/</p>                                                               \
          <a id="privacy" href="" target="_blank">Privacy</a>                                \
          <p class="sm">/</p>                                                                \
          <a id="tou" href="" target="_blank">Terms of Use</a>                               \
          <p class="sm">/</p>                                                                \
          <a id="cookies" href="" target="_blank">Cookies</a>                                \
          <p class="med">/</p>                                                               \
          <a id="dns-pinfo" href="" target="_blank">Do not sell my personal information</a>  \
        </nav>                                                                               \
      </div>';
  }
}
