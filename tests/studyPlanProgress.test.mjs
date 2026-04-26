import test from "node:test";
import assert from "node:assert/strict";
import {
  collectProblemIds,
  getStudyPlanProgress,
} from "../src/studyPlanProgress.mjs";

const plan = {
  title: "plan",
  leafChild: [
    { title: "1. A" },
    { title: "2. B" },
  ],
  nonLeafChild: [
    {
      title: "chapter",
      leafChild: [{ title: "3. C" }],
      nonLeafChild: [{ title: "empty", leafChild: [], nonLeafChild: [] }],
    },
  ],
};

test("collectProblemIds walks the whole category subtree", () => {
  assert.deepEqual(collectProblemIds(plan), ["1", "2", "3"]);
});

test("getStudyPlanProgress derives started and completed counts from problem progress", () => {
  assert.deepEqual(
    getStudyPlanProgress(plan, {
      1: "AC",
      2: "WORKING",
      3: "TODO",
    }),
    {
      total: 3,
      started: 2,
      completed: 1,
      percent: 33,
    }
  );
});
