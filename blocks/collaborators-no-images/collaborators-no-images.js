export default async function decorate(block) {
  const collaborators = block.querySelectorAll(':scope > div');
  block.innerHTML = '';
  const blockInner = document.createElement('div');
  blockInner.classList.add('cmp-collaborators-no-images__inner-wrap');
  block.append(blockInner);
  collaborators.forEach((collab, index) => {
    collab.classList.add('cmp-collaborator-no-images');
    if (index === 0) collab.classList.add('cmp-collaborator-no-images--intro');
    blockInner.append(collab);
  });
}
