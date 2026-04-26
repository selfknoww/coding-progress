import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const homeSource = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const topNavSource = readFileSync(
  new URL("../components/TopNav/index.tsx", import.meta.url),
  "utf8"
);
const listPageSource = readFileSync(
  new URL("../app/list/[slug]/page.tsx", import.meta.url),
  "utf8"
);
const globalStyle = readFileSync(
  new URL("../app/globals.scss", import.meta.url),
  "utf8"
);
const progressBadgeSource = readFileSync(
  new URL("../components/StudyPlanProgressBadge/index.tsx", import.meta.url),
  "utf8"
);
const categorySource = readFileSync(
  new URL("../components/ProblemCatetory/index.tsx", import.meta.url),
  "utf8"
);
const categoryListSource = readFileSync(
  new URL(
    "../components/ProblemCatetory/ProblemCategoryList/index.tsx",
    import.meta.url
  ),
  "utf8"
);

test("top navigation is slim and does not render every study plan", () => {
  assert.doesNotMatch(topNavSource, /studyPlans/);
  assert.doesNotMatch(topNavSource, /Object\.entries\(studyPlans\)/);
  assert.match(topNavSource, /GitHubRepoLink/);
  assert.match(topNavSource, /ProgressBackup/);
});

test("home page is a grouped study plan dashboard", () => {
  assert.match(homeSource, /home-dashboard/);
  assert.match(homeSource, /基础算法精讲/);
  assert.match(homeSource, /Hot 100/);
  assert.match(homeSource, /0x3f 算法题单/);
  assert.match(homeSource, /dashboard-card/);
  assert.match(homeSource, /category-grid/);
  assert.match(homeSource, /StudyPlanProgressBadge/);
});

test("list pages include a compact study plan switcher", () => {
  assert.match(listPageSource, /StudyPlanSwitcher/);
  assert.match(globalStyle, /\.study-plan-switcher/);
});

test("study plan and category progress are displayed without new storage data", () => {
  assert.match(progressBadgeSource, /getStudyPlanProgress/);
  assert.match(progressBadgeSource, /useQuestProgress/);
  assert.match(progressBadgeSource, /completed/);
  assert.match(categorySource, /StudyPlanProgressBadge/);
  assert.match(categoryListSource, /StudyPlanProgressBadge/);
  assert.match(globalStyle, /\.progress-badge/);
});

test("dashboard category cards leave room for readable titles", () => {
  assert.match(globalStyle, /grid-template-columns:\s*repeat\(auto-fit,\s*minmax\(15rem,\s*1fr\)\)/);
  assert.match(globalStyle, /\.category-grid a\s*\{[\s\S]*flex-direction:\s*column/);
  assert.doesNotMatch(globalStyle, /minmax\(8\.5rem,\s*1fr\)/);
});
