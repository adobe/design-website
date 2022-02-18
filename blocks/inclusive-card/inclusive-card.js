export default async function decorate() {
  const wrapper = document.querySelector('.inclusive-design .section-wrapper');
  wrapper.classList.add('inclusive-card-container');
  console.log(wrapper);
  wrapper.firstChild.classList.add('inclusive-card-container__inner');

  const container = document.querySelector('.people-container');
  container.firstChild.classList.add('inclusive-card-container__inner');
}
