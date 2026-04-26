import { studyPlans, StudyPlanSlug } from "@/config/studyPlans";
import StudyPlanProgressBadge from "@components/StudyPlanProgressBadge";
import Link from "next/link";

export default function StudyPlanSwitcher({
  currentSlug,
}: {
  currentSlug: StudyPlanSlug;
}) {
  const currentPlan = studyPlans[currentSlug];

  return (
    <div className="study-plan-switcher">
      <span className="study-plan-switcher-label">当前题单</span>
      <details>
        <summary>
          {currentPlan.title}
          <StudyPlanProgressBadge data={currentPlan.data} compact />
        </summary>
        <div className="study-plan-switcher-menu">
          {Object.entries(studyPlans).map(([slug, plan]) => (
            <Link
              key={slug}
              className={slug === currentSlug ? "active" : ""}
              href={plan.href}
            >
              <span>{plan.title}</span>
              <StudyPlanProgressBadge data={plan.data} compact />
            </Link>
          ))}
        </div>
      </details>
    </div>
  );
}
