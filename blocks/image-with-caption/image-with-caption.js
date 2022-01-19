export default function decorate(block) {
  const styles = ['cmp-image-with-caption__image', 'cmp-image-with-caption__caption'];
  styles.forEach((e, i) => {
    block.children[i].classList.add(e);
  });
}
