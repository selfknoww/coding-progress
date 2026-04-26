import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const categorySource = readFileSync(
  new URL("../components/ProblemCatetory/index.tsx", import.meta.url),
  "utf8"
);

const listSource = readFileSync(
  new URL(
    "../components/ProblemCatetory/ProblemCategoryList/index.tsx",
    import.meta.url
  ),
  "utf8"
);

const categoryStyle = readFileSync(
  new URL("../components/ProblemCatetory/_index.scss", import.meta.url),
  "utf8"
);

test("problem category summary uses a full-width block layout", () => {
  assert.doesNotMatch(categorySource, /d-inline-block/);
  assert.match(categorySource, /className="[^"]*summary/);
});

test("problem rows use stable grid columns instead of multi-column lists", () => {
  assert.match(listSource, /className="problem-row"/);
  assert.match(listSource, /className="problem-main"/);
  assert.match(listSource, /className="problem-meta"/);
  assert.match(listSource, /className="problem-progress"/);
  assert.doesNotMatch(listSource, /getCols/);
  assert.doesNotMatch(categoryStyle, /columns:\s*[23]/);
  assert.doesNotMatch(categoryStyle, /\.level-2,\s*\n\s*\.level-4\s*\{[\s\S]*display:\s*flex/);
});

test("problem rows expose solution links when present", () => {
  assert.match(listSource, /getSolutionHref/);
  assert.match(listSource, /题解/);
});

test("problem rows show the latest AC time from status updatedAt", () => {
  assert.match(listSource, /progressUpdatedAt/);
  assert.match(listSource, /getProblemUpdatedAt/);
  assert.match(listSource, /Last AC/);
  assert.match(categoryStyle, /\.last-ac-time/);
});

test("problem status changes require confirmation because they update time", () => {
  assert.match(listSource, /pendingChange/);
  assert.match(listSource, /confirmProgressChange/);
  assert.match(listSource, /Confirm status change/);
  assert.match(listSource, /refresh its updated time/);
});

test("problem status uses a compact menu instead of a full select", () => {
  assert.match(listSource, /Dropdown/);
  assert.match(listSource, /status-menu-toggle/);
  assert.match(listSource, /Set/);
  assert.match(listSource, /disabled=\{p === option\.key\}/);
  assert.doesNotMatch(listSource, /<Form\.Select/);
});

test("accepted problem rows have a distinct visual state", () => {
  assert.match(listSource, /data-status/);
  assert.match(listSource, /option\.key/);
  assert.match(categoryStyle, /data-status="AC"/);
});

test("dark mode does not use light summary panels", () => {
  assert.match(categoryStyle, /@include color-mode\(dark, false\)/);
  assert.match(categoryStyle, /\.summary\s*\{[\s\S]*background:\s*rgb\(26, 28, 31\)/);
  assert.match(categoryStyle, /\.summary\s*\{[\s\S]*color:\s*rgb\(229, 231, 235\)/);
  assert.doesNotMatch(
    categoryStyle,
    /@include color-mode\(dark, false\)[\s\S]*\.summary\s*\{[\s\S]*background:\s*rgba\(251, 251, 251/
  );
});

test("root source heading does not render an aggregate progress badge", () => {
  assert.match(categorySource, /level > 0/);
  assert.doesNotMatch(categorySource, /data && data\.length > 0 \? \(/);
});
