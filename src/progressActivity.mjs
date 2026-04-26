const DAY_MS = 24 * 60 * 60 * 1000;

const startOfLocalDay = (value) => {
  const date = new Date(value);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const dayDiff = (from, to) =>
  Math.max(0, Math.floor((startOfLocalDay(to) - startOfLocalDay(from)) / DAY_MS));

const formatMonthDay = (date, withYear = false) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    ...(withYear ? { year: "numeric" } : {}),
  }).format(new Date(date));

export function getProblemUpdatedAt(updatedAt, problemId) {
  return updatedAt?.[problemId] || null;
}

export function formatRelativeActivityTime(value, now = new Date()) {
  const diff = dayDiff(value, now);

  if (diff === 0) {
    return "today";
  }
  if (diff === 1) {
    return "yesterday";
  }
  if (diff < 7) {
    return `${diff} days ago`;
  }
  if (diff < 14) {
    return "last week";
  }
  if (diff < 30) {
    return `${Math.floor(diff / 7)} weeks ago`;
  }

  return `on ${formatMonthDay(value)}`;
}

export function formatActivityDate(value) {
  return formatMonthDay(value, true);
}

export function getRecentAcActivities(
  progress = {},
  updatedAt = {},
  titleById = {},
  options = {}
) {
  const { now = new Date(), limit = 20 } = options;

  return Object.entries(progress || {})
    .filter(([, status]) => status === "AC")
    .map(([id]) => {
      const at = getProblemUpdatedAt(updatedAt, id);
      if (!at) {
        return null;
      }
      return {
        problemId: id,
        title: titleById[id] || id,
        at,
        relativeTime: formatRelativeActivityTime(at, now),
      };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.at) - new Date(a.at))
    .slice(0, limit);
}

export function groupActivitiesByDate(activities) {
  const groups = [];
  const groupByDate = new Map();

  activities.forEach((activity) => {
    const date = startOfLocalDay(activity.at);
    const key = date.toISOString();

    if (!groupByDate.has(key)) {
      const group = {
        key,
        label: `AC on ${formatActivityDate(activity.at)}`,
        items: [],
      };
      groups.push(group);
      groupByDate.set(key, group);
    }

    groupByDate.get(key).items.push(activity);
  });

  return groups;
}

export function countRecentAc(progress = {}, updatedAt = {}, now = new Date()) {
  const acUpdatedTimes = Object.entries(progress)
    .filter(([, status]) => status === "AC")
    .map(([problemId]) => updatedAt[problemId])
    .filter(Boolean);

  return {
    today: acUpdatedTimes.filter((at) => dayDiff(at, now) < 1).length,
    threeDays: acUpdatedTimes.filter((at) => dayDiff(at, now) < 3)
      .length,
    sevenDays: acUpdatedTimes.filter((at) => dayDiff(at, now) <= 7)
      .length,
  };
}
