export default function tagLink(url) {
  // Breaks down the URL into an array of directories
  const tagLinkArray = url.split('/').filter(n => n); // eslint-disable-line arrow-parens
  // We only want to go one level deep, so if we have 3 or more objects
  // in the array, then we’ll pass along the 2nd item in the array.
  const tagLinkSort = tagLinkArray.length >= 3 ? `${tagLinkArray[1]}/` : '';
  // This is the final URL output for the article’s tag
  const tagLinkOutput = `/${tagLinkArray[0]}/${tagLinkSort}`;

  return tagLinkOutput;
}
