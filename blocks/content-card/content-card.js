export default async function decorate(block) {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('cmp-content-card');

  const content = block.querySelector('div:nth-child(1)').innerHTML;
  cardContainer.innerHTML += content;

  const picture = block.querySelector('div:nth-child(2)').innerHTML;
  cardContainer.innerHTML += picture;

  cardContainer.querySelector('div:nth-child(1)').classList.add('cmp-content-card__content');
  cardContainer.querySelector('div:nth-child(2)').classList.add('cmp-content-card__picture');

  block.parentNode.insertBefore(cardContainer, block);
  block.remove();
}
