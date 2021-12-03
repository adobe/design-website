import {
  // decorateDivisions,
  decorateTagLink,
  $element,
} from '../../scripts/helpers.js';

export default function decorate($block) {
  const $people = $block.querySelectorAll(':scope > div');
  // eslint-disable-next-line no-restricted-syntax
  for (const person of $people) {
    // const { properties } = decorateDivisions(person, null, { level: 'child' });

    person.classList.add('person');
    person.querySelector('div:nth-child(1)').classList.add('content');
    person.querySelector('p:nth-of-type(2)').classList.add('pad');
    person.querySelector('p:nth-of-type(2) > picture > img').classList.add('image');
    person.querySelector('div:nth-child(2)').classList.add('name');
    person.querySelector('div:nth-child(3)').classList.add('title');

    const tag = person.querySelector('p:nth-of-type(1)');
    tag.innerText = tag.innerText.replace('#', '');
    const tagLink = decorateTagLink($element('p', ['#', $element('span.tag', tag.innerText)]), tag.innerText.replaceAll(' ', '-'));
    person.prepend(tagLink);
    tag.remove();

    const content = person.querySelector('div.content');
    content.remove();
    person.prepend(content);
  }
}
