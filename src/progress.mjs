export const DEFAULT_PROGRESS = "TODO";

export const PROGRESS_OPTIONS = [
  { key: DEFAULT_PROGRESS, label: "待做", color: "#374151" },
  { key: "WORKING", label: "攻略中", color: "#2563eb" },
  { key: "TOO_HARD", label: "太难了，不会", color: "#dc2626" },
  { key: "REVIEW_NEEDED", label: "回头复习下", color: "#d97706" },
  { key: "AC", label: "过了", color: "#16a34a" },
];

export const PROGRESS_STORAGE_KEY = "lc-coding-progress";
export const PROGRESS_HISTORY_STORAGE_KEY = "lc-coding-progress-history";
export const PROGRESS_UPDATED_AT_STORAGE_KEY = "lc-coding-progress-updated-at";

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

export function normalizeProgressUpdatedAt(updatedAt) {
  if (!updatedAt) {
    return {};
  }
  if (typeof updatedAt !== "object" || Array.isArray(updatedAt)) {
    throw new Error("进度更新时间格式不正确");
  }

  return Object.entries(updatedAt).reduce((acc, [id, value]) => {
    if (typeof value !== "string" || Number.isNaN(Date.parse(value))) {
      throw new Error("进度更新时间格式不正确");
    }
    acc[id] = value;
    return acc;
  }, {});
}

export function normalizeProgressHistory(history) {
  if (!history) {
    return {};
  }
  if (typeof history !== "object" || Array.isArray(history)) {
    throw new Error("进度历史格式不正确");
  }

  return Object.entries(history).reduce((acc, [id, events]) => {
    if (!Array.isArray(events)) {
      throw new Error("进度历史格式不正确");
    }

    const normalizedEvents = events.map((event) => {
      if (!event || typeof event !== "object" || Array.isArray(event)) {
        throw new Error("进度历史格式不正确");
      }
      if (
        !validProgressKeys.has(event.from) ||
        !validProgressKeys.has(event.to)
      ) {
        throw new Error("进度历史包含未知进度");
      }
      if (typeof event.at !== "string" || Number.isNaN(Date.parse(event.at))) {
        throw new Error("进度历史时间格式不正确");
      }
      return {
        from: event.from,
        to: event.to,
        at: event.at,
      };
    });

    if (normalizedEvents.length > 0) {
      acc[id] = normalizedEvents;
    }
    return acc;
  }, {});
}

export function updatedAtFromHistory(history) {
  const normalizedHistory = normalizeProgressHistory(history);

  return Object.entries(normalizedHistory).reduce((acc, [id, events]) => {
    const latest = events[events.length - 1];
    if (latest) {
      acc[id] = latest.at;
    }
    return acc;
  }, {});
}

function filterUpdatedAtByProgress(updatedAt, progress) {
  if (!progress || Object.keys(progress).length === 0) {
    return {};
  }

  return Object.keys(progress).reduce((acc, id) => {
    if (updatedAt[id]) {
      acc[id] = updatedAt[id];
    }
    return acc;
  }, {});
}

export function serializeProgress(progress, updatedAt) {
  const normalizedProgress = normalizeProgress(progress);
  const normalizedUpdatedAt = filterUpdatedAtByProgress(
    normalizeProgressUpdatedAt(updatedAt),
    normalizedProgress
  );
  const hasUpdatedAt = Object.keys(normalizedUpdatedAt).length > 0;

  return JSON.stringify(
    {
      version: hasUpdatedAt ? 2 : 1,
      exportedAt: new Date().toISOString(),
      progress: normalizedProgress,
      ...(hasUpdatedAt ? { updatedAt: normalizedUpdatedAt } : {}),
    },
    null,
    2
  );
}

function parseProgressJson(json) {
  let parsed;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error("不是有效的 JSON");
  }
  return parsed;
}

export function importProgress(json) {
  const parsed = parseProgressJson(json);
  const progress = parsed?.progress ?? parsed;
  return normalizeProgress(progress);
}

export function importProgressUpdatedAt(json) {
  const parsed = parseProgressJson(json);
  const progress = parsed?.progress ? normalizeProgress(parsed.progress) : null;
  const updatedAt = parsed?.updatedAt
    ? normalizeProgressUpdatedAt(parsed.updatedAt)
    : updatedAtFromHistory(parsed?.history);

  if (progress) {
    return filterUpdatedAtByProgress(updatedAt, progress);
  }

  return updatedAt;
}

export function importProgressHistory(json) {
  const parsed = parseProgressJson(json);
  return normalizeProgressHistory(parsed?.history);
}

export function exportProgress(progress, urlApi = URL, updatedAt) {
  const content = serializeProgress(progress, updatedAt);
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
