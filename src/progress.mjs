export const DEFAULT_PROGRESS = "TODO";

export const PROGRESS_OPTIONS = [
  { key: DEFAULT_PROGRESS, label: "待做", color: "#374151" },
  { key: "WORKING", label: "攻略中", color: "#2563eb" },
  { key: "TOO_HARD", label: "太难了，不会", color: "#dc2626" },
  { key: "REVIEW_NEEDED", label: "回头复习下", color: "#d97706" },
  { key: "AC", label: "过了", color: "#16a34a" },
];

export const PROGRESS_STORAGE_KEY = "lc-coding-progress";

const validProgressKeys = new Set(PROGRESS_OPTIONS.map((option) => option.key));

export function parseProblemId(title) {
  const value = String(title || "").trim();
  const numeric = value.match(/^(\d+)\.\s+/);
  if (numeric) {
    return numeric[1];
  }

  const special = value.match(/^(.+?\s+\d+(?:\.\d+)?)\.\s+/);
  if (special) {
    return special[1];
  }

  return value;
}

export function normalizeProgress(progress) {
  if (!progress || typeof progress !== "object" || Array.isArray(progress)) {
    throw new Error("进度数据格式不正确");
  }

  return Object.entries(progress).reduce((acc, [id, value]) => {
    if (!validProgressKeys.has(value)) {
      throw new Error(`未知进度: ${value}`);
    }
    if (value !== DEFAULT_PROGRESS) {
      acc[id] = value;
    }
    return acc;
  }, {});
}

export function serializeProgress(progress) {
  return JSON.stringify(
    {
      version: 1,
      exportedAt: new Date().toISOString(),
      progress: normalizeProgress(progress),
    },
    null,
    2
  );
}

export function importProgress(json) {
  let parsed;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error("不是有效的 JSON");
  }

  const progress = parsed?.progress ?? parsed;
  return normalizeProgress(progress);
}

export function exportProgress(progress, urlApi = URL) {
  const content = serializeProgress(progress);
  const blob = new Blob([content], { type: "application/json" });
  const date = new Date().toISOString().slice(0, 10);

  return {
    filename: `lc-coding-progress-${date}.json`,
    url: urlApi.createObjectURL(blob),
  };
}

export function getProgressOption(key) {
  return (
    PROGRESS_OPTIONS.find((option) => option.key === key) ||
    PROGRESS_OPTIONS[0]
  );
}
