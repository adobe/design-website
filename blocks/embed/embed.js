const EMBEDS_CONFIG = {
  instagram: {
    type: 'instagram',
    url: 'https://www.instagram.com/embed.js',
    createEmbed: (url) => {
      const trailingSlash = url.endsWith('/') ? '' : '/';
      const src = `${url}${trailingSlash}embed/`;

      return `
        <figure>
          <blockquote
            class="instagram-media"
          >
            <a href=${src}></a>
          </blockquote>
        </figure>
      `;
    },
    onLoad: (wrapper) => {
      const iframe = wrapper.querySelector('.instagram-media');
      const iframeHeight = iframe.getAttribute('height');

      // Height of Instagram footer content is 153px
      iframe.setAttribute('height', (Number(iframeHeight) - 153).toString());

      // Remove margin set by embed script
      iframe.setAttribute('style', 'background-color: white; border-radius: 3px; border: 1px solid rgb(219, 219, 219); box-shadow: none; display: block; margin: 0; min-width: 326px; padding: 0px;');
    },
  },
  twitter: {
    type: 'twitter',
    url: 'https://platform.twitter.com/widgets.js',
    createEmbed: (url) => `
      <blockquote class="twitter-tweet">
        <a href=${url}></a>
      </blockquote>
    `,
  },
};

const setConfig = (embedCode) => {
  switch (true) {
    case (embedCode.includes('instagram')):
      return EMBEDS_CONFIG.instagram;
    case (embedCode.includes('twitter')):
      return EMBEDS_CONFIG.twitter;
    default:
      return null;
  }
};

export default async function decorate(block) {
  // Find the embed url
  const url = block.querySelector('div') !== null ? block.querySelector('div').innerText : null;

  // Set config
  const config = setConfig(url);

  // Create wrapper div for embed and set innerHTML to embed code
  const createWrapper = document.createElement('div');
  const createEmbed = config.createEmbed(url);
  createWrapper.className = `cmp-embed cmp-embed--${config.type}`;
  createWrapper.innerHTML = createEmbed;
  block.parentNode.insertBefore(createWrapper, block);
  block.remove();

  // Import script into head
  const createScript = document.createElement('script');
  createScript.setAttribute('src', config.url);
  document.querySelector('head').append(createScript);

  // Clean up functions
  setTimeout(() => {
    if (config.onLoad) {
      config.onLoad(createWrapper);

      window.addEventListener('resize', () => {
        config.onLoad(createWrapper);
      });
    }
  }, 1000);
}
