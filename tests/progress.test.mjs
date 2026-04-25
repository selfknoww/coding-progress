import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_PROGRESS,
  exportProgress,
  importProgress,
  parseProblemId,
  serializeProgress,
} from "../src/progress.mjs";

test("parseProblemId extracts the numeric prefix before the title", () => {
  assert.equal(parseProblemId("70. 爬楼梯"), "70");
  assert.equal(parseProblemId("面试题 16.19. 水域大小"), "面试题 16.19");
  assert.equal(parseProblemId("LCS 03. 主题空间"), "LCS 03");
});

test("serializeProgress omits todo entries and stores metadata", () => {
  const json = serializeProgress({
    70: "AC",
    746: DEFAULT_PROGRESS,
    198: "REVIEW_NEEDED",
  });
  const parsed = JSON.parse(json);

  assert.equal(parsed.version, 1);
  assert.deepEqual(parsed.progress, {
    70: "AC",
    198: "REVIEW_NEEDED",
  });
  assert.equal(typeof parsed.exportedAt, "string");
});

test("importProgress accepts current export format and legacy plain maps", () => {
  assert.deepEqual(
    importProgress(JSON.stringify({ version: 1, progress: { 70: "AC" } })),
    { 70: "AC" }
  );
  assert.deepEqual(importProgress(JSON.stringify({ 198: "WORKING" })), {
    198: "WORKING",
  });
});

test("importProgress rejects malformed JSON and invalid progress values", () => {
  assert.throws(() => importProgress("{"), /不是有效的 JSON/);
  assert.throws(
    () => importProgress(JSON.stringify({ progress: { 70: "DONE" } })),
    /未知进度/
  );
});

test("exportProgress creates a downloadable JSON blob URL", () => {
  const result = exportProgress({ 70: "AC" }, {
    createObjectURL(blob) {
      assert.equal(blob.type, "application/json");
      return "blob:test";
    },
  });

  assert.equal(result.url, "blob:test");
  assert.match(result.filename, /^lc-coding-progress-\d{4}-\d{2}-\d{2}\.json$/);
});
