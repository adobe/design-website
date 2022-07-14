export default async function decorate(block) {
  if (!CSS.supports("selector(:has(div))")) {
    block.classList.add('no-has');
  }
}
