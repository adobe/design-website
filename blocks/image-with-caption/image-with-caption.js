export default function decorate($block) {
  // const $image = $block.querySelectorAll(':scope > div');
  $block.querySelector('.image-with-caption.block > div:nth-child(1)').classList.add('image');
  $block.querySelector('.image-with-caption.block > div:nth-child(2)').classList.add('caption');
}
