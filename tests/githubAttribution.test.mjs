import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const readmeSource = readFileSync(
  new URL("../README.md", import.meta.url),
  "utf8"
);

const topNavSource = readFileSync(
  new URL("../components/TopNav/index.tsx", import.meta.url),
  "utf8"
);

const githubRepoLinkSource = readFileSync(
  new URL("../components/GitHubRepoLink/index.tsx", import.meta.url),
  "utf8"
);

const globalStyle = readFileSync(
  new URL("../app/globals.scss", import.meta.url),
  "utf8"
);

test("README credits the lc-rating v0 source", () => {
  assert.match(readmeSource, /https:\/\/github\.com\/huxulm\/lc-rating/);
  assert.match(readmeSource, /v0/);
});

test("top nav links to this repository", () => {
  assert.match(topNavSource, /GitHubRepoLink/);
  assert.match(
    githubRepoLinkSource,
    /https:\/\/github\.com\/selfknoww\/coding-progress/
  );
  assert.match(githubRepoLinkSource, /FaGithub/);
  assert.match(githubRepoLinkSource, /FaStar/);
  assert.match(globalStyle, /\.github-repo-link/);
});

test("github repo link loads live star count", () => {
  assert.match(
    githubRepoLinkSource,
    /https:\/\/api\.github\.com\/repos\/selfknoww\/coding-progress/
  );
  assert.match(githubRepoLinkSource, /stargazers_count/);
  assert.match(githubRepoLinkSource, /formatStarCount/);
});
