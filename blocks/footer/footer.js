/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  const resp = await fetch('/footer.plain.html');
  const html = await resp.text();
  block.parentNode.classList.add('cmp-footer');
  block.innerHTML = '';
  const footerInnerWrap = document.createElement('div');
  footerInnerWrap.classList.add('cmp-footer__inner-wrap');
  footerInnerWrap.innerHTML = html;
  block.append(footerInnerWrap);

  const links = footerInnerWrap.querySelectorAll('.cmp-footer__inner-wrap a');
  [...links].forEach((link) => link.classList.add('cmp-footer__link'));

  const footerLogoContainer = footerInnerWrap.firstElementChild;
  footerLogoContainer.classList.add('cmp-footer__logo');
  footerLogoContainer.innerHTML = '';

  const footerLogoSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  footerLogoSVG.setAttribute('viewBox', '0 0 144.541 48.257');
  footerLogoSVG.innerHTML = `
    <title>Adobe Design</title>
    <g id="Adobe_Design_00000002343268264084869480000015764053148047912862_" transform="translate(0 .389)">
      <g id="Group_288707_00000168809962479648214000000011708626894900854681_" transform="translate(56.61 2.83)">
        <path id="Path_105036_00000017518895385412364090000012651774567123775417_" d="m7.657 14.376-.89 2.815a.292.292 0 0 1-.322.259l-.008-.001h-3.4c-.234 0-.28-.117-.234-.3L7.258 4.126a5.376 5.376 0 0 0 .258-1.712.173.173 0 0 1 .187-.188h4.644a.183.183 0 0 1 .212.14l5.184 14.8c.07.188.023.282-.141.282h-3.87a.273.273 0 0 1-.281-.187l-.962-2.885H7.657zm3.893-3.448c-.446-1.571-1.056-3.588-1.525-5.325h-.023C9.65 7.269 8.97 9.45 8.547 10.928h3.003z"/>
        <path id="Path_105037_00000122708236635154785640000017361707006037094332_" d="M19.523 2.414c0-.117.046-.164.164-.188h5.137c5.488 0 8.116 3.355 8.116 7.412 0 5.653-4.526 7.81-8.513 7.81h-4.715c-.117 0-.187-.07-.187-.257l-.002-14.777zm4.1 11.61h.938c2.51 0 4.152-1.218 4.152-4.292 0-2.768-1.36-4.058-3.94-4.058h-1.149v8.35z"/>
        <path id="Path_105038_00000109000167848441634530000013220045519960737921_" d="M49.639 9.732c0 4.715-2.886 7.952-7.507 7.952-4.667 0-7.458-3.213-7.458-7.882 0-4.316 2.838-7.811 7.506-7.811 4.831 0 7.459 3.684 7.459 7.74zm-7.389 4.48c1.994 0 3.167-1.547 3.167-4.386 0-2.651-1.127-4.363-3.309-4.363-2.087 0-3.212 1.759-3.212 4.363 0 2.557 1.172 4.387 3.355 4.387z"/>
        <path id="Path_105039_00000168109199773725265150000005288855902806227128_" d="M52.053 2.507c0-.187.047-.234.187-.257a130.52 130.52 0 0 1 5.3-.094c5.254 0 6.262 2.44 6.262 4.128a3.658 3.658 0 0 1-1.408 3 3.8 3.8 0 0 1 2.088 3.495c0 2.979-2.6 4.785-6.99 4.738-1.783 0-4.527-.071-5.255-.071-.14-.024-.187-.094-.187-.234l.003-14.705zm4.01 5.442h1.758c.634 0 1.292.07 1.596.094.273-.329.415-.746.4-1.173 0-.61-.212-1.478-2.112-1.478-.61 0-1.242.024-1.641.047l-.002 2.51zm0 6.263c.375.023 1.125.046 1.735.046 1.595 0 2.44-.516 2.44-1.5 0-.961-.7-1.525-2.487-1.525h-1.688v2.979z"/>
        <path id="Path_105040_00000013189515151719838620000007214132187173816192_" d="M77.055 17.215c-.025.188-.118.234-.282.234h-9.947c-.187 0-.234-.07-.234-.234V2.437c0-.164.047-.211.234-.211h9.71c.212 0 .259.024.3.188l.329 3c.023.14-.048.28-.188.28h-6.286v2.282h5.793c.142 0 .212.046.212.21v3.074c0 .14-.095.164-.212.164h-5.793v2.552h6.591c.212 0 .235.07.212.235l-.44 3.004z"/>
        <path id="Path_105041_00000033362917135703941240000012788032520539330701_" d="M4.513 24.583c0-.117.047-.164.164-.188h5.137c5.49 0 8.116 3.355 8.116 7.412 0 5.653-4.527 7.81-8.514 7.81H4.697c-.118 0-.188-.07-.188-.257l.004-14.777zm4.1 11.61h.939c2.51 0 4.152-1.218 4.152-4.291 0-2.768-1.361-4.058-3.94-4.058h-1.15v8.35z"/>
        <path id="Path_105042_00000076602247143481955410000018415064862195184828_" d="M30.805 39.383c-.024.188-.117.235-.282.235h-9.945c-.188 0-.234-.071-.234-.235V24.602c0-.164.045-.211.233-.211h9.711c.211 0 .258.024.3.188l.33 3c.024.14-.047.28-.188.28h-6.281v2.276h5.794c.14 0 .21.047.21.21v3.074c0 .14-.093.164-.21.164h-5.794v2.56h6.59c.212 0 .235.07.212.235l-.447 3.005z"/>
        <path id="Path_105043_00000071552064706286851600000010007836014448877966_" d="M33.196 39.052c-.164-.07-.211-.211-.211-.422v-3.355c0-.141.094-.211.234-.141a8.856 8.856 0 0 0 4.574 1.243c1.478 0 1.994-.4 1.994-.962 0-.586-.4-.868-1.971-1.5l-1.057-.422c-2.672-1.056-3.8-2.463-3.8-4.574 0-2.392 1.783-4.762 6.076-4.762a10.499 10.499 0 0 1 3.753.586c.14.024.187.14.187.3v3.237c0 .07-.071.188-.258.117a8.194 8.194 0 0 0-3.87-.868c-1.431 0-1.9.516-1.9 1.033 0 .445.21.82 1.97 1.477l.939.352c3.33 1.22 4.058 2.72 4.058 4.69 0 3.144-2.721 4.763-6.427 4.763a9.862 9.862 0 0 1-4.291-.792z"/>
        <path id="Path_105044_00000145028042696426134260000000396950896812237202_" d="M50.13 39.333c0 .187-.047.28-.258.28h-3.589c-.21 0-.258-.093-.258-.28V24.602c0-.164.094-.211.234-.211h3.635c.164 0 .235.047.235.21l.002 14.732z"/>
        <path id="Path_105045_00000023976334089710387510000013363834756403160971_" d="M60.191 34.127c-.187-.024-.21-.094-.21-.282v-2.886c0-.141.046-.187.187-.187h5.84c.165 0 .212.07.212.21V38.7c0 .164-.025.235-.189.28a13.81 13.81 0 0 1-4.973.869c-5.724 0-8.56-3.33-8.56-7.834 0-4.88 3.54-7.858 8.936-7.858 1.432-.081 2.867.118 4.222.586.141.047.165.14.165.352v3.073a.166.166 0 0 1-.257.164 9.159 9.159 0 0 0-3.988-.751c-3.073-.024-4.88 1.759-4.88 4.41a4.074 4.074 0 0 0 4.458 4.387c.322.019.645-.005.962-.071v-2.064l-1.925-.116z"/>
        <path id="Path_105046_00000043431140900410735470000015670755201822974619_" d="M69.407 39.615c-.21 0-.28-.024-.28-.281V24.583c0-.141.093-.188.233-.188h4.738c.211 0 .258.024.352.21 1.29 2.628 3.683 7.953 4.293 9.547h.048c-.048-.7-.095-2.111-.095-4.691v-4.835c0-.164.048-.235.26-.235h3.306c.212 0 .283.07.283.258v14.684c0 .234-.095.28-.3.28H77.85c-.233 0-.3-.046-.374-.21-1.573-3.354-3.473-7.6-4.6-10.626h-.024c.094 1.618.118 2.346.118 4.62v5.958c0 .164-.048.258-.237.258l-3.326.002z"/>
      </g>
      <g id="Group_288708_00000071560942288699921600000004075472237780580503_">
        <path id="Path_105047_00000091008282017610895310000007819633865617187980_" d="M32.977 1.992h17.7v42.394l-17.7-42.394z"/>
        <path id="Path_105048_00000044157877571954700830000006882541569052883855_" d="M20.503 1.992H2.785v42.394L20.503 1.992z"/>
        <path id="Path_105049_00000101787690262773870960000006983716233320979075_" d="M26.741 17.614 38.023 44.38H30.63l-3.375-8.525h-8.256l7.743-18.242z"/>
      </g>
    </g>
  `;

  footerLogoContainer.append(footerLogoSVG);

  const footerNavigation = footerInnerWrap.querySelectorAll('.cmp-footer__inner-wrap div')[1];
  footerNavigation.classList.add('cmp-footer__nav');

  const copyright = footerInnerWrap.querySelector('.cmp-footer__inner-wrap div:last-of-type');
  copyright.classList.add('cmp-footer__copyright');

  const copyrightLinks = copyright.querySelectorAll('.cmp-footer__copyright a');
  [...copyrightLinks].forEach((link) => {
    link.classList.remove('cmp-footer__link');
    link.classList.add('cmp-footer__copyright-link');
  });
}
