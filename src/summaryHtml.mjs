import { marked } from "marked";
import katex from "katex";

marked.use({
  gfm: true,
  breaks: false,
});

export function normalizeV0Summary(summary) {
  const markdown = completeOrphanCodeFence(String(summary ?? "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/(<img\b[^>]*>)\n(?!\n)/gi, "$1\n\n"));

  return normalizeCodeFences(markdown);
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

function normalizeCodeFences(markdown) {
  return markdown.replace(/```([^\n]*)\n([\s\S]*?)```/g, (_, info, code) => {
    const normalizedCode = restoreFlattenedCodeIndentation(info, code);
    return `\`\`\`${info}\n${normalizedCode}\`\`\``;
  });
}

function restoreFlattenedCodeIndentation(info, code) {
  const lines = code.replace(/\n+$/g, "").split("\n");
  const nonEmptyLines = lines.filter((line) => line.trim());

  if (
    nonEmptyLines.length < 4 ||
    nonEmptyLines.some((line) => /^\s/.test(line))
  ) {
    return code;
  }

  const language = String(info || "").trim().split(/\s+/)[0].toLowerCase();

  if (["py", "python", "python3"].includes(language)) {
    return restoreFlattenedPythonIndentation(lines);
  }

  if (["java", "cpp", "c++", "go", "golang", "js", "ts"].includes(language)) {
    return restoreBraceIndentation(lines);
  }

  return code;
}

function restoreFlattenedPythonIndentation(lines) {
  const stack = [];
  const rendered = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      rendered.push("");
      continue;
    }

    if (/^def\s+/.test(line) && stack.some((block) => block.type === "def")) {
      popUntilNearestDefBody(stack);
    }

    if (/^return\b/.test(line)) {
      const defIndex = findNearestBlock(stack, "def");
      const indent = defIndex >= 0 ? stack[defIndex].indent + 1 : currentIndent(stack);
      rendered.push(`${"    ".repeat(indent)}${line}`);
      stack.splice(defIndex >= 0 ? defIndex : 0);
      continue;
    }

    while (shouldCloseForBlockBeforeLine(stack, line)) {
      stack.pop();
    }

    const indent = currentIndent(stack);
    rendered.push(`${"    ".repeat(indent)}${line}`);
    markBodyLine(stack, indent);

    if (line.endsWith(":")) {
      stack.push({
        type: pythonBlockType(line),
        indent,
        vars: pythonLoopVars(line),
        bodyLines: 0,
      });
    }
  }

  return `${rendered.join("\n")}\n`;
}

function currentIndent(stack) {
  const currentBlock = stack.at(-1);
  return currentBlock ? currentBlock.indent + 1 : 0;
}

function markBodyLine(stack, indent) {
  const currentBlock = stack.at(-1);
  if (currentBlock && indent > currentBlock.indent) {
    currentBlock.bodyLines += 1;
  }
}

function popUntilNearestDefBody(stack) {
  const defIndex = findNearestBlock(stack, "def");
  if (defIndex >= 0) {
    stack.splice(defIndex + 1);
  }
}

function findNearestBlock(stack, type) {
  for (let i = stack.length - 1; i >= 0; i -= 1) {
    if (stack[i].type === type) {
      return i;
    }
  }
  return -1;
}

function shouldCloseForBlockBeforeLine(stack, line) {
  const currentBlock = stack.at(-1);
  return (
    currentBlock?.type === "for" &&
    currentBlock.bodyLines > 0 &&
    currentBlock.vars.length > 0 &&
    !currentBlock.vars.some((name) =>
      new RegExp(`\\b${escapeRegExp(name)}\\b`).test(line)
    )
  );
}

function pythonBlockType(line) {
  const match = line.match(/^([A-Za-z_]\w*)\b/);
  return match?.[1] || "block";
}

function pythonLoopVars(line) {
  const match = line.match(/^for\s+(.+?)\s+in\s+/);
  if (!match) {
    return [];
  }

  return match[1]
    .split(",")
    .map((part) => part.trim())
    .filter((part) => /^[A-Za-z_]\w*$/.test(part));
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function restoreBraceIndentation(lines) {
  let indent = 0;

  return `${lines
    .map((rawLine) => {
      const line = rawLine.trim();
      if (!line) {
        return "";
      }

      if (/^[})\]]/.test(line)) {
        indent = Math.max(indent - 1, 0);
      }

      const rendered = `${"    ".repeat(indent)}${line}`;
      const opens = (line.match(/[({\[]/g) || []).length;
      const closes = (line.match(/[)}\]]/g) || []).length;
      indent = Math.max(indent + opens - closes, 0);
      return rendered;
    })
    .join("\n")}\n`;
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
