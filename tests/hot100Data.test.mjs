import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const hot100Source = readFileSync(
  new URL("../components/containers/List/data/hot_100.ts", import.meta.url),
  "utf8"
);

const studyPlansSource = readFileSync(
  new URL("../config/studyPlans.ts", import.meta.url),
  "utf8"
);

test("hot 100 data has the official category count and question count", () => {
  const categoryCount = (hot100Source.match(/category\("/g) || []).length;
  const questionCount = (hot100Source.match(/\bproblem\(/g) || []).length;

  assert.equal(categoryCount, 17);
  assert.equal(questionCount, 100);
});

test("hot 100 is registered as a study plan", () => {
  assert.match(studyPlansSource, /import hot100/);
  assert.match(studyPlansSource, /hot_100:\s*{/);
  assert.match(studyPlansSource, /href:\s*"\/list\/hot_100"/);
});

test("hot 100 keeps available zerotrac ratings", () => {
  assert.match(hot100Source, /"763": 1443\.0697629277/);
  assert.match(hot100Source, /"994": 1432\.9051050881/);
  assert.match(hot100Source, /score:\s*HOT_100_RATINGS\[id\] \?\? null/);
});
