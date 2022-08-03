export default async function decorate(block) {
  let pictureElement;
  if (!CSS.supports('selector(:has(div))')) {
    pictureElement = block.querySelector('picture:only-child');
    pictureElement.parentElement.classList.add('has-picture');
  }
}
