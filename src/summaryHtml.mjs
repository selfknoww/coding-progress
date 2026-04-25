import { marked } from "marked";
import katex from "katex";

marked.use({
  gfm: true,
  breaks: false,
});

export function normalizeV0Summary(summary) {
  return completeOrphanCodeFence(String(summary ?? "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/(<img\b[^>]*>)\n(?!\n)/gi, "$1\n\n"));
}

export function renderSummaryHtml(summary) {
  const { markdown, placeholders } = extractMathPlaceholders(
    normalizeV0Summary(summary)
  );
  let html = marked.parse(markdown);

  placeholders.forEach((rendered, index) => {
    html = html.replaceAll(`LC_MATH_${index}`, rendered);
  });

  return html;
}

function completeOrphanCodeFence(markdown) {
  const firstFence = markdown.indexOf("```");
  if (firstFence < 0) {
    return markdown;
  }

  const beforeFirstFence = markdown.slice(0, firstFence).trim();
  if (!beforeFirstFence || !looksLikeCode(beforeFirstFence)) {
    return markdown;
  }

  return `\`\`\`py\n${markdown}`;
}

function looksLikeCode(text) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length < 2) {
    return false;
  }

  const codeLikeLines = lines.filter((line) =>
    /^(def |class |func |public |private |const |var |type |from |import |for |while |if |return |@cache\b|[A-Za-z_]\w*\s*=|[A-Za-z_]\w*\(|[A-Za-z_]\w*\s*:|MX\b|vector<|List<|Queue<|Deque<|\/\/|#)/.test(
      line
    )
  );

  return codeLikeLines.length / lines.length >= 0.45;
}

function extractMathPlaceholders(markdown) {
  const placeholders = [];
  const parts = markdown.split(/(```[\s\S]*?```)/g);

  const rendered = parts.map((part) => {
    if (part.startsWith("```")) {
      return part;
    }

    return replaceInlineMath(replaceDisplayMath(part, placeholders), placeholders);
  });

  return { markdown: rendered.join(""), placeholders };
}

function replaceDisplayMath(markdown, placeholders) {
  return markdown.replace(/\$\$([\s\S]+?)\$\$/g, (_, expression) =>
    addMathPlaceholder(placeholders, expression, true)
  );
}

function replaceInlineMath(markdown, placeholders) {
  return markdown.replace(/(^|[^\\$])\$([^\n$]+?)\$/g, (match, prefix, expression) => {
    return prefix + addMathPlaceholder(placeholders, expression, false);
  });
}

function addMathPlaceholder(placeholders, expression, displayMode) {
  const placeholder = `LC_MATH_${placeholders.length}`;
  placeholders.push(renderMath(expression, displayMode));
  return placeholder;
}

function renderMath(expression, displayMode) {
  return katex.renderToString(expression.trim(), {
    displayMode,
    throwOnError: false,
    strict: false,
  });
}
