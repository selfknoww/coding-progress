import test from "node:test";
import assert from "node:assert/strict";

import { normalizeV0Summary, renderSummaryHtml } from "../src/summaryHtml.mjs";

test("normalizes v0 br separators into markdown line breaks", () => {
  assert.equal(normalizeV0Summary("模板：<br>```py<br>x = 1<br>```"), "模板：\n```py\nx = 1\n```");
});

test("renders v0 image followed by markdown blockquote", () => {
  const html = renderSummaryHtml(
    '<img src="https://example.com/a.png" alt="a" style="width: 100%;"><br>> 他向远方望去'
  );

  assert.match(html, /<img src="https:\/\/example\.com\/a\.png"/);
  assert.match(html, /<blockquote>/);
  assert.match(html, /他向远方望去/);
});

test("renders fenced code blocks from v0 summaries", () => {
  const html = renderSummaryHtml("模板：<br>```py [sol-Python3]<br>def nearestGreater(nums):<br>    return nums<br>```");

  assert.match(html, /<pre><code class="language-py/);
  assert.match(html, /def nearestGreater/);
  assert.doesNotMatch(html, /```/);
});

test("wraps orphan v0 code fragments that only contain the closing fence", () => {
  const html = renderSummaryHtml("def logTrick(nums: List[int]) -> None:<br>print(nums)<br>```<br>```java [sol-Java]<br>class Solution {}<br>```");

  assert.match(html, /<pre><code class="language-py/);
  assert.match(html, /def logTrick/);
  assert.match(html, /<pre><code class="language-java/);
  assert.doesNotMatch(html, /```/);
});

test("renders markdown tables from v0 summaries", () => {
  const html = renderSummaryHtml("| A | B |<br>|---|---|<br>| 1 | 2 |");

  assert.match(html, /<table>/);
  assert.match(html, /<td>1<\/td>/);
});

test("renders inline math with katex", () => {
  const html = renderSummaryHtml("需要满足 $0\\le i<j<k<n$，对比一下。");

  assert.match(html, /class="katex"/);
  assert.match(html, /0\\le i&lt;j&lt;k&lt;n/);
  assert.doesNotMatch(html, /\$0\\le/);
});

test("renders display math with katex", () => {
  const html = renderSummaryHtml("$$<br>a[0]\\cdot b[0] + a[n-1]\\cdot b[n-1]<br>$$");

  assert.match(html, /class="katex-display"/);
  assert.doesNotMatch(html, /\$\$/);
});
