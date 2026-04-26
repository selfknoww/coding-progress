import { studyPlans } from "@/config/studyPlans";
import StudyPlanProgressBadge from "@components/StudyPlanProgressBadge";
import TopNav from "@components/TopNav";
import Link from "next/link";

export default function HomePage() {
  const basicAlgorithm = studyPlans.basic_algorithm;
  const hot100 = studyPlans.hot_100;
  const ox3fPlans = Object.entries(studyPlans).filter(
    ([slug]) => slug !== "basic_algorithm" && slug !== "hot_100"
  );

  return (
    <>
      <TopNav />
      <main className="home-dashboard">
        <section className="dashboard-hero">
          <p className="eyebrow">Local progress tracker</p>
          <h1>刷题题单</h1>
          <p>
            复用 LC-Rating v0 的题单数据和列表体验，进度只保存在当前浏览器。
          </p>
        </section>

        <section className="dashboard-grid" aria-label="推荐题单">
          <article className="dashboard-card primary">
            <div>
              <p className="eyebrow">课程路线</p>
              <h2>
                基础算法精讲
                <StudyPlanProgressBadge data={basicAlgorithm.data} />
              </h2>
              <p>B 站课程合集整理，适合按视频顺序刷题和复盘。</p>
            </div>
            <Link className="dashboard-action" href={basicAlgorithm.href}>
              进入{basicAlgorithm.title}
            </Link>
          </article>

          <article className="dashboard-card">
            <div>
              <p className="eyebrow">高频面试</p>
              <h2>
                Hot 100
                <StudyPlanProgressBadge data={hot100.data} />
              </h2>
              <p>力扣官方高频题单，适合作为面试准备的基础清单。</p>
            </div>
            <Link className="dashboard-action" href={hot100.href}>
              进入{hot100.title}
            </Link>
          </article>

          <article className="dashboard-card wide">
            <div>
              <p className="eyebrow">分类训练</p>
              <h2>0x3f 算法题单</h2>
              <p>按算法专题拆分，适合系统训练滑动窗口、二分、图论、动态规划等能力。</p>
            </div>
            <div className="category-grid">
              {ox3fPlans.map(([slug, plan]) => (
                <Link key={slug} href={plan.href}>
                  <span>{plan.title}</span>
                  <StudyPlanProgressBadge data={plan.data} compact />
                </Link>
              ))}
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
