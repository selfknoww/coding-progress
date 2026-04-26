import { DEFAULT_PROGRESS, parseProblemId } from "./progress.mjs";

export function collectProblemIds(node) {
  if (!node) {
    return [];
  }

  const leafIds = (node.leafChild || []).map((item) =>
    parseProblemId(item.title)
  );
  const childIds = (node.nonLeafChild || []).flatMap((child) =>
    collectProblemIds(child)
  );

  return [...leafIds, ...childIds];
}

export function getStudyPlanProgress(node, progress = {}) {
  const ids = collectProblemIds(node);
  const total = ids.length;
  const started = ids.filter((id) => progress[id] && progress[id] !== DEFAULT_PROGRESS)
    .length;
  const completed = ids.filter((id) => progress[id] === "AC").length;

  return {
    total,
    started,
    completed,
    percent: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}
