export default function decorate(block) {
  const styles = ['image', 'caption'];
  styles.forEach((e, i) => {
    block.children[i].classList.add(e);
  });
}
