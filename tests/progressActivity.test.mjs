import test from "node:test";
import assert from "node:assert/strict";

import {
  countRecentAc,
  formatActivityDate,
  formatRelativeActivityTime,
  getProblemUpdatedAt,
  getRecentAcActivities,
  groupActivitiesByDate,
} from "../src/progressActivity.mjs";

const now = new Date("2026-04-26T12:00:00.000Z");

test("getProblemUpdatedAt returns the status updated time for a problem", () => {
  assert.equal(
    getProblemUpdatedAt({ 70: "2026-04-25T08:00:00.000Z" }, "70"),
    "2026-04-25T08:00:00.000Z"
  );
});

test("formatRelativeActivityTime uses compact GitHub-like labels", () => {
  assert.equal(
    formatRelativeActivityTime("2026-04-26T08:00:00.000Z", now),
    "today"
  );
  assert.equal(
    formatRelativeActivityTime("2026-04-25T08:00:00.000Z", now),
    "yesterday"
  );
  assert.equal(
    formatRelativeActivityTime("2026-04-17T08:00:00.000Z", now),
    "last week"
  );
  assert.equal(
    formatRelativeActivityTime("2026-03-26T08:00:00.000Z", now),
    "on Mar 26"
  );
});

test("getRecentAcActivities keeps current AC problems and groups by date", () => {
  const progress = {
    70: "AC",
    198: "AC",
    322: "REVIEW_NEEDED",
    416: "AC",
  };
  const updatedAt = {
    70: "2026-04-25T08:00:00.000Z",
    198: "2026-04-25T09:00:00.000Z",
    322: "2026-04-17T08:00:00.000Z",
    416: "2026-04-17T08:00:00.000Z",
  };
  const titleById = {
    70: "70. 爬楼梯",
    198: "198. 打家劫舍",
    416: "416. 分割等和子集",
  };
  const activities = getRecentAcActivities(progress, updatedAt, titleById, { now });
  const groups = groupActivitiesByDate(activities);

  assert.deepEqual(
    activities.map((item) => item.problemId),
    ["198", "70", "416"]
  );
  assert.equal(groups[0].label, "AC on Apr 25, 2026");
  assert.deepEqual(
    groups[0].items.map((item) => item.title),
    ["198. 打家劫舍", "70. 爬楼梯"]
  );
  assert.equal(formatActivityDate("2026-04-17T08:00:00.000Z"), "Apr 17, 2026");
});

test("countRecentAc counts unique problems ACed in recent windows", () => {
  const progress = {
    70: "AC",
    198: "AC",
    322: "AC",
    416: "REVIEW_NEEDED",
  };
  const updatedAt = {
    70: "2026-04-26T08:00:00.000Z",
    198: "2026-04-24T08:00:00.000Z",
    322: "2026-04-19T08:00:00.000Z",
    416: "2026-04-26T08:00:00.000Z",
  };

  assert.deepEqual(countRecentAc(progress, updatedAt, now), {
    today: 1,
    threeDays: 2,
    sevenDays: 3,
  });
});
