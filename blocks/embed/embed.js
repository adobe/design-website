const EMBEDS_CONFIG = {
  instagram: {
    type: 'instagram',
    url: 'https://www.instagram.com/embed.js',
    createEmbed: (url) => {
      const trailingSlash = url.endsWith('/') ? '' : '/';
      const src = `${url}${trailingSlash}embed/`;

      // Embed script replaces nested blockquote
      return `
        <figure class="cmp-embed__container">
          <blockquote
            class="instagram-media"
            data-instgrm-captioned
          >
            <a href=${src}></a>
          </blockquote>
        </figure>
      `;
    },
  },
  twitter: {
    type: 'twitter',
    url: 'https://platform.twitter.com/widgets.js',
    // Embed script replaces nested blockquote
    createEmbed: (url) => `
      <blockquote class="cmp-embed__container">
        <blockquote class="twitter-tweet">
          <a href=${url}></a>
        </blockquote>
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
  createWrapper.innerHTML = createEmbed;
  createWrapper.className = `cmp-embed cmp-embed--${config.type}`;
  block.parentNode.insertBefore(createWrapper, block);
  block.remove();

  // Import script into head
  const createScript = document.createElement('script');
  createScript.setAttribute('src', config.url);
  document.querySelector('head').append(createScript);
}
