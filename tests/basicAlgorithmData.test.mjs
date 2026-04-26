import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const basicAlgorithmSource = readFileSync(
  new URL(
    "../components/containers/List/data/basic_algorithm.ts",
    import.meta.url
  ),
  "utf8"
);

const studyPlansSource = readFileSync(
  new URL("../config/studyPlans.ts", import.meta.url),
  "utf8"
);

test("basic algorithm data keeps the bilibili collection structure", () => {
  const videoCategoryCount = (
    basicAlgorithmSource.match(/videoCategory\("/g) || []
  ).length;
  const problemCount = (basicAlgorithmSource.match(/\bproblem\("/g) || [])
    .length;

  assert.equal(videoCategoryCount, 27);
  assert.equal(problemCount, 215);
  assert.match(
    basicAlgorithmSource,
    /两数之和 三数之和【基础算法精讲 01】/
  );
  assert.match(basicAlgorithmSource, /summary: `<a href="\$\{videoUrl\}">视频链接<\/a><br>`/);
});

test("basic algorithm is registered as a study plan", () => {
  assert.match(studyPlansSource, /import basicAlgorithm/);
  assert.match(studyPlansSource, /basic_algorithm:\s*{/);
  assert.match(studyPlansSource, /href:\s*"\/list\/basic_algorithm"/);
});
