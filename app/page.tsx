import { defaultStudyPlanSlug, studyPlans } from "@/config/studyPlans";
import TopNav from "@components/TopNav";
import Link from "next/link";

export default function HomePage() {
  const defaultPlan = studyPlans[defaultStudyPlanSlug];

  return (
    <>
      <TopNav />
      <main className="container py-4">
        <h1 className="h3 mb-3">0x3f 算法题单</h1>
        <p className="text-body-secondary">
          复用 LC-Rating v0 的题单数据和列表体验，进度只保存在当前浏览器。
        </p>
        <div className="d-flex flex-wrap gap-2">
          {Object.entries(studyPlans).map(([slug, plan]) => (
            <Link key={slug} className="btn btn-outline-primary" href={plan.href}>
              {plan.title}
            </Link>
          ))}
        </div>
        <Link className="btn btn-primary mt-4" href={defaultPlan.href}>
          进入{defaultPlan.title}
        </Link>
      </main>
    </>
  );
}
