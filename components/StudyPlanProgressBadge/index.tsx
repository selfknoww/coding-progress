"use client";

import { useQuestProgress } from "@hooks/useProgress";
import { getStudyPlanProgress } from "@src/studyPlanProgress.mjs";

type StudyPlanNode = {
  title?: string;
  leafChild?: StudyPlanNode[];
  nonLeafChild?: StudyPlanNode[];
};

export default function StudyPlanProgressBadge({
  data,
  compact = false,
}: {
  data: StudyPlanNode;
  compact?: boolean;
}) {
  const { allProgress } = useQuestProgress();
  const progress = getStudyPlanProgress(data, allProgress);

  if (progress.total === 0) {
    return null;
  }

  return (
    <span
      className={`progress-badge${compact ? " compact" : ""}`}
      title={`已通过 ${progress.completed} / ${progress.total}，已记录 ${progress.started} 题`}
    >
      <span className="progress-badge-label">
        {progress.completed}/{progress.total}
      </span>
      <span className="progress-badge-track" aria-hidden="true">
        <span
          className="progress-badge-fill"
          style={{ width: `${progress.percent}%` }}
        />
      </span>
    </span>
  );
}
