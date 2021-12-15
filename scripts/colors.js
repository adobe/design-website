/* eslint-disable no-restricted-globals */
const DEFAULT_BACKGROUND = '#EB211F';
/**
 * @typedef {object} PageColor
 * @property {string} Name
 * @property {string} Value
 * @property {string} BackgroundType
 */

const Colors = {
  data: null,
  /**
   *
   * @param {string} name
   * @returns {PageColor}
   */
  byName(name) {
    try {
      const result = this.data.find((color) => color.Name.toLowerCase() === name.toLowerCase());
      result.BackgroundType = result.BackgroundType.toLowerCase();
      result.Name = result.BackgroundType.toLowerCase();
      return result;
    } catch (err) {
      return { Value: name || DEFAULT_BACKGROUND, BackgroundType: 'light' };
    }
  },
};

export default async function getColors() {
  if (Colors.data === null) {
    try {
      const url = `${location.origin}/colors.json`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch colors: ${url}`);
      }
      const asJson = await res.json();
      Colors.data = asJson.data;

      return Colors;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return Colors;
    }
  } else {
      return Colors;
  }
}
