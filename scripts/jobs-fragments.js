/* eslint-disable import/prefer-default-export */
import { fetchFragment } from './helpers.js';

/**
 * Equal Opportunity Policy Statement

 */

// import { fetchFragment } from "./helpers.js";

const REL_PATH = 'equal-opportunity-policy-stmnt';
const RE_CLEAN_URL = /[^a-z0-9]/gi;
/**
 * Fetches Fragments from the jobs/ folder
 * @param {string} relPath Relative Path String
 * Assumes the jobs/ folder
 * Paths should be "equal-opportunity-policy-stmnt" OR "about-adobe-design"
 */
export async function getJobsFragment(relPath) {
  const currentPath = relPath || REL_PATH;
  const currentUrl = currentPath.replace(RE_CLEAN_URL, '-').toLowerCase();
  console.log(' CURRENT PATH: ', currentPath, '\n CURRENT URL ', currentUrl);
  try {
    const stmnt = await fetchFragment(`jobs/${currentUrl}`);
    return stmnt;
  } catch (err) {
    console.log(`Unable to fetch fragment: ${currentUrl}`);
    console.error(err);
    return null;
  }
}
