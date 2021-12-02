import addButton from '../../blocks/button/button.js';
import {
  $addMiddleElm,
  $element,
  getMetadata,
} from '../../scripts/helpers.js';
import { getJobsFragment } from '../../scripts/jobs-fragments.js';
import makeSimilarOpportunitiesBlock from '../../blocks/job-posting-blocks/similar-opportunities.js';

// const bkg_grey_lt = '#E8E8E8';
// const text_dark   = '#3E3E3E';
const btnBlue = '#1473E6';

/**
 * @param {HTMLElement} $page
 */
export default async function decorate() {
  /* Add classes and ids to container elements */
  const bodyJobPost = document.querySelector('body');
  bodyJobPost.classList.add('job-post');
  document.querySelector('#global-header').classList.add('split');
  document.querySelector('div#global-background').remove();
  const postContainer = document.querySelector('main > div.section-wrapper');
  postContainer.classList.add('post-container');
  const postText = document.querySelector('.post-container > div');
  postText.classList.add('post-text');

  /* Assemble "Apply Now" Button. It'll be used 3x */
  /* Declare the function for "onClick" action */

  // eslint-disable-next-line no-unused-vars
  const jobURL = getMetadata('job-title');
  const buttonFunction = () => {
    // eslint-disable-next-line no-console
    console.log(' Clicked Apply Now Button');
  };
  const $buttonApplyNow = addButton('Apply Now', buttonFunction, 'filled lt-bkg', btnBlue);
  // postBody.append($buttonApplyNow);
  // -- START Job Position details subheader --//
  const $blurb = $element('.dek_blurb', getMetadata('dek'));
  const $location = $element('p.detail-value', getMetadata('location'));
  const $positionType = $element('p.detail-value', getMetadata('position-type'));
  const $reqNumber = $element('p.detail-value', getMetadata('req-number') || 'None Provided');
  const $headerDetails = $element('div.subhead-container', [
    $element('div.details', [
      $element('span.detail', [
        $element('p.detail-label', 'Location'),
        $location,
      ]),
      $element('span.detail', [
        $element('p.detail-label', 'Position Type'),
        $positionType,
      ]),
      $element('span.detail', [
        $element('p.detail-label', 'Req Number'), $reqNumber,
      ]),
    ]),
    // $blurb
  ]);
  const $xsHeaderDetails = $headerDetails.cloneNode(true);
  const $lHeaderDetails = $headerDetails.cloneNode(true);
  // -- End Job Position details subheader --//

  // -- START Job Posting Body Text Block --//
  const jobTitleH1 = postContainer.querySelector('h1');
  jobTitleH1.classList.add('job-title');

  jobTitleH1.after($xsHeaderDetails); /** Insert .dek after h1.job-title */
  $xsHeaderDetails.after($blurb);

  // -- END   Job Posting Body Text Block --//

  // -- START Sticky bits: --//
  const stickyContainer = $element('div.sticky-container');
  postContainer.prepend(stickyContainer);
  stickyContainer.append($buttonApplyNow);
  stickyContainer.append($lHeaderDetails);

  // -- END Sticky bits: --//

  // -- Start Delete --//
  const uselessBoxElm = $element('div.boxy', $element('p.stuff', 'WOrds and stuff'));
  bodyJobPost.prepend(uselessBoxElm);
  // -- END Delete --//

  $addMiddleElm(
    document.querySelector('div.section-wrapper'),
    '.post-body',
    document.querySelector('.post-text'),
  );

  /* ------------------------------------------------------------ */
  /* Assemble "Equal Opportunities" + "About Adobe Design" blocks */
  // eslint-disable-next-line no-use-before-define
  buildJobBlockFragments();
  /* Assemble "Similar Opportunities" block */
  // eslint-disable-next-line no-use-before-define
  buildSimOpportunitiesBlock();
  document.querySelector('main').append($element('div.similarOpps-block'));
}

async function buildSimOpportunitiesBlock() {
  const simOppsContent = await makeSimilarOpportunitiesBlock('nothing');
  if (simOppsContent) {
    document.querySelector('div.similarOpps-block').append(simOppsContent);
  } else {
    // eslint-disable-next-line no-console
    console.log('Cannot fetch similar opportunities to build the block');
  }
}

async function buildJobBlockFragments() {
  const aboutURL = 'about-adobe-design';
  const eopsURL = 'equal-opportunity-policy-stmnt';

  /* ----- About Adobe Design Element -----  */
  /** Get "About Adobe Design" Fragment: */
  const aboutInnerHTML = await getJobsFragment(aboutURL);
  if (aboutInnerHTML) {
    const aboutElm = $element('div.about-adobe-design');
    aboutElm.innerHTML = aboutInnerHTML;
    document.querySelector('main').append(aboutElm);
  } else {
    // eslint-disable-next-line no-console
    console.log(`Cannot fetch ${aboutURL} fragment or fragment doesn't exist`);
  }

  /* ------ Equal Opportunities Policy ------- */
  /** Get "Equal Opportunity Policy" Fragment: */
  const eopsInnerHtml = await getJobsFragment(eopsURL);

  if (eopsInnerHtml) {
    const eqOpPolicy = $element('div.eq-op-policy-stmnt');
    eqOpPolicy.innerHTML = eopsInnerHtml;
    document.querySelector('main').append(eqOpPolicy);
  } else {
    // eslint-disable-next-line no-console
    console.log(`Cannot fetch ${eopsURL} fragment or fragment doesn't exist`);
  }
}
