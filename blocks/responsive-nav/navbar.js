// import { LOG_INFO } from "karma/lib/constants";
import { decorateDivisions } from '../../scripts/helpers.js';

export default function decorate($block) {
  const $people = $block.querySelectorAll(':scope > div');
  // eslint-disable-next-line no-restricted-syntax
  for (const person of $people) {
    // eslint-disable-next-line no-unused-vars
    const { properties } = decorateDivisions(person, null, { level: 'child' });
  }
}
