import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const studyPlansSource = readFileSync(
  new URL("../config/studyPlans.ts", import.meta.url),
  "utf8"
);
const homeSource = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const sharedSource = readFileSync(
  new URL(
    "../components/containers/List/data/xiaohongshu_shared.ts",
    import.meta.url
  ),
  "utf8"
);

const files = {
  xhs_curated: readFileSync(
    new URL(
      "../components/containers/List/data/xiaohongshu_curated.ts",
      import.meta.url
    ),
    "utf8"
  ),
  xhs_hot_40: readFileSync(
    new URL(
      "../components/containers/List/data/xiaohongshu_hot_40.ts",
      import.meta.url
    ),
    "utf8"
  ),
};

test("only necessary xiaohongshu study plans are registered as separate lists", () => {
  for (const slug of Object.keys(files)) {
    assert.match(studyPlansSource, new RegExp(`${slug}:\\s*{`));
    assert.match(studyPlansSource, new RegExp(`href:\\s*"/list/${slug}"`));
  }
  assert.doesNotMatch(studyPlansSource, /xhs_numbered/);
  assert.doesNotMatch(studyPlansSource, /xhs_algorithm_20/);
  assert.doesNotMatch(studyPlansSource, /xhs_interview/);
});

test("home page renders xiaohongshu lists outside the 0x3f group", () => {
  assert.match(homeSource, /xhsPlanSlugs/);
  assert.match(homeSource, /小红书高频题单/);
  assert.match(homeSource, /xiaohongshu/);
  assert.doesNotMatch(homeSource, /xhs_algorithm_20/);
  assert.doesNotMatch(homeSource, /xhs_interview/);
});

test("xiaohongshu data keeps source attribution and representative problems", () => {
  assert.match(
    sharedSource,
    /https:\/\/www\.xiaohongshu\.com\/explore\/6961257e000000000b00b388/
  );
  for (const source of Object.values(files)) {
    assert.match(source, /createXiaohongshuPlan/);
  }

  assert.match(files.xhs_curated, /"15"/);
  assert.match(files.xhs_hot_40, /"128"/);
  assert.match(files.xhs_hot_40, /"1143"/);
  assert.doesNotMatch(files.xhs_curated, /"128"/);
  assert.match(sharedSource, /title: "三数之和"/);
  assert.match(sharedSource, /title: "LRU 缓存"/);
  assert.match(sharedSource, /title: "最长连续序列"/);
  assert.match(sharedSource, /title: "字符串解码"/);
  assert.match(sharedSource, /title: "实现 Trie \(前缀树\)"/);
});

test("curated list keeps the summary from the first four images", () => {
  assert.match(files.xhs_curated, /两数之和利用有序性质降低复杂度/);
  assert.match(files.xhs_curated, /滑动窗口维护一个区间状态/);
  assert.match(files.xhs_curated, /熟练掌握树的遍历/);
  assert.match(files.xhs_curated, /堆本质上也是树/);
});
