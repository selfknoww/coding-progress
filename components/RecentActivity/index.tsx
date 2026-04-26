"use client";

import { useQuestProgress } from "@hooks/useProgress";
import {
  countRecentAc,
  getRecentAcActivities,
  groupActivitiesByDate,
} from "@src/progressActivity.mjs";

export default function RecentActivity({
  titleById,
}: {
  titleById: Record<string, string>;
}) {
  const { allProgress, progressUpdatedAt } = useQuestProgress();
  const counts = countRecentAc(allProgress, progressUpdatedAt);
  const activities = getRecentAcActivities(
    allProgress,
    progressUpdatedAt,
    titleById,
    {
      limit: 20,
    }
  );
  const groups = groupActivitiesByDate(activities);

  return (
    <article className="dashboard-card wide activity-card">
      <div className="activity-header">
        <div>
          <p className="eyebrow">Recent AC</p>
          <h2>Activity</h2>
        </div>
        <div className="activity-stats" aria-label="Recent AC">
          <span>
            <strong>{counts.today}</strong>
            Today
          </span>
          <span>
            <strong>{counts.threeDays}</strong>3 Days
          </span>
          <span>
            <strong>{counts.sevenDays}</strong>7 Days
          </span>
        </div>
      </div>
      {groups.length > 0 ? (
        <div className="activity-list">
          {groups.map((group) => (
            <section className="activity-group" key={group.key}>
              <h3 className="activity-group-title">{group.label}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={`${item.problemId}-${item.at}`}>
                    <span className="activity-problem">{item.title}</span>
                    <time dateTime={item.at}>{item.relativeTime}</time>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <p className="activity-empty">
          No AC activity yet. Future status changes will show up here.
        </p>
      )}
    </article>
  );
}
