export default async function decorate(block) {
  const collaborators = block.querySelectorAll(':scope > div');
  block.innerHTML = '';
  const blockInner = document.createElement('div');
  blockInner.classList.add('cmp-collaborators__inner-wrap');
  block.append(blockInner);
  collaborators.forEach((collab, index) => {
    collab.classList.add('cmp-collaborator');
    if (index === 0) collab.classList.add('cmp-collaborator--intro');
    blockInner.append(collab);
  });
  const collaboratorPhotos = block.querySelectorAll('p > picture');
  collaboratorPhotos.forEach((photo) => {
    photo.parentNode.classList.add('cmp-collaborators__media-parent');
  });
}
