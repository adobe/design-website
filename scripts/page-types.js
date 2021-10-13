import { addPageTypeDecorator } from "./page-type-decorator.js";
import decorateArticle from "./pages/article.js";
import decorateJobPost from "./pages/job-post.js";
import decorateTeam from "./pages/team.js";
import decorateToolkit from "./pages/toolkit.js";
import decorateInclusive from "./pages/inclusive.js";
import decorateJobs from "./pages/jobs.js";

export default function registerPageTypes() {
    addPageTypeDecorator({ path: "/toolkit" }, decorateToolkit);
    addPageTypeDecorator({ path: "/inclusive" }, decorateInclusive);
    addPageTypeDecorator({ path: "/jobs" }, decorateJobs);
    addPageTypeDecorator({ path: "/stories/*" }, decorateArticle);
    addPageTypeDecorator({ path: "/team" }, decorateTeam);
    addPageTypeDecorator({ path: "/jobs/*" }, decorateJobPost);
    // addPageTypeDecorator({ path: "job-post" }, decorateJobPost);
}
