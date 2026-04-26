export type ProgressActivity = {
  problemId: string;
  title: string;
  at: string;
  relativeTime: string;
};

export function getProblemUpdatedAt(
  updatedAt: Record<string, string>,
  problemId: string
): string | null;
export function formatRelativeActivityTime(
  value: string,
  now?: Date
): string;
export function formatActivityDate(value: string): string;
export function getRecentAcActivities(
  progress?: Record<string, string>,
  updatedAt?: Record<string, string>,
  titleById?: Record<string, string>,
  options?: { now?: Date; limit?: number }
): ProgressActivity[];
export function groupActivitiesByDate(
  activities: ProgressActivity[]
): Array<{ key: string; label: string; items: ProgressActivity[] }>;
export function countRecentAc(
  progress?: Record<string, string>,
  updatedAt?: Record<string, string>,
  now?: Date
): { today: number; threeDays: number; sevenDays: number };
