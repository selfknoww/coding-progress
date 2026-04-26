import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_PROGRESS,
  exportProgress,
  importProgressUpdatedAt,
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

test("serializeProgress can include status updated times", () => {
  const json = serializeProgress(
    { 70: "AC", 198: DEFAULT_PROGRESS },
    {
      70: "2026-04-26T12:00:00.000Z",
      198: "2026-04-25T12:00:00.000Z",
      999: "2026-04-24T12:00:00.000Z",
    }
  );
  const parsed = JSON.parse(json);

  assert.equal(parsed.version, 2);
  assert.deepEqual(parsed.updatedAt, {
    70: "2026-04-26T12:00:00.000Z",
  });
});

test("importProgressUpdatedAt ignores timestamps outside current progress", () => {
  assert.deepEqual(
    importProgressUpdatedAt(
      JSON.stringify({
        version: 2,
        progress: { 70: "AC" },
        updatedAt: {
          70: "2026-04-26T12:00:00.000Z",
          999: "2026-04-25T12:00:00.000Z",
        },
      })
    ),
    {
      70: "2026-04-26T12:00:00.000Z",
    }
  );
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

test("importProgressUpdatedAt accepts version 2 timestamps and legacy history", () => {
  assert.deepEqual(
    importProgressUpdatedAt(
      JSON.stringify({
        version: 2,
        progress: { 70: "AC" },
        updatedAt: {
          70: "2026-04-26T12:00:00.000Z",
        },
      })
    ),
    {
      70: "2026-04-26T12:00:00.000Z",
    }
  );
  assert.deepEqual(
    importProgressUpdatedAt(
      JSON.stringify({
        history: {
          70: [
            { from: DEFAULT_PROGRESS, to: "AC", at: "2026-04-20T12:00:00.000Z" },
            { from: "AC", to: "REVIEW_NEEDED", at: "2026-04-21T12:00:00.000Z" },
          ],
        },
      })
    ),
    { 70: "2026-04-21T12:00:00.000Z" }
  );
  assert.deepEqual(importProgressUpdatedAt(JSON.stringify({ 70: "AC" })), {});
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
