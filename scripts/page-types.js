import { addPageTypeDecorator } from './page-type-decorator.js';

export default function registerPageTypes() {
  addPageTypeDecorator('home', { path: '/' });
  addPageTypeDecorator('toolkit', { path: '/toolkit' });
  addPageTypeDecorator('inclusive', { path: '/toolkit/*' });
  addPageTypeDecorator('jobs', { path: '/jobs' });
  addPageTypeDecorator('article', { path: '/stories/*' });
  addPageTypeDecorator('team', { path: '/team' });
  addPageTypeDecorator('job-post', { path: '/jobs/*' });
  addPageTypeDecorator('stories-index', { path: '/stories/' });
  /* addPageTypeDecorator({ path: "job-post" }, decorateJobPost); */
}
