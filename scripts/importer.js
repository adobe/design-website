/**
 * Loads a CSS file.
 * @param {string} href The path to the CSS file
 */
export function loadCSS(href) {
  if (!document.querySelector(`head > link[href="${href}"]`)) {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', href);
    link.onload = () => {
    };
    link.onerror = () => {
    };
    document.head.appendChild(link);
  }
}
  // <script src="myscript"></script>
  export function loadScript(src, options) {
    let opts = options || {};
    if (!document.querySelector(`head > script[src="${src}"]`)) {
      const script = document.createElement("script");
      script.setAttribute("src", src);
      if (opts.type) {
        script.setAttribute("type", opts.type);
      }
      document.head.appendChild(script);
    }
    document.head.appendChild(script);
   /**
    * script.onload(() => {
    *   console.log(`Script ${src} loaded`);
    * });
    */
}

