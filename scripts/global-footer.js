export default function decorate(win = window) {
    const doc = win.document;
    const $footer = doc.querySelector("body > footer");
    $footer.id = "global-footer";
    if ($footer) {
      $footer.innerHTML = '<nav><a>More</a><a>Stuff</a></nav>';
    }
}
