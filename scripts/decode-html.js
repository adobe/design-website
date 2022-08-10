export default function decodeHTML(element) {
  let content = element;
  content = content.replace('&#x3C;', '<');
  content = content.replace('&lt;', '<');
  content = content.replace('&gt;', '>');
  return content;
}
