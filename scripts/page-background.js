import { getMetadata } from './scripts.js';
import setBodyColor from './body-color.js';

function setPageBackgroundColor() {
  const pageBgColor = (getMetadata('color') !== null && getMetadata('color') !== '') ? getMetadata('color') : '#fff';
  setBodyColor(pageBgColor);

  const blendedBackground = document.createElement('div');
  blendedBackground.classList.add('blended-background');
  blendedBackground.style.setProperty('--blended-background-color', pageBgColor);

  document.body.append(blendedBackground);
  document.documentElement.style.setProperty('--header-color', pageBgColor);
}

setPageBackgroundColor();
