import colormap from './colormap.js';

export default function setBodyColor(color) {
  if (colormap[color] === 'black') {
    document.body.classList.remove('light-text');
    document.body.classList.add('dark-text');
  } else {
    document.body.classList.remove('dark-text');
    document.body.classList.add('light-text');
  }
}
